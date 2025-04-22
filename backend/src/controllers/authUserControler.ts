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
import UserRole from "../models/userRoles";
import Adresse from "../models/Adresse";
import Commande from "../models/Commande";

//@desc register a user
//@route POST /api/users
//@access public
const register = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { nom, prenom, date_naissance, email, tel, mot_de_passe, idRole } =
      req.body;
    const hashpassword = await bcrypt.hash(mot_de_passe, 10);
    const existUser = await User.findOne({
      where: { email: email },
    });

    if (!existUser) {
      const user = await User.create({
        nom,
        prenom,
        date_naissance,
        email,
        tel,
        mot_de_passe: hashpassword,
      });
      const lastId = user.get("idUser");
      const userrole = await UserRole.create({
        idRole,
        idUser: lastId,
      });
      if (user !== null && userrole !== null) {
        console.log("enregistrement reussie");
        res
          .status(201)
          .json({ done: true, message: console.log("enregistrement reuissi") });
      }
    } else {
      res.status(400).json({
        message: "L'utilisateur existe deja , veuillez vous connecter !!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

//@desc register a user by user
//@route POST /api/registerByUser
const registerByUser = asyncHandler(async (req: Request, res: Response) => {
  const { nom, prenom, date_naissance, email, tel, mot_de_passe } = req.body;
  const hashpassword = await bcrypt.hash(mot_de_passe, 10);
  const exixtUSer = await User.findOne({
    where: { email: email },
  });

  try {
    if (!exixtUSer) {
      const user = await User.create({
        nom,
        prenom,
        date_naissance,
        email,
        tel,
        mot_de_passe: hashpassword,
      });
      res.status(201).json({ reps: user, done: true });
    } else {
      res.status(404).json({
        message: "L'utilisateur existe deja , veuillez vous connecter !!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

//@desc login a user
//@route POST /api/auth
//@access public
const login = asyncHandler(async (req: Request, res: Response) => {
  console.log("first");
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
        as: "roles",
      },
      {
        model: Adresse,
        as: "adresses",
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
        roles: user.roles?.map((role: Role) => role.nom),
      },
    },
    secretToken,
    { expiresIn: "24h" }
  );
  // others informations
  const commandes = await Commande.findAll({
    where: { idUSer: user.idUser },
  });

  const montantTotalCommande = commandes
    .filter((cmd) => cmd.statut === "payé")
    .reduce((sum, cmd) => sum + cmd.Montant_total, 0);
  const montantTotalCommandeImpaye = commandes
    .filter((cmd) => cmd.statut === "Encours")
    .reduce((sum, cmd) => sum + cmd.Montant_total, 0);

  const nbreTotalCommande = commandes.length;

  const reps = {
    user: {
      id: user.idUser,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      tel: user.tel,
      roles: user.roles?.map((role) => ({
        idRole: role.idRole,
        nomRole: role.nom,
      })),
    },
    montantTotalCommande,
    montantTotalCommandeImpaye,
    nbreTotalCommande,
    adresses: user.adresses,
  };
  res.status(200).json({
    accessToken: accessToken,
    // reps: crypt.encode(reps),
    reps: reps,
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

  //Générer un code OTP de 5 chiffres
  const codeOtp = Math.floor(10000 + Math.random() * 90000).toString();
  const resetToken = crypto.randomBytes(32).toString("hex"); //token
  const resetTokenExpires = new Date(Date.now() + 3600000); //1heure

  //souvegarder le token dans la BD
  await existUser?.update({ resetToken: codeOtp, resetTokenExpires });

  //envoyer l'email avec nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: existUser?.email,
      subject: "Renitialisation du mot de passe",
      text: `Voici votre code de réinitialisation : ${codeOtp}`,
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
//@route POST /users/reset-password
//access public
const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email, code, newPassword } = req.body;

  //verifier si le password est encore valide
  const user = await User.findOne({
    where: {
      email,
      resetToken: code,
      resetTokenExpires: { [Op.gt]: new Date() },
    },
  });
  console.log("here");
  if (!user) {
    res.status(400).json({ message: "code expire ou invalide" });
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
export { register, registerByUser, login, sendEmail, resetPassword };
