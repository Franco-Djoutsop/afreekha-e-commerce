"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserByUser = exports.modifyPassword = exports.getUserRole = exports.removeRoleToUser = exports.asignRoleToUser = exports.oneUsersRole = exports.deleteUsers = exports.updateUsers = exports.allUSers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler")); //equivalent au try-catch
const User_1 = __importDefault(require("../models/User"));
const Role_1 = __importDefault(require("../models/Role"));
const userRoles_1 = __importDefault(require("../models/userRoles"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Adresse_1 = __importDefault(require("../models/Adresse"));
const Commande_1 = __importDefault(require("../models/Commande"));
//@desc read all users
//@route GET /api/users
//@access private
//<<<<<<< HEAD
const allUSers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.findAll({
            include: [
                {
                    model: Role_1.default,
                    through: { attributes: [] },
                },
            ],
        });
        res.status(200).json({ reps: users });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ erreur: error });
    }
}));
exports.allUSers = allUSers;
//@desc read all infos of a user
//@route GET /api/users/:id
//@access private
const infosUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const idUSer = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!idUSer)
        res.status(401).json({ message: "Utilisation non connecte" });
    const user = yield User_1.default.findByPk(idUSer, {
        include: [
            {
                model: Adresse_1.default,
            },
        ],
    });
    if (!user)
        res.status(404).json({ mesage: "utilisateur introuvable" });
    const commandes = yield Commande_1.default.findAll({ where: { idUSer: idUSer } });
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
}));
//@desc Update a user
//@route PATCH /api/admin/users/:id
//@access public
const updateUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { nom, prenom, date_naissance, email, tel, mot_de_passe } = req.body;
    const idRole = req.body.idRole;
    const user = yield User_1.default.findByPk(id);
    const hashpassword = yield bcrypt_1.default.hashSync(mot_de_passe, 10);
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
        const existingRole = yield userRoles_1.default.findAll({
            where: {
                idUser: id,
            },
        });
        const newROle = idRole.filter((role) => !existingRole.find((existingRole) => existingRole.idRole === role));
        const roleToRemove = existingRole.filter((existingRole) => !idRole.some((id) => id === existingRole.idRole));
        yield Promise.all([
            ...newROle.map((role) => userRoles_1.default.create({ idRole: role, idUser: id })),
            ...roleToRemove.map((role) => userRoles_1.default.destroy({
                where: {
                    idRole: role.idRole,
                    idUser: id,
                },
            })),
        ]);
        yield user.save();
        res.status(200).json({ reps: user, done: true });
    }
    catch (error) {
        res.status(400).json(`Une erreur s'est produite : \n ${error}`);
    }
}));
exports.updateUsers = updateUsers;
//@desc update infos of user by user
//@route PUT /api/users
//@access public
const updateUserByUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; //le user doit etre loguer , et son id est get depuis le token de connexion
    const { nom, prenom, tel, email } = req.body;
    const user = yield User_1.default.findByPk(id);
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
        yield user.save();
        res.status(200).json({ reps: user, done: true });
    }
    catch (error) {
        res.status(400).json(`Une erreur s'est produite : \n ${error}`);
    }
}));
exports.updateUserByUser = updateUserByUser;
//@desc delete a user
//@route DEL /api/admin/users/:id
//@access public
const deleteUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield User_1.default.findByPk(id);
        if (!user) {
            return res.status(400).json({ actionDone: false });
        }
        yield user.destroy();
        return res.status(204).json({ actionDone: true });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}));
