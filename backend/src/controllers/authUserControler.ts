import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import jwt from "jsonwebtoken";
import Role from "../models/Role";
import { Op } from "sequelize";
import { crypt } from "../config/crypto-js";

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
  res.status(201).json({ reps: crypt.encode(user), done: true });
});

//@desc login a user
//@route POST /api/auth
//@access public
const login = asyncHandler(async (req: Request, res: Response) => {
  const { tel, email, mot_de_passe } = req.body;
  if ((!tel && !email) || !mot_de_passe) {
    res.status(400);
    throw new Error(
      "Veuillez entrer soit l'adresse email et le mot de passe, soit le numéro de téléphone et le mot de passe"
    );
  }

  console.log("first");
  const user = await User.findOne({
    where: {
      ...(email ? { email } : {}),
      ...(tel ? { tel } : {}),
    },
    include: [
      {
        model: Role,
        attributes: ["idRole", "nom"],
        through: { attributes: [] },
      },
    ],
  });
  console.log("end");
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
        roles: user.Role?.map((role: any) => role.nom),
      },
    },
    secretToken,
    { expiresIn: "24h" }
  );
  const reps = {
    user: {
      id: user.idUser,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      tel: user.tel,
      roles: user.Role?.map((role) => ({
        idRole: role.idRole,
        nomRole: role.nom,
      })),
    },
  };
  res.status(200).json({
    accessToken: accessToken,
    reps: crypt.encode(reps),
    // reps: reps,
    done: true,
  });
});

//@desc recovery password
//@route POST /users/recovery-password
//access public
const sendEmail = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  const existUser = await User.findOne({ where: { email } });
  if (!existUser) {
    res.status(404).json({ message: "cette utilisateur n'existe pas !!" });
    return;
  }

  //generer un token aleatoire
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpires = new Date(Date.now() + 3600000); //1heure

  //souvegarder le token dans la BD
  await existUser?.update({ resetToken, resetTokenExpires });

  //envoyer l'email avec nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: existUser?.email,
      subject: "Renitialisation du mot de passe",
      text: `Cliquez sur ce lien pour réinitialiser votre mot de passe : ${resetLink}`,
    });
  } catch (error) {
    res.status(500).json({ message: `une erreur s'est produite: \n ${error}` });
  }
  console.log("hello");

  res
    .status(200)
    .json({ message: "Email de réinitialisation envoyé !", done: true });
});

//@desc reset password
//@route POST /users/reset-password/:token
//access public
const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  //verifier si le password est encore valide
  const user = await User.findOne({
    where: { resetToken: token, resetTokenExpires: { [Op.gt]: new Date() } },
  });
  if (!user) {
    res.status(400).json({ message: "Token invalide ou expiré" });
    return;
  }

  // Hasher le nouveau mot de passe
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Mettre à jour le mot de passe et supprimer le token
  try {
    await user.update({
      mot_de_passe: hashedPassword,
      resetToken: null,
      resetTokenExpires: null,
    });
    res.json({ message: "Mot de passe réinitialisé avec succès", done: true });
  } catch (error) {
    res.status(400).json({ message: `Une Erreur s'est produite : ${error}` });
  }
});

//@desc disconnect
//@route POST /users/reset-password/:token
//access public
export { register, login, sendEmail, resetPassword };
