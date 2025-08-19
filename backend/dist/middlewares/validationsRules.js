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
exports.userValidationRules = void 0;
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
//validations users
const userValidationRules = [
    (0, express_validator_1.body)("nom").isString().notEmpty().withMessage("Le nom est obligatoire."),
    (0, express_validator_1.body)("prenom")
        .isString()
        .notEmpty()
        .withMessage("Le prénom est obligatoire."),
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("L'email est invalide.")
        .custom((email) => __awaiter(void 0, void 0, void 0, function* () {
        const existingEmail = yield User_1.default.findOne({ where: { email } });
        if (existingEmail) {
            throw new Error("cet email est deja utilise");
        }
    })),
    (0, express_validator_1.body)("tel").notEmpty()
        .withMessage("Numéro de téléphone invalide.")
        .custom((tel) => __awaiter(void 0, void 0, void 0, function* () {
        const existingTel = yield User_1.default.findOne({ where: { tel } });
        if (existingTel) {
            throw new Error("Ce numero est déjà utilisé");
        }
    })),
    (0, express_validator_1.body)("mot_de_passe")
        .isLength({ min: 6 })
        .withMessage("Le mot de passe doit contenir au moins 6 caractères."),
];
exports.userValidationRules = userValidationRules;
