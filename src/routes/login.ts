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
  "/tiny",
  authenticateJWT,
  async (req: Request & { user?: string }, res: Response): Promise<void> => {
    if (req.user) {
      const token = jwt.sign(
        {
          sub: req.user,
          name: req.user,
          exp: Math.floor(Date.now() / 1000) + 60 * 24 * 31,
        },
        cfg.jwtSecret,
        { algorithm: "RS256" }
      );
      res.set("content-type", "application/json");
      res.status(200);
      res.send(token);
    } else {
      res.status(403).send("unauthorized user");
    }
  }
);

router.get(
  "/",
  authenticateJWT,
  async (req: Request & { user?: string }, res: Response): Promise<void> => {
    try {
      if (req.user) {
        res.send(true);
      }
    } catch (e) {
      res.send(false);
    }
  }
);
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findByUsername(username);
    if (!user) {
      res.status(401).send("l'utilisateur ou le mot de passe n'existe pas.");
      return;
    }
    const isValid = await user.checkPassword(password);
    if (!isValid) {
      res.status(401).send("l'utilisateur ou le mot de passe n'existe pas.");
      return;
    }
    const token = jwt.sign(
      {
        username,
        exp: Math.floor(Date.now() / 1000) + 60 * 24 * 31,
      },
      cfg.jwtSecret
    );
    res.send(token);
  } catch (e) {
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
    const token = jwt.sign(
      {
        username,
        exp: Math.floor(Date.now() / 1000) + 60 * 24 * 31,
      },
      cfg.jwtSecret
    );
    res.send(token);
  } catch (e) {
    res.send(<boolean>false);
  }
});

export default router;
