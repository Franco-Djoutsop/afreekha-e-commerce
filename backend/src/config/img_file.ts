import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';
import * as fsSync from 'fs';
import dotenv from "dotenv";
import path from 'path';

dotenv.config()
interface ImageData {
  data: string; // Le code base64 de l'image
  contentType: string; // Le type de contenu (ex: 'image/jpeg')
}

const MoveImg = async (image: ImageData, dossier: string) => {
  try {

    if (!image.data || !image.contentType) {
      throw new Error("Données d'image ou type de contenu manquants.");
    }
    //const folderPath = path.resolve(process.cwd(), 'dist/public/imgs');// server side
    const folderPath = path.resolve(__dirname, '..', dossier); // local side
    console.log("Chemin absolu dossier cible:", folderPath);
   
    if (!fsSync.existsSync(folderPath)) {
      fsSync.mkdirSync(folderPath, { recursive: true });
    }
    
    const host = process.env.HTTPS || 'http://localhost:3000/';
    // Décoder l'image base64 en utilisant le type de contenu pour plus de sécurité
    const base64Data = image.data.trim();
    const imgBuffer = Buffer.from(base64Data, 'base64');

    // Générer un nom de fichier unique
    const nomFichier = `${uuidv4()}.jpg`;
    
    // const cheminFichier = path.join(dossier, nomFichier);
    //const cheminFichier = path.join(folderPath, nomFichier); //server side
    const cheminFichier = path.join(dossier, nomFichier); //local side
    
    console.log("Chemin fichier final:", cheminFichier);
    // Enregistrer l'image dans le dossier avec gestion asynchrone des erreur
   console.log("Buffer length:", imgBuffer.length);
   if (imgBuffer.length === 0) {
       throw new Error("Image vide — buffer invalide.");
   }
 
   try {
       await fs.writeFile(cheminFichier, imgBuffer);
       console.log("✅ Image enregistrée :", cheminFichier);
   } catch (err) {
       console.error("❌ Erreur lors de l’écriture :", err);
   }
    const lienBaseDeDonnees = host+`imgs/${nomFichier}`; 

    return lienBaseDeDonnees;

  } catch (error: any) {
    console.error("Erreur lors de l'enregistrement de l'image:", error.message);
    throw error; 
  }
}

const DeleteImg = async (imageLink: string) =>{
        const img_split = imageLink.split('/');
        const img_name = img_split[(img_split.length - 1)];
        try {
	    const chemin = path.join(path.resolve(process.cwd(), 'dist/public/imgs'), img_name);
            await fs.unlink(chemin); //server side
            //await fs.unlink("public/imgs/"+img_name); local side
            return true;
        } catch (error: any) {
            console.log(error.message);
            return false;
        }

}

const featuredImageFilter = (imgs: {idImage: number, lien:string, collection:string, position:string}[])=>{
  
          const side = imgs.filter( img => img.position == "SIDE");
          const main_banner = imgs.filter(img => img.position == "MAIN_BANNER");
          const main_two_pic = imgs.filter(img => img.position == "MAIN_TWO_PIC");
          const slider = imgs.filter(img => img.position == "SLIDER");
          const brands = imgs.filter(img => img.position == "BRANDS");
          const moreService = imgs.filter(img => img.position == "MORE_SERVICE");

         return {main_banner: main_banner, side: side, main_two_pic: main_two_pic, slider: slider, brands: brands, moreService: moreService};
}

export {MoveImg, DeleteImg, featuredImageFilter};