exports.deleteUsers = deleteUsers;
//@desc a user with all roles
//@route GET/api/usersRoles/:id
//@access private
const oneUsersRole = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idUser = req.params.id;
    const existUser = yield User_1.default.findByPk(idUser);
    if (!existUser) {
        res.status(404).json({ errorMessage: "Cet utilisateur n'existe pas!" });
    }
    const usersRole = yield User_1.default.findOne({
        where: { idUser },
        include: [
            {
                model: Role_1.default,
                through: { attributes: [] },
            },
        ],
    });
    res.status(200).json({ reps: usersRole, done: true });
}));
exports.oneUsersRole = oneUsersRole;
//@desc assign a role to user
//@route POST /api/admin/users/id/roles
//@access private
const asignRoleToUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idUser = req.params.id;
    const { idRole } = req.body;
    try {
        //verifier si le user existe
        const existUser = yield User_1.default.findByPk(idUser);
        if (!existUser) {
            res.status(404).json({ errorMessage: "Utilisateur non trouvé" });
            return;
        }
        console.log("verification");
        //verifier si le role existe
        const existRole = yield Role_1.default.findByPk(idRole);
        if (!existRole) {
            res.status(404).json({ errorMessage: "Rôle non trouvé" });
            return;
        }
        //verifier si l'utilisateur a deja un role
        const existUserRole = yield userRoles_1.default.findOne({
            where: { idUser: idUser, idRole: idRole },
        });
        if (existUserRole) {
            res.status(400).json({ errorMessage: "L'utilisateur a déjà ce rôle." });
            return;
        }
        //ajouter le role a un user
        yield userRoles_1.default.create({ idUser: idUser, idRole: idRole });
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
    }
    catch (error) {
        res.status(400).json({ errorMessage: error.message });
    }
    //<<<<<<< HEAD
    //verifier si le role existe
    const existRole = yield Role_1.default.findByPk(idRole);
    if (!existRole) {
        res.status(404).json({ errorMessage: "Rôle non trouvé" });
        return;
    }
    //verifier si l'utilisateur a deja un role
    const existUserRole = yield userRoles_1.default.findOne({
        where: { idUser: idUser, idRole: idRole },
    });
    if (existUserRole) {
        res.status(400).json({ errorMessage: "L'utilisateur a déjà ce rôle." });
        return;
    }
    //ajouter le role a un user
    yield userRoles_1.default.create({ idUser: idUser, idRole: idRole });
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
}));
exports.asignRoleToUser = asignRoleToUser;
//@desc remove a role to user
//@route DELETE /api/users/:iduser/roles
//@access private
const removeRoleToUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser, idRole } = req.params;
    //verifier si le user existe
    const existUser = yield User_1.default.findByPk(idUser);
    if (!existUser) {
        res.status(404).json({ errorMessage: "Utilisateur non trouvé" });
        return;
    }
    //verifier si le role existe
    const existRole = yield Role_1.default.findByPk(idRole);
    if (!existRole) {
        res.status(404).json({ errorMessage: "Rôle non trouvé" });
        return;
    }
    //retirer le role a un user
    yield userRoles_1.default.destroy({ where: { idUser, idRole } });
    res.status(200).json({
        actionDone: true,
        message: "Rôle retiré avec succès",
    });
}));
exports.removeRoleToUser = removeRoleToUser;
//@desc get user with her role
//@route GET /api/users/me
//@access private
const getUserRole = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const idUser = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; //recuperer l'id du user depuis le token
        console.log("idUser : ", idUser);
        //rechercher le user et inclure ses roles
        const user = yield User_1.default.findByPk(idUser, {
            attributes: { exclude: ["mot_de_passe"] },
            include: [{ model: Role_1.default, as: "Roles" }],
        });
        if (!user) {
            res.status(404).json({ errorMessage: "Utilisateur non trouvé" });
            return;
        }
        res.json(user);
    }
    catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        res.status(500).json({ errorMessage: "Erreur serveur" });
    }
}));
exports.getUserRole = getUserRole;
//modify password
//@desc modify a user's password
//@route PUT /api/password/:id
const modifyPassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { password, newPassword } = req.body;
    const users = yield User_1.default.findOne({
        where: {
            idUser: id,
        },
    });
    if (users === null || users === void 0 ? void 0 : users.mot_de_passe) {
        const ismatch = yield bcrypt_1.default.compare(password, users === null || users === void 0 ? void 0 : users.mot_de_passe);
        const hashNewPassword = yield bcrypt_1.default.hashSync(newPassword, 10);
        if (ismatch) {
            const isMatch2 = yield bcrypt_1.default.compare(newPassword, users.mot_de_passe);
            isMatch2 ? console.log(true) : false;
            try {
                //update password
                !isMatch2
                    ? (users.mot_de_passe = hashNewPassword)
                    : res.status(400).json({
                        message: "Le nouveau mot de passe ne doit pas etre similaire a l'ancienne",
                    });
                yield users.save();
                res.status(200).json({ reps: users });
                console.log("Nouveau password: ", newPassword);
            }
            catch (error) {
                res.status(400).json({ MessageError: error.message });
            }
        }
        else {
            res.status(400).json({
                message: "Le mot de passe ne correspond pas !! veuillez reessayer...",
            });
        }
    }
    else {
        res.status(400).json({
            message: "Le mot de passe est undefined , quelque chose ne va pas ...",
        });
        console.log("users : ", users);
    }
}));
exports.modifyPassword = modifyPassword;
