import { Router } from "express";
import { sign } from "jsonwebtoken";
import { SECRET } from "../config/secret";
import { AuthController } from "../controller/AuthController";
import { STATUS, User } from "../entity/User";

export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  const user: User = new User(email, name, password);
  const response = user.isValid();

  if (response == STATUS.OK) {
    const authController = new AuthController();
    try {
      const savedUser = await authController.registerUser(user);
      return res.json(savedUser);
    } catch (error) {
      return res.status(500).json({ mmessage: STATUS.REGISTER_ERROR });
    }
  } else {
    return res.status(400).json({ message: response });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const authController = new AuthController();
  const user = await authController.findUserByEmail(email);
  if (user && user.isPasswordCorrect(password)) {
    const token = sign({ user: email, timestamp: new Date() }, SECRET, {
      expiresIn: "5m",
    });
    res.json({
      authorized: true,
      user,
      token,
    });
  } else {
    return res
      .status(401)
      .json({ authorized: false, message: STATUS.NOT_AUTHORIZED });
  }
});

authRouter.get("/home", AuthController.verifyToken, (req, res) => {
  res.json({ message: "Login successful" });
});
