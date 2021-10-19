import { Schema } from "mongoose";
import { CharacterModel } from "../characters/characters.model";
import bcrypt from "bcrypt";

import { IUserDocument } from "./users.types";

const UserSchema = new Schema<IUserDocument>(
  {
    username: { type: String, required: true },
    hashedPassword: String,
    characters: {
      type: [Schema.Types.ObjectId],
      ref: "characters",
      default: [],
    },
    currentCharacter: {
      type: Schema.Types.ObjectId,
      ref: "characters",
      nullable: true,
      default: null,
    },
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

UserSchema.methods.retrieveAllCharacters = async function () {
  return await CharacterModel.find().where("_id").in(this.characters);
};
UserSchema.methods.retrieveCharacter = async function () {
  return await CharacterModel.findById(this.currentCharacter);
};

UserSchema.statics.findByUsername = function (username: string) {
  return this.findOne({ username });
};

export default UserSchema;
