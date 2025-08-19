"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crypt = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const crypt = {
    encode(value) {
        const key = process.env.HASH_KEY;
        console.log(key);
        const iv = crypto_js_1.default.lib.WordArray.random(16); // Générer un IV aléatoire
        const ciphertext = crypto_js_1.default.AES.encrypt(JSON.stringify(value), key, { iv: iv });
        return ciphertext.toString();
    },
    decode(req, res, next) {
        const key = process.env.HASH_KEY;
        const encryptedData = String(req.body.data);
        const bytes = crypto_js_1.default.AES.decrypt(encryptedData, key);
        const decryptedData = JSON.parse(bytes.toString(crypto_js_1.default.enc.Utf8));
        req.body = decryptedData; //afin de ne plus avoir à redecoder les données dans les controllers qui sont deja decryptées ici
        next();
    },
    idOnUrlDecoder(idCrypted) {
        const key = process.env.HASH_KEY;
        const encryptedData = idCrypted;
        const bytes = crypto_js_1.default.AES.decrypt(encryptedData, key);
        const idDecrypted = JSON.parse(bytes.toString(crypto_js_1.default.enc.Utf8));
        return Number.parseInt(idDecrypted);
    }
};
exports.crypt = crypt;
