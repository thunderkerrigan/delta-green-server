import { model } from "mongoose";
import { ICharacterDocument, ICharacterModel } from "./characters.types";
import CharacterSchema from "./characters.schema";

export const CharacterModel = model<ICharacterDocument, ICharacterModel>(
  "character",
  CharacterSchema
);
