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
exports.validateToken = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const secretToken = process.env.ACCESS_TOKEN_SECRET;
    if (!secretToken) {
        res
            .status(400)
            .json({ errorMessage: "Erreur serveur : SecretToken non défini, veuillez vous reconnectez, pour continuer !" });
        return;
    }
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res
            .status(401)
            .json({ errorMessage: "Accès refusé. Token manquant ou invalide" });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretToken);
        console.log("Token décodé :", decoded);
        if (!decoded || !decoded.user) {
            res.status(403).json({ errorMessage: "Format du token invalide" });
            return;
        }
        req.user = decoded.user; // Stocker l'utilisateur dans req.user
        next();
    }
    catch (err) {
        res.status(403).json({ errorMessage: "Token invalide ou expiré" });
    }
}));
exports.validateToken = validateToken;
