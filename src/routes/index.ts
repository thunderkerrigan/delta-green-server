import { Request, Response, Router } from "express";
import { CharacterManager, CharacterModel } from "delta-green-core/src/index";

const playerManager = new CharacterManager();
const router = Router();

router.get("/maleCharacter", (req: Request, res: Response): void => {
  try {
    const character = playerManager.randomMaleCharacter();
    res.send(<CharacterModel>character);
  } catch (e) {
    console.log(e);
    res.send(<boolean>false);
  }
});

export default router;
