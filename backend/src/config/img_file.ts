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
    const folderPath = path.resolve(__dirname, '..', dossier);

    if (!fsSync.existsSync(folderPath)) {
      fsSync.mkdirSync(folderPath, { recursive: true });
    }
    
    const host = process.env.HTTPS || 'http://localhost:3000/';
    // Décoder l'image base64 en utilisant le type de contenu pour plus de sécurité
    const base64Data = image.data.trim();
    const imgBuffer = Buffer.from(base64Data, 'base64');

    // Générer un nom de fichier unique
    const nomFichier = `${uuidv4()}.jpg`;
    
    const cheminFichier = path.join(folderPath, nomFichier);

    // Enregistrer l'image dans le dossier avec gestion asynchrone des erreur
    await fs.writeFile(cheminFichier, imgBuffer);

    const lienBaseDeDonnees = host+`imgs/${nomFichier}`; 

    return lienBaseDeDonnees;

  } catch (error: any) {
    console.error("Erreur lors de l'enregistrement de l'image:", error.message);
    throw error; 
  }
}
const DeleteImg = async (imageLink: string) => {
  // 1. Chemin absolu sécurisé vers le dossier "public/imgs"
  const folderPath = path.resolve(__dirname, '..', "public/imgs");
  const img_name = imageLink.split('/').pop() || ''; // Nom du fichier

  // 2. Chemin complet sécurisé
  const filePath = path.join(folderPath, img_name);

  try {
      // 3. Vérification que le fichier est bien dans le dossier autorisé
      if (!filePath.startsWith(folderPath)) {
          throw new Error("Accès refusé : chemin hors du dossier autorisé.");
      }

      // 4. Suppression
      await fs.access(filePath); 
      await fs.unlink(filePath);
      console.log(`Fichier supprimé : ${filePath}`);
      return true;
  } catch (error: any) {
      console.error(`Erreur lors de la suppression de ${filePath} :`, error.message);
      return false;
  }
};

const featuredImageFilter = (imgs: {idImage: number, lien:string, collection:string, position:string}[])=>{
  
          const side = imgs.filter( img => img.position == "SIDE");
          const main_banner = imgs.filter(img => img.position == "MAIN_BANNER");
          const main_two_pic = imgs.filter(img => img.position == "MAIN_TWO_PIC");
          const slider = imgs.filter(img => img.position == "SLIDER");

         return {main_banner: main_banner, side: side, main_two_pic: main_two_pic, slider: slider  }
}

export {MoveImg, DeleteImg, featuredImageFilter};