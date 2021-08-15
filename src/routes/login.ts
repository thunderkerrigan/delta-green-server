// login
import { Request, Response, Router } from "express";
import { config as cfg } from "../config/config";
import jwt from "jsonwebtoken";
import { UserModel } from "../database/models/users/users.model";
import { authenticateJWT } from "./auth";
const router = Router();

const config = {
  secretOrKey: cfg.jwtSecret,
  issuer: "deltagreen.thunderkerrigan.fr",
  audience: "deltagreen.thunderkerrigan.fr",
};

router.get(
  "/",
  authenticateJWT,
  async (req: Request & { user?: string }, res: Response): Promise<void> => {
    try {
      if (req.user) {
        res.send(true);
      }
    } catch (e) {
      console.log(e);
      res.send(false);
    }
  }
);
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findByUsername(username);
    if (!user) {
      console.log(req.body);
      console.log(`utilisateur n\'existe pas: ${username}`);
      res.status(401).send("l'utilisateur ou le mot de passe n'existe pas.");
      return;
    }
    const isValid = await user.checkPassword(password);
    if (!isValid) {
      console.log(`password invalide: ${password}`);
      res.status(401).send("l'utilisateur ou le mot de passe n'existe pas.");
      return;
    }
    const token = jwt.sign({ username }, cfg.jwtSecret);
    res.send(token);
  } catch (e) {
    console.log(e);
    res.send(<boolean>false);
  }
});

router.post("/signup", async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      // throw new Error("missing parameters.");
      res.send(new Error("missing parameters."));
      return;
    }
    const user = await UserModel.findByUsername(username);
    if (user) {
      // throw new Error("l'utilisateur existe déjà.");
      res.send("l'utilisateur existe déjà.");
      return;
    }
    if (password.length < 6) {
      // throw new Error("Mot de passe trop court.");
      res.send("Mot de passe trop court.");
      return;
    }
    const newUser = new UserModel({ username });
    await newUser.setPassword(password);
    await newUser.save();
    const token = jwt.sign({ username }, cfg.jwtSecret);
    res.send(token);
  } catch (e) {
    console.log(e);
    res.send(<boolean>false);
  }
});

export default router;
