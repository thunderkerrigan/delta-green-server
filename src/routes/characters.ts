import { Request, Response, Router } from "express";
import { CharacterManager, CharacterModel } from "delta-green-core/src/index";
import { authenticateJWT } from "./auth";
import { UserModel } from "../database/models/users/users.model";
import _ from "lodash";

const playerManager = new CharacterManager();
const router = Router();

router.get(
  "/maleCharacter",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const character = await playerManager.randomCharacter("male");
      res.send(<CharacterModel>character);
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
      res.send(<CharacterModel>character);
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
      res.send(<CharacterModel>character);
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
          const character =
            currentUser.characters[currentUser.currentCharacter];

          res
            .status(200)
            .send({
              charactersList: currentUser.characters,
              currentSelectedCharacter: currentUser.currentCharacter,
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
        const { characters = [] } = currentUser;
        characters.push(character);
        currentUser.characters = characters;
        console.log(characters);
        if (!currentUser.currentCharacter) {
          currentUser.currentCharacter = currentUser.characters.length - 1;
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
