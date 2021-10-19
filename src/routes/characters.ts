import { Request, Response, Router } from "express";
import {
  CharacterManager,
  CharacterModel as CharacterInterface,
} from "delta-green-core/src/index";
import { authenticateJWT } from "./auth";
import { UserModel } from "../database/models/users/users.model";
import { CharacterModel } from "../database/models/characters/characters.model";
import _ from "lodash";

const playerManager = new CharacterManager();
const router = Router();

router.get(
  "/maleCharacter",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const character = await playerManager.randomCharacter("male");
      const mongoCharacter = new CharacterModel(character);
      res.send(<CharacterInterface>mongoCharacter);
    } catch (e) {
      console.log(e);
      res.send(<boolean>false);
    }
  }
);

router.get(
  "/femaleCharacter",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const character = await playerManager.randomCharacter("female");
      const mongoCharacter = new CharacterModel(character);
      res.send(<CharacterInterface>mongoCharacter);
    } catch (e) {
      console.log(e);
      res.send(<boolean>false);
    }
  }
);

router.get(
  "/randomCharacter",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { requestedSeed } = req.query;
      console.log(requestedSeed);

      const character = await playerManager.randomCharacter(
        requestedSeed as string
      );
      const mongoCharacter = new CharacterModel(character);
      res.send(<CharacterInterface>mongoCharacter);
    } catch (e) {
      console.log(e);
      res.send(<boolean>false);
    }
  }
);
router.get(
  "/myCharacters",
  authenticateJWT,
  async (req: Request & { user?: string }, res: Response): Promise<void> => {
    try {
      if (req.user) {
        const currentUser = await UserModel.findByUsername(req.user);
        if (currentUser.currentCharacter !== undefined) {
          const currentSelectedCharacter =
            await currentUser.retrieveCharacter();
          const charactersList = await currentUser.retrieveAllCharacters();
          res.status(200).send({
            charactersList,
            currentSelectedCharacter,
          });
        }
      }
    } catch (e) {
      console.log(e);
      res.status(400).send(<boolean>false);
    }
  }
);

router.put(
  "/add",
  authenticateJWT,
  async (req: Request & { user?: string }, res: Response): Promise<void> => {
    try {
      const character = req.body;
      // primitive key checkers
      const requiredKeys = [
        "firstName",
        "lastName",
        "clearanceLevel",
        "age",
        "dob",
        "cellPhone",
        "profession",
        "employer",
        "nationality",
        "educationAndOccupationalHistory",
        "gender",
        "stats",
      ];
      const isProperlyFormated = _.every(requiredKeys, (key) =>
        _.has(character, key)
      );
      console.log("is properly formatted: ", isProperlyFormated);

      if (req.user && isProperlyFormated) {
        const currentUser = await UserModel.findByUsername(req.user);
        const newCharacter = new CharacterModel(character);
        const { characters = [] } = currentUser;
        characters.push(newCharacter._id);
        currentUser.characters = characters;
        console.log(characters);
        if (!currentUser.currentCharacter) {
          currentUser.currentCharacter = newCharacter._id;
        }
        console.log(currentUser);

        await newCharacter.save();
        const newUser = await currentUser.save();
        console.log(newUser);

        res.send(<boolean>true);
      }
    } catch (error) {
      console.log(error);
      res.send(<boolean>false);
    }
  }
);

router.put(
  "/remove",
  authenticateJWT,
  async (req: Request & { user?: string }, res: Response): Promise<void> => {
    try {
      const id = req.body;
      const characterToDelete = await CharacterModel.findById(id);
      if (req.user && characterToDelete) {
        const currentUser = await UserModel.findByUsername(req.user);
        const { characters = [] } = currentUser;
        characters.filter((c) => c !== characterToDelete._id);
        currentUser.characters = characters;
        console.log(characters);
        if (currentUser.currentCharacter === characterToDelete._id) {
          if (currentUser.characters.length > 0) {
            currentUser.currentCharacter = currentUser.characters[0];
          } else {
            currentUser.currentCharacter = undefined;
          }
        }
        console.log(currentUser);

        const newUser = await currentUser.save();
        console.log(newUser);

        res.send(<boolean>true);
      }
    } catch (error) {
      console.log(error);
      res.send(<boolean>false);
    }
  }
);

export default router;
