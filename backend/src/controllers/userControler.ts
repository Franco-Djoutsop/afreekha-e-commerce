import { Request, Response } from "express";
import asyncHandler from "express-async-handler"; //equivalent au try-catch
import User from "../models/User";
import Role from "../models/Role";
import UserRole from "../models/userRoles";
import { crypt } from "../config/crypto-js";
import bcrypt from "bcrypt";
import Adresse from "../models/Adresse";
import Commande from "../models/Commande";

//@desc read all users
//@route GET /api/users
//@access private
//<<<<<<< HEAD
const allUSers = asyncHandler(async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Role,
          through: { attributes: [] },
          as: "roles"
        },
      ],
    });
    res.status(200).json({ reps: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ erreur: error });
  }
});

//@desc read all infos of a user
//@route GET /api/users/:id
//@access private
const infosUsers = asyncHandler(async (req: Request, res: Response) => {
  const idUSer = req.user?.id;
  if (!idUSer) res.status(401).json({ message: "Utilisation non connecte" });

  const user = await User.findByPk(idUSer, {
    include: [
      {
        model: Adresse,
      },
    ],
  });

  if (!user) res.status(404).json({ mesage: "utilisateur introuvable" });

  const commandes = await Commande.findAll({ where: { idUSer: idUSer } });

  const montantTotalCommande = commandes
    .filter((cmd) => cmd.statut === "payé")
    .reduce((sum, cmd) => sum + cmd.Montant_total, 0);
  const montantTotalCommandeImpaye = commandes
    .filter((cmd) => cmd.statut === "Encours")
    .reduce((sum, cmd) => sum + cmd.Montant_total, 0);

  const nbreTotalCommande = commandes.length;
  res.status(200).json({
    user,
    montantTotalCommande,
    montantTotalCommandeImpaye,
    nbreTotalCommande,
    adresses: user ? user.adresses : [],
  });
});

//@desc Update a user
//@route PATCH /api/admin/users/:id
//@access public
const updateUsers = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { nom, prenom, date_naissance, email, tel, mot_de_passe } = req.body;
  const idRole = req.body.role_update;
  const user = await User.findByPk(id);
  const hashpassword = await bcrypt.hashSync(mot_de_passe, 10);
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
    user.mot_de_passe = hashpassword || user.mot_de_passe;

    //mise a jour des roles(ajout d'un/des nouveau.x role.s ou suppresion de.s autre role.s)
    const existingRole = await UserRole.findAll({
      where: {
        idUser: id,
      },
    });

    const newROle = idRole.filter(
      (role: any) =>
        !existingRole.find((existingRole) => existingRole.idRole === role)
    );
    const roleToRemove = existingRole.filter(
      (existingRole) => !idRole.some((id: any) => id === existingRole.idRole)
    );

    await Promise.all([
      ...newROle.map((role: any) =>
        UserRole.create({ idRole: role, idUser: id })
      ),
      ...roleToRemove.map((role: any) =>
        UserRole.destroy({
          where: {
            idRole: role.idRole,
            idUser: id,
          },
        })
      ),
    ]);
    await user.save();
    res.status(200).json({ reps: user, done: true });
  } catch (error) {
    res.status(400).json(`Une erreur s'est produite : \n ${error}`);
  }
});

//@desc update infos of user by user
//@route PUT /api/users
//@access public
const updateUserByUser = asyncHandler(async (req: Request, res: Response) => {
  const id = req.user?.id; //le user doit etre loguer , et son id est get depuis le token de connexion
  const { nom, prenom, tel, email } = req.body;
  const user = await User.findByPk(id);
  if (!user) {
    res.status(400);
    throw new Error("aucun utilisateur trouve");
  }

  try {
    //update section
    user.nom = nom || user.nom;
    user.prenom = prenom || user.prenom;
    user.email = email || user.email;
    user.tel = tel || user.tel;
    await user.save();
    res.status(200).json({ reps: user, done: true });
  } catch (error) {
    res.status(400).json(`Une erreur s'est produite : \n ${error}`);
  }
});

//@desc delete a user
//@route DEL /api/admin/users/:id
//@access public
const deleteUsers = asyncHandler(async (req: Request, res: any) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).json({ actionDone: false });
    }
    await user.destroy();
    return res.status(200).json({ actionDone: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
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
  //<<<<<<< HEAD

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
  /*const datas = {
    message: "Rôle assigné avec succès à l'utilisateur",
    nom: existUser.nom,
    prenom: existUser.prenom,
    tel: existUser.tel,
    email: existUser.email,
    role: existRole.name,
  };
  res.status(200).json({
    reps: datas,
    done: true,
  });*/
  //=======
  //>>>>>>> vf1/vf1
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
      include: [{ model: Role, as: "roles" }],
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

//modify password
//@desc modify a user's password
//@route PUT /api/password/:id
const modifyPassword = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { password, newPassword } = req.body;
  const users = await User.findOne({
    where: {
      idUser: id,
    },
  });
  if (users?.mot_de_passe) {
    const ismatch = await bcrypt.compare(password, users?.mot_de_passe);
    const hashNewPassword = await bcrypt.hashSync(newPassword, 10);
    if (ismatch) {
      const isMatch2 = await bcrypt.compare(newPassword, users.mot_de_passe);
      isMatch2 ? console.log(true) : false;
      try {
        //update password
        !isMatch2
          ? (users.mot_de_passe = hashNewPassword)
          : res.status(400).json({
              message:
                "Le nouveau mot de passe ne doit pas etre similaire a l'ancienne",
            });
        await users.save();
        res.status(200).json({ reps: users });
        console.log("Nouveau password: ", newPassword);
      } catch (error: any) {
        res.status(400).json({ MessageError: error.message });
      }
    } else {
      res.status(400).json({
        message: "Le mot de passe ne correspond pas !! veuillez reessayer...",
      });
    }
  } else {
    res.status(400).json({
      message: "Le mot de passe est undefined , quelque chose ne va pas ...",
    });
    console.log("users : ", users);
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
  modifyPassword,
  updateUserByUser,
};
