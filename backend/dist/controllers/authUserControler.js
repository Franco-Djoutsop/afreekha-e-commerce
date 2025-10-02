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
exports.resetPassword = exports.sendEmail = exports.login = exports.registerByUser = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Role_1 = __importDefault(require("../models/Role"));
const sequelize_1 = require("sequelize");
const crypto_js_1 = require("../config/crypto-js");
const userRoles_1 = __importDefault(require("../models/userRoles"));
const Adresse_1 = __importDefault(require("../models/Adresse"));
const Commande_1 = __importDefault(require("../models/Commande"));
//@desc register a user
//@route POST /api/users
//@access public
const register = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nom, prenom, date_naissance, email, tel, mot_de_passe, idRole } = req.body;
        const hashpassword = yield bcrypt_1.default.hash(mot_de_passe, 10);
        //check if email and tel already exist
        const existUser = yield User_1.default.findOne({
            where: {
                [sequelize_1.Op.or]: [{ email: email }, { tel: tel }],
            },
        });
        if (!existUser) {
            const user = yield User_1.default.create({
                nom,
                prenom,
                date_naissance,
                email,
                tel,
                mot_de_passe: hashpassword,
            });
            const lastId = user.get("idUser");
            const userrole = yield userRoles_1.default.create({
                idRole,
                idUser: lastId,
            });
            if (user !== null && userrole !== null) {
                console.log("enregistrement reussie");
                let role = yield Role_1.default.findAll({
                    where: { idRole: idRole },
                    attributes: ["idRole", "nom"],
                });
                res
                    .status(201)
                    .json({ reps: user, done: true, role: role, message: "enregistrement reuissi" });
            }
        }
        else {
            res.status(400).json({
                message: "L'utilisateur existe deja , veuillez vous connecter !!",
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
}));
exports.register = register;
//@desc register a user by user
//@route POST /api/registerByUser
const registerByUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nom, prenom, date_naissance, email, tel, mot_de_passe } = req.body;
    const hashpassword = yield bcrypt_1.default.hash(mot_de_passe, 10);
    const exixtUSer = yield User_1.default.findOne({
        where: { email: email },
    });
    try {
        if (!exixtUSer) {
            const user = yield User_1.default.create({
                nom,
                prenom,
                date_naissance,
                email: email.toLowerCase(),
                tel,
                mot_de_passe: hashpassword,
            });
            res.status(201).json({ reps: user, done: true });
        }
        else {
            res.status(404).json({
                message: "L'utilisateur existe deja , veuillez vous connecter !!",
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
}));
exports.registerByUser = registerByUser;
//@desc login a user
//@route POST /api/auth
//@access public
const login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log("first");
    const { tel, email, mot_de_passe } = req.body;
    if ((!tel && !email) || !mot_de_passe) {
        res.status(400);
        throw new Error("Veuillez entrer soit l'adresse email et le mot de passe, soit le numéro de téléphone et le mot de passe");
    }
    console.log("first");
    try {
        const user = yield User_1.default.findOne({
            where: Object.assign(Object.assign({}, (email ? { email } : {})), (tel ? { tel } : {})),
            include: [
                {
                    model: Role_1.default,
                    attributes: ["idRole", "nom"],
                    through: { attributes: [] },
                    as: "roles",
                },
                {
                    model: Adresse_1.default,
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
        const isMatch = yield bcrypt_1.default.compare(mot_de_passe, user.mot_de_passe);
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
        const accessToken = jsonwebtoken_1.default.sign({
            user: {
                id: user.idUser,
                email: user.email,
                tel: user.tel,
                roles: (_a = user.roles) === null || _a === void 0 ? void 0 : _a.map((role) => role.nom),
            },
        }, secretToken, { expiresIn: "24h" });
        // others informations
        const commandes = yield Commande_1.default.findAll({
            where: { idUSer: user.idUser },
        });
        const montantTotalCommandePaye = commandes
            .filter((cmd) => cmd.statut === "payé")
            .reduce((sum, cmd) => sum + cmd.Montant_total, 0);
        const montantTotalCommandeImpaye = commandes
            .filter((cmd) => cmd.statut === "en cours")
            .reduce((sum, cmd) => sum + cmd.Montant_total, 0);
        const nbreTotalCommande = commandes.length;
        const reps = {
            user: {
                id: user.idUser,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                tel: user.tel,
                roles: (_b = user.roles) === null || _b === void 0 ? void 0 : _b.map((role) => ({
                    idRole: role.idRole,
                    nomRole: role.nom,
                })),
            },
            montantTotalCommandePaye,
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
    }
    catch (error) {
        console.error("Erreur lors de la recherche de l'utilisateur :", error);
        res.status(500).json({ errorMessage: "Erreur serveur" });
        return;
    }
}));
exports.login = login;
//@desc recovery password
//@route POST /users/recovery-password
//access public
const sendEmail = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const existUser = yield User_1.default.findOne({ where: { email } });
    if (!existUser) {
        res.status(404).json({ message: "cette utilisateur n'existe pas !!" });
        return;
    }
    //Générer un code OTP de 5 chiffres
    const codeOtp = Math.floor(10000 + Math.random() * 90000).toString();
    const resetToken = crypto_1.default.randomBytes(32).toString("hex"); //token
    const resetTokenExpires = new Date(Date.now() + 3600000); //1heure
    //souvegarder le token dans la BD
    yield (existUser === null || existUser === void 0 ? void 0 : existUser.update({ resetToken: codeOtp, resetTokenExpires }));
    //envoyer l'email avec nodemailer
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.ionos.fr",
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.MAIL_PASSWORD,
        },
    });
    try {
        yield transporter.sendMail({
            from: process.env.EMAIL,
            to: existUser === null || existUser === void 0 ? void 0 : existUser.email,
            subject: "Renitialisation du mot de passe",
            text: `Voici votre code de réinitialisation : ${codeOtp}`,
        });
    }
    catch (error) {
        res.status(500).json({ message: `une erreur s'est produite: \n ${error}` });
    }
    console.log("hello");
    res
        .status(200)
        .json({ message: "Email de réinitialisation envoyé !", done: true, code: crypto_js_1.crypt.encode(codeOtp) });
}));
exports.sendEmail = sendEmail;
//@desc reset password
//@route POST /users/reset-password
//access public
const resetPassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code, newPassword } = req.body;
    //verifier si le password est encore valide
    const user = yield User_1.default.findOne({
        where: {
            email,
            resetToken: code,
            resetTokenExpires: { [sequelize_1.Op.gt]: new Date() },
        },
    });
    console.log("here");
    if (!user) {
        res.status(400).json({ message: "code expire ou invalide" });
        return;
    }
    // Hasher le nouveau mot de passe
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
    // Mettre à jour le mot de passe et supprimer le token
    try {
        console.log('data', newPassword);
        yield user.update({
            mot_de_passe: hashedPassword,
            resetToken: null,
            resetTokenExpires: null,
        });
        res.json({ message: "Mot de passe réinitialisé avec succès", done: true });
        return;
    }
    catch (error) {
        res.status(400).json({ message: `Une Erreur s'est produite : ${error}` });
        return;
    }
}));
exports.resetPassword = resetPassword;
