import { Request, Response } from "express";
import asyncHandler from "express-async-handler"; //equivalent au try-catch
import User from "../models/User";
import Role from "../models/Role";
import UserRole from "../models/userRoles";
import { crypt } from "../config/crypto-js";

//@desc read all users
//@route GET /api/users
//@access private
const allUSers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.findAll({
    include: [
      {
        model: Role,
        through: { attributes: [] },
      },
    ],
  });
  try {
    res.status(200).json({
      // reps: crypt.encode(users),
      reps: users,
      done: true,
    });
    console.log("first");
  } catch (error: any) {
    res.status(404).json({ messageError: error.message });
  }
});

//@desc Update a user
//@route PATCH /api/admin/users/:id
//@access public
const updateUsers = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { nom, prenom, date_naissance, email, tel, mot_de_passe } = req.body;
  const user = await User.findByPk(id);
  if (!user) {
    res.status(400);
    throw new Error("aucun utilisateur trouve");
  }
  try {
    //update section
    user.nom = nom || user.nom;
    user.prenom = prenom || user.prenom;
    user.date_naissance = date_naissance || user.date_naissance;
    user.email = email || user.email;
    user.tel = tel || user.tel;
    user.mot_de_passe = mot_de_passe || user.mot_de_passe;
    await user.save();
    res.status(200).json({ reps: user, done: true });
  } catch (error) {
    res.status(400).json(`Une erreur s'est produite : \n ${error}`);
  }
});

//@desc delete a user
//@route DEL /api/admin/users/:id
//@access public
const deleteUsers = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await User.findByPk(id);
  if (!user) {
    res.status(400).json({ actionDone: false });
    throw new Error("Aucun utilisateur trouve");
  }
  await user.destroy();
  res.status(204).json({ actionDone: true });
});

//@desc a user with all roles
//@route GET/api/usersRoles/:id
//@access private
const oneUsersRole = asyncHandler(async (req: Request, res: Response) => {
  const idUser = req.params.id;
  const existUser = await User.findByPk(idUser);

  if (!existUser) {
    res.status(404).json({ errorMessage: "Cet utilisateur n'existe pas!" });
  }
  const usersRole = await User.findOne({
    where: { idUser },
    include: [
      {
        model: Role,
        through: { attributes: [] },
      },
    ],
  });

  res.status(200).json({ reps: usersRole, done: true });
});

//@desc assign a role to user
//@route POST /api/admin/users/id/roles
//@access private
const asignRoleToUser = asyncHandler(async (req: Request, res: Response) => {
  const idUser = req.params.id;
  const { idRole } = req.body;

  try {
    //verifier si le user existe
    const existUser = await User.findByPk(idUser);
    if (!existUser) {
      res.status(404).json({ errorMessage: "Utilisateur non trouvé" });
      return;
    }
    console.log("verification");

    //verifier si le role existe
    const existRole = await Role.findByPk(idRole);
    if (!existRole) {
      res.status(404).json({ errorMessage: "Rôle non trouvé" });
      return;
    }

    //verifier si l'utilisateur a deja un role
    const existUserRole = await UserRole.findOne({
      where: { idUser: idUser, idRole: idRole },
    });

    if (existUserRole) {
      res.status(400).json({ errorMessage: "L'utilisateur a déjà ce rôle." });
      return;
    }

    //ajouter le role a un user
    await UserRole.create({ idUser: idUser, idRole: idRole });
    const datas = {
      message: "Rôle assigné avec succès à l'utilisateur",
      nom: existUser.nom,
      prenom: existUser.prenom,
      tel: existUser.tel,
      email: existUser.email,
      role: existRole.nom,
    };
    res.status(200).json({
      reps: datas,
      done: true,
    });
  } catch (error: any) {
    res.status(400).json({ errorMessage: error.message });
  }
});

//@desc remove a role to user
//@route DELETE /api/users/:iduser/roles
//@access private
const removeRoleToUser = asyncHandler(async (req: Request, res: Response) => {
  const { idUser, idRole } = req.params;

  //verifier si le user existe
  const existUser = await User.findByPk(idUser);
  if (!existUser) {
    res.status(404).json({ errorMessage: "Utilisateur non trouvé" });
    return;
  }

  //verifier si le role existe
  const existRole = await Role.findByPk(idRole);
  if (!existRole) {
    res.status(404).json({ errorMessage: "Rôle non trouvé" });
    return;
  }

  //retirer le role a un user
  await UserRole.destroy({ where: { idUser, idRole } });
  res.status(200).json({
    actionDone: true,
    message: "Rôle retiré avec succès",
  });
});

//@desc get user with her role
//@route GET /api/users/me
//@access private
const getUserRole = asyncHandler(async (req: Request, res: Response) => {
  try {
    const idUser = req.user?.id; //recuperer l'id du user depuis le token
    console.log("idUser : ", idUser);

    //rechercher le user et inclure ses roles
    const user = await User.findByPk(idUser, {
      attributes: { exclude: ["mot_de_passe"] },
      include: [{ model: Role, as: "Roles" }],
    });

    if (!user) {
      res.status(404).json({ errorMessage: "Utilisateur non trouvé" });
      return;
    }
    res.json(user);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    res.status(500).json({ errorMessage: "Erreur serveur" });
  }
});

export {
  allUSers,
  updateUsers,
  deleteUsers,
  oneUsersRole,
  asignRoleToUser,
  removeRoleToUser,
  getUserRole,
};
