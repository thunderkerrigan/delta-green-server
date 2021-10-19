import { CharacterModel } from "delta-green-core/src";
import { Document, Model } from "mongoose";
// export interface ICharacter {
//   username: string;
//   hashedPassword: string;
//   characters?: CharacterModel[];
//   currentCharacter?: number;
//   createdAt: Date;
//   updatedAt: Date;
// }
export interface ICharacterDocument
  extends CharacterModel,
    Omit<Document, "id"> {
  //   setPassword: (password: string) => Promise<void>;
  //   checkPassword: (password: string) => Promise<boolean>;
}
export interface ICharacterModel extends Model<ICharacterDocument> {
  //   findByUsername: (username: string) => Promise<ICharacterDocument>;
}
