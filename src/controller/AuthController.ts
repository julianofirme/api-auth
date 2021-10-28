import { getMongoManager, MongoEntityManager } from "typeorm";
import { User } from "../entity/User";

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
}
