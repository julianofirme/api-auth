import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getMongoManager, MongoEntityManager } from "typeorm";
import { SECRET } from "../config/secret";
import { STATUS, User } from "../entity/User";

export class AuthController {
  entityMannager: MongoEntityManager;

  constructor() {
    this.entityMannager = getMongoManager();
  }

  async registerUser(user: User): Promise<User> {
    delete user._password;
    try {
      const savedUser = await this.entityMannager.save(user);
      return savedUser;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.entityMannager.findOne(User, { email: email });
    return user;
  }

  static verifyToken(req: Request, res: Response, next: NextFunction) {
    let token = req.headers["authorization"];

    if (token) {
      token = token.substring(7, token.length);

      try {
        verify(token, SECRET);
        next();
      } catch (error) {}

      res.status(401).send({ message: STATUS.NOT_AUTHORIZED });
    }
  }
}
