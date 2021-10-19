import { Schema } from "mongoose";

import { ICharacterDocument } from "./characters.types";

const CharacterSchema = new Schema<ICharacterDocument>(
  {
    _id: String,
    seed: String,
    firstName: String,
    lastName: String,
    clearanceLevel: Number,
    age: Number,
    dob: String,
    cellPhone: String,
    profession: Object,
    employer: String,
    nationality: String,
    educationAndOccupationalHistory: String,
    gender: Number,
    portrait: String,
    stats: Object,
    knowledgeSkills: Object,
    expertiseSkills: Object,
    sensorialSkills: Object,
    influenceSkills: Object,
    actionSkills: Object,
    otherSkills: Object,
  },
  { timestamps: true }
);

// CharacterSchema.methods.setPassword = async function (password: string) {
//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(password, salt);
//   this.hashedPassword = hash;
// };

// CharacterSchema.methods.checkPassword = async function (password: string) {
//   const result = await bcrypt.compare(password, this.hashedPassword);
//   return result;
// };

// CharacterSchema.statics.findByUsername = function (username: string) {
//   return this.findOne({ username });
// };

export default CharacterSchema;
