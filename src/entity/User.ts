import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { randomBytes, pbkdf2Sync as hashGenerator } from "crypto";
import { validate } from "email-validator";

export enum STATUS {
  INVALID_EMAIL = "Invalid e-mail",
  INVALID_NAME = " Invalid name",
  INVALID_PASSWORD = "The password must contain as least 8 characters, 1 uppercase character and 1 number",
  OK = "Ok",
  REGISTER_ERROR = "An error while trying to register user",
  NOT_AUTHORIZED = "User not authorized",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  salt: string;

  @Column()
  hash: string;

  _password: string;

  constructor(email: string, name: string, password: string) {
    this.email = email;
    this.name = name;
    this._password = password;
    this._generatePassword();
  }

  isValid(): STATUS {
    if (!validate(this.email)) {
      return STATUS.INVALID_EMAIL;
    }

    if (!this.name) {
      return STATUS.INVALID_NAME;
    }

    if (!this._isPasswordValid()) {
      return STATUS.INVALID_PASSWORD;
    }

    return STATUS.OK;
  }

  isPasswordCorrect(password: string): boolean {
    const hash = hashGenerator(
      password,
      this.salt,
      1000,
      64,
      "sha512"
    ).toString("hex");

    return hash == this.hash;
  }

  private _generatePassword() {
    if (this._isPasswordValid()) {
      const salt = randomBytes(16).toString("hex");
      const hash = hashGenerator(
        this._password,
        salt,
        1000,
        64,
        "sha512"
      ).toString("hex");
      this.salt = salt;
      this.hash = hash;
    }
  }

  private _isPasswordValid(): boolean {
    return (
      this._password &&
      this._password.length >= 8 &&
      /[A-Z]/g.test(this._password) &&
      /[0-9]/g.test(this._password)
    );
  }
}
