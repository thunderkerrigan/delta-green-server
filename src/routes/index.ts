import { Request, Response, Router } from "express";
import { CharacterManager, CharacterModel } from "delta-green-core/src/index";

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
      const character = await playerManager.randomCharacter();
      res.send(<CharacterModel>character);
    } catch (e) {
      console.log(e);
      res.send(<boolean>false);
    }
  }
);

export default router;
