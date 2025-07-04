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
exports.ImageController = void 0;
const gestion_images_1 = require("../repositry/gestion_images");
const crypto_js_1 = require("../config/crypto-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ImageController = {
    //@route /api/admin/image
    //@method POST
    //@urlbody :true
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body.errors) {
                    const dossier = process.env.IMG_URL;
                    const { base64Encryption, contentType, featured, collection, position } = req.body;
                    const resp = yield gestion_images_1.GestionImage.createImg(base64Encryption, dossier, contentType, featured, collection, position);
                    //>>>>>>> vf0/vf0
                    return typeof resp != "string"
                        ? res.status(200).json([{ data: (resp.dataValues) }])
                        : res.status(200).json([]);
                }
                else {
                    return res
                        .status(400)
                        .json([
                        { message: "Informations manquantes pour continuer l'opération ! ", msg: req.body.errors },
                    ]);
                }
            }
            catch (error) {
                return res.status(400).json([{ message: error.message }]);
            }
        });
    },
    //@route /api/admin/image
    //@method PUT
    //@urlbody :true
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //remplacer ou changer l'image deja existante d'un article
            try {
                if (!req.body.errors) {
                    const { collection, idImage, position, featured } = req.body;
                    const resp = yield gestion_images_1.GestionImage.update(collection, idImage, (featured ? position : null), featured);
                    console.log("controller verif if it work", resp);
                    return typeof resp != "string"
                        ? res.status(200).json([{ data: crypto_js_1.crypt.encode(resp) }])
                        : res.status(200).json([]);
                }
                else {
                    return res
                        .status(400)
                        .json([
                        { message: "Informations manquantes pour continuer l'opération !", error: req.body.errors },
                    ]);
                }
            }
            catch (error) {
                return res.status(400).json([{ message: error.message }]);
            }
        });
    },
    //@route /api/admin/image
    //@method DELETE
    //@urlparams :true
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ids = req.body.ids;
                if (Array.isArray(ids) && ids.length > 0) {
                    const resp = yield gestion_images_1.GestionImage.destroyMultiple(ids);
                    const message = resp.deletedCount == 0 || !resp
                        ? "Aucune Image supprimée"
                        : `${resp.deletedCount} image(s) supprimée(s) avec succès !`;
                    return res
                        .status(200)
                        .json([{ done: resp.deletedCount != 0, affectedRows: resp, message: message }]);
                }
                else {
                    res.status(400).json([{ message: "Aucun ID fourni pour la suppression." }]);
                    return;
                }
            }
            catch (error) {
                return res.status(400).json([{ message: error.message }]);
            }
        });
    },
    destroyOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(200).json([{ done: gestion_images_1.GestionImage.destroyOne(Number.parseInt(req.params.id)) }]);
            }
            catch (error) {
                return res.status(400).json([{ message: error.message }]);
            }
        });
    },
    getImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const imgNbr = yield gestion_images_1.GestionImage.countImage();
                if (req.query.paginate && req.query.page) {
                    const paginate = Number.parseInt(req.query.paginate);
                    const page = Number.parseInt(req.query.page);
                    const offset = ((page - 1) * paginate);
                    const imgData = yield gestion_images_1.GestionImage.getAll(offset, paginate);
                    return res.status(200).json([{ data: imgData, total: imgNbr }]);
                }
                else {
                    const imgData = yield gestion_images_1.GestionImage.getAll();
                    return res.status(200).json([{ data: imgData, total: imgNbr }]);
                }
            }
            catch (error) {
                return res.status(400).json([{ message: error.message }]);
            }
        });
    },
};
exports.ImageController = ImageController;
