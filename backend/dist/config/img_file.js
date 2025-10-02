"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const fsSync = __importStar(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const MoveImg = (image, dossier) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!image.data || !image.contentType) {
            throw new Error("Données d'image ou type de contenu manquants.");
        }
        const folderPath = path_1.default.resolve(process.cwd(), 'dist/public/imgs'); // server side
        //const folderPath = path.resolve(__dirname, '..', dossier); // local side
        console.log("Chemin absolu dossier cible:", folderPath);
        if (!fsSync.existsSync(folderPath)) {
            fsSync.mkdirSync(folderPath, { recursive: true });
        }
        const host = process.env.HTTPS || 'http://localhost:3000/';
        // Décoder l'image base64 en utilisant le type de contenu pour plus de sécurité
        const base64Data = image.data.trim();
        const imgBuffer = Buffer.from(base64Data, 'base64');
        // Générer un nom de fichier unique
        const nomFichier = `${(0, uuid_1.v4)()}.jpg`;
        // const cheminFichier = path.join(dossier, nomFichier);
        const cheminFichier = path_1.default.join(folderPath, nomFichier); //server side
        //const cheminFichier = path.join(dossier, nomFichier); //local side
        console.log("Chemin fichier final:", cheminFichier);
        // Enregistrer l'image dans le dossier avec gestion asynchrone des erreur
        console.log("Buffer length:", imgBuffer.length);
        if (imgBuffer.length === 0) {
            throw new Error("Image vide — buffer invalide.");
        }
        try {
            yield fs_1.promises.writeFile(cheminFichier, imgBuffer);
            console.log("✅ Image enregistrée :", cheminFichier);
        }
        catch (err) {
            console.error("❌ Erreur lors de l’écriture :", err);
        }
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
        const chemin = path_1.default.join(path_1.default.resolve(process.cwd(), 'dist/public/imgs'), img_name);
        yield fs_1.promises.unlink(chemin); //server side
        //await fs.unlink("public/imgs/"+img_name); local side
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
    const brands = imgs.filter(img => img.position == "BRANDS");
    const moreService = imgs.filter(img => img.position == "MORE_SERVICE");
    return { main_banner: main_banner, side: side, main_two_pic: main_two_pic, slider: slider, brands: brands, moreService: moreService };
};
exports.featuredImageFilter = featuredImageFilter;
