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
exports.featuredImageFilter = exports.DeleteImg = exports.MoveImg = void 0;
const uuid_1 = require("uuid");
const fs_1 = require("fs");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MoveImg = (image, dossier) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!image.data || !image.contentType) {
            throw new Error("Données d'image ou type de contenu manquants.");
        }
        const host = process.env.HTTPS || 'http://localhost:3001/';
        // Décoder l'image base64 en utilisant le type de contenu pour plus de sécurité
        const base64Data = image.data.trim();
        const imgBuffer = Buffer.from(base64Data, 'base64');
        // Générer un nom de fichier unique
        const nomFichier = `${(0, uuid_1.v4)()}.jpg`;
        const cheminFichier = `${dossier}/${nomFichier}`;
        // Enregistrer l'image dans le dossier avec gestion asynchrone des erreur
        yield fs_1.promises.writeFile(cheminFichier, imgBuffer);
        const lienBaseDeDonnees = host + `imgs/${nomFichier}`;
        return lienBaseDeDonnees;
    }
    catch (error) {
        console.error("Erreur lors de l'enregistrement de l'image:", error.message);
        throw error;
    }
});
exports.MoveImg = MoveImg;
const DeleteImg = (imageLink) => __awaiter(void 0, void 0, void 0, function* () {
    const img_split = imageLink.split('/');
    const img_name = img_split[(img_split.length - 1)];
    try {
        yield fs_1.promises.unlink("public/imgs/" + img_name);
        return true;
    }
    catch (error) {
        console.log(error.message);
        return false;
    }
});
exports.DeleteImg = DeleteImg;
const featuredImageFilter = (imgs) => {
    const side = imgs.filter(img => img.position == "SIDE");
    const main_banner = imgs.filter(img => img.position == "MAIN_BANNER");
    const main_two_pic = imgs.filter(img => img.position == "MAIN_TWO_PIC");
    const slider = imgs.filter(img => img.position == "SLIDER");
    return { main_banner: main_banner, side: side, main_two_pic: main_two_pic, slider: slider };
};
exports.featuredImageFilter = featuredImageFilter;
