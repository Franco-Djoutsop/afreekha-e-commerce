import CryptoJS from "crypto-js"
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const crypt = {
    encode(value: any){
        const key = process.env.HASH_KEY as string;
        const iv = CryptoJS.lib.WordArray.random(16); // Générer un IV aléatoire
        const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(value), key, { iv: iv });
        return ciphertext.toString();
    },

    decode(req: Request, res: Response, next: NextFunction){
        const key = process.env.HASH_KEY as string;
        const encryptedData = String(req.body.data);
        const bytes = CryptoJS.AES.decrypt(encryptedData, key);
        
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        req.body = decryptedData; 
        next();

        
        //return decryptedData;
    },

    idOnUrlDecoder(idCrypted: string){
        const key = process.env.HASH_KEY as string;
        const encryptedData = idCrypted;
        const bytes = CryptoJS.AES.decrypt(encryptedData, key);
        const idDecrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        return Number.parseInt(idDecrypted);
    }

}

export { crypt }