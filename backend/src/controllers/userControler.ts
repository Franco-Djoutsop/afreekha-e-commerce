import { Request, Response } from "express";
import asyncHandler from "express-async-handler"; //equivalent au try-catch
import User from "../models/User";

//@desc create a user
//@route /api/users
//@access public
const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { nom, prenom, date_naissance, email, tel, mot_de_passe } = req.body;

  if (!nom || !prenom || !email || !tel || !mot_de_passe) {
    res.status(400);
    throw new Error(
      " les champs :nom, prenom, email, numero de telephone et mot de passe doivent etre remplis"
    );
    return;
  }

  const user = await User.create({
    nom,
    prenom,
    date_naissance,
    email,
    tel,
    mot_de_passe,
  });
  res.status(201).json(user);
});

export { createUser };
