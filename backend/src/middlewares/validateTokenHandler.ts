import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Définition du type User pour req.user
interface DecodedUser {
  id: number;
  email: string;
  tel: string;
  role: string[];
}

// Étendre Request pour inclure `user`
declare module "express-serve-static-core" {
  interface Request {
    user?: DecodedUser;
  }
}

const validateToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const secretToken = process.env.ACCESS_TOKEN_SECRET;

    if (!secretToken) {
      res
        .status(500)
        .json({ errorMessage: "Erreur serveur : Token non défini" });
      return;
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res
        .status(401)
        .json({ errorMessage: "Accès refusé. Token manquant ou invalide" });
      return;
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, secretToken) as { user: DecodedUser };
      console.log("Token décodé :", decoded);

      if (!decoded || !decoded.user) {
        res.status(403).json({ errorMessage: "Format du token invalide" });
        return;
      }

      req.user = decoded.user; // Stocker l'utilisateur dans req.user
      next();
    } catch (err) {
      res.status(403).json({ errorMessage: "Token invalide ou expiré" });
    }
  }
);

export { validateToken };
