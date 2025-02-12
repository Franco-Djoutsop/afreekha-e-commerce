import { body } from "express-validator";
import User from "../models/User";

//validations users
const userValidationRules = [
  body("nom").isString().notEmpty().withMessage("Le nom est obligatoire."),
  body("prenom")
    .isString()
    .notEmpty()
    .withMessage("Le prénom est obligatoire."),
  body("email")
    .isEmail()
    .withMessage("L'email est invalide.")
    .custom(async (email) => {
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        throw new Error("cet email est deja utilise");
      }
    }),
  body("tel")
    .isMobilePhone("fr-CM")
    .withMessage("Numéro de téléphone invalide.")
    .custom(async (tel) => {
      const existingTel = await User.findOne({ where: { tel } });
      if (existingTel) {
        throw new Error("Ce numero est déjà utilisé");
      }
    }),
  body("mot_de_passe")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères."),
];

export { userValidationRules };
