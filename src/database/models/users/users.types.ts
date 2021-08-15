import { CharacterModel } from "delta-green-core/src";
import { Document, Model } from "mongoose";
export interface IUser {
  username: string;
  hashedPassword: string;
  characters?: CharacterModel[];
  currentCharacter?: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface IUserDocument extends IUser, Document {
  setPassword: (password: string) => Promise<void>;
  checkPassword: (password: string) => Promise<boolean>;
}
export interface IUserModel extends Model<IUserDocument> {
  findByUsername: (username: string) => Promise<IUserDocument>;
}
