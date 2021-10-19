import { CharacterModel } from "delta-green-core/src";
import { Document, Model, ObjectId } from "mongoose";
export interface IUser {
  username: string;
  hashedPassword: string;
  characters?: ObjectId[];
  currentCharacter?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
export interface IUserDocument extends IUser, Document {
  setPassword: (password: string) => Promise<void>;
  checkPassword: (password: string) => Promise<boolean>;
  retrieveAllCharacters: () => Promise<CharacterModel[]>;
  retrieveCharacter: () => Promise<CharacterModel>;
}
export interface IUserModel extends Model<IUserDocument> {
  findByUsername: (username: string) => Promise<IUserDocument>;
}
