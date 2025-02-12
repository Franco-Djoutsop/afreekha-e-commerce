import { Request, Response } from "express";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import jwt from "jsonwebtoken";

//@desc register a user
//@route POST /api/users
//@access public
const register = asyncHandler(async (req: Request, res: Response) => {
  const { nom, prenom, date_naissance, email, tel, mot_de_passe } = req.body;
  const hashpassword = await bcrypt.hash(mot_de_passe, 10);
  const user = await User.create({
    nom,
    prenom,
    date_naissance,
    email,
    tel,
    mot_de_passe: hashpassword,
  });
  res.status(201).json(user);
});

//@desc login a user
//@route POST /api/login
//@access public
const login = asyncHandler(async (req: Request, res: Response) => {
  const { tel, email, mot_de_passe } = req.body;
  if ((!tel && !email) || !mot_de_passe) {
    res.status(400);
    throw new Error(
      "Veuillez entrer soit l'adresse email et le mot de passe, soit le numéro de téléphone et le mot de passe"
    );
  }

  const user = await User.findOne({
    where: tel ? { tel } : { email },
  });
  if (!user) {
    res.status(400);
    throw new Error("Utilisateur non trouvé");
  }

  // Vérifier le mot de passe
  const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
  if (!isMatch) {
    res.status(400);
    throw new Error("Identifiants incorrects");
  }

  // Vérifier si le token secret est défini
  const secretToken = process.env.ACCESS_TOKEN_SECRET;
  if (!secretToken) {
    res.status(500).json({ errorMessage: "Erreur serveur : Token non défini" });
    return;
  }

  //generer le token JWT
  const accessToken = jwt.sign(
    {
      user: {
        id: user.idUser,
        email: user.email,
        tel: user.tel,
      },
    },
    secretToken,
    { expiresIn: "10m" }
  );

  res.status(200).json({ accestoken: accessToken });
});

export { register, login };
