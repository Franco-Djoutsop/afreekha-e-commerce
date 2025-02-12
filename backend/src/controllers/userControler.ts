import { Request, Response } from "express";
import asyncHandler from "express-async-handler"; //equivalent au try-catch
import User from "../models/User";
import bcrypt from "bcrypt";
import { Model } from "sequelize";
import Role from "../models/Role";

//@desc read all users
//@route GET /api/users
//@access public
const allUSers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.status(200).json(users);
});

//@desc Update a user
//@route PATCH /api/users/:id
//@access public
const updateUsers = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { nom, prenom, date_naissance, email, tel, mot_de_passe } = req.body;
  const user = await User.findByPk(id);
  if (!user) {
    res.status(400);
    throw new Error("aucun utilisateur trouve");
  }
  //update section
  user.nom = nom || user.nom;
  user.prenom = prenom || user.prenom;
  user.date_naissance = date_naissance || user.date_naissance;
  user.email = email || user.email;
  user.tel = tel || user.tel;
  user.mot_de_passe = mot_de_passe || user.mot_de_passe;
  await user.save();
  res.status(200).json(user);
});

//@desc delete a user
//@route DEL /api/users/:id
//@access public
const deleteUsers = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await User.findByPk(id);
  if (!user) {
    res.status(400).json({ actionDone: false });
    throw new Error("Aucun utilisateur trouve");
  }
  await user.destroy();
  res.status(204).send().json({ actionDone: true });
});

//@desc All users with roles
//@route /api/usersRoles/
//@access public
const allUsersRoles = asyncHandler(async (req: Request, res: Response) => {
  const usersRoles = User.findAll({
    include: [
      {
        model: Role,
        through: { attributes: [] },
      },
    ],
  });
  res.status(200).json(usersRoles);
});

//@desc All users with roles
//@route /api/usersRoles/
//@access public
const oneUsersRole = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const usersRole = User.findByPk(id, {
    include: [
      {
        model: Role,
        through: { attributes: [] },
      },
    ],
  });
  res.status(200).json(usersRole);
});
export { allUSers, updateUsers, deleteUsers, allUsersRoles, oneUsersRole };
