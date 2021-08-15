import { Schema } from "mongoose";
import bcrypt from "bcrypt";

import { IUserDocument } from "./users.types";

const UserSchema = new Schema<IUserDocument>(
  {
    username: { type: String, required: true },
    hashedPassword: String,
    // characters: [],
  },
  { timestamps: true }
);

UserSchema.methods.setPassword = async function (password: string) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password: string) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

UserSchema.statics.findByUsername = function (username: string) {
  return this.findOne({ username });
};

export default UserSchema;
