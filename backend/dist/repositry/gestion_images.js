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
exports.GestionImage = void 0;
const image_1 = __importDefault(require("../models/image"));
const img_file_1 = require("../config/img_file");
const dotenv_1 = __importDefault(require("dotenv"));
const ArticleImage_1 = __importDefault(require("../models/ArticleImage"));
const Article_1 = __importDefault(require("../models/Article"));
const database_1 = require("../config/database"); // Adjust the path as necessary
dotenv_1.default.config();
const GestionImage = {
    createImg(base64, dossier, contentType, featured, collection, position) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.execCreationImg(base64, dossier, contentType);
            if (position && position == "MAIN_BANNER") {
                yield image_1.default.update({
                    position: null,
                }, { where: { position: "MAIN_BANNER" }
                });
                //car il ne peut avoir qu'une seul banner principale dans le main
            }
            if (result.creationDone) {
                const queryRslt = yield image_1.default.create({
                    collection: collection ? collection : null,
                    position: position ? position : null,
                    lien: result.link,
                    featured: featured
                });
                return queryRslt;
            }
            return "";
        });
    },
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const getImage = yield image_1.default.findByPk(id);
            if (getImage) {
                const resp = yield image_1.default.destroy({
                    where: {
                        idImage: id
                    }
                });
                if (resp) {
                    if (yield (0, img_file_1.DeleteImg)(getImage.lien)) {
                        return resp;
                    }
                }
                return null;
            }
            return null;
        });
    },
    articleImageAssigment(idArticle, idImage) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield database_1.sequelize.transaction(); // Gérer la transaction
            const article = yield Article_1.default.findByPk(idArticle);
            if (!article) {
                throw new Error('Article introuvable');
            }
            // Vérifier si les images existent
            const images = yield image_1.default.findAll({
                where: { idImage: idImage },
            });
            if (images.length !== idImage.length) {
                throw new Error("Une ou plusieurs images sont introuvables");
            }
            const articleImagesData = idImage.map((imageId) => ({
                idArticle: idArticle,
                idImage: imageId,
            }));
            const resp = yield ArticleImage_1.default.bulkCreate(articleImagesData, { transaction });
            yield transaction.commit();
            return resp;
        });
    },
    update(collection, idImage, position, featured) {
        return __awaiter(this, void 0, void 0, function* () {
            if (position && position == "MAIN_BANNER") {
                yield image_1.default.update({
                    position: null,
                }, { where: { position: "MAIN_BANNER" }
                });
                //car il ne peut avoir qu'une seul banner principale dans le main
            }
            const queryRslt = yield image_1.default.update({ featured: featured, position: position, collection: collection }, {
                where: {
                    idImage: idImage
                }
            });
            return queryRslt ? queryRslt : "";
        });
    },
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataRetrieve = yield image_1.default.findAll({
                where: {
                    idImage: id
                }
            });
            return dataRetrieve;
        });
    },
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield image_1.default.findAll();
        });
    },
    getFeatured() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield image_1.default.findAll({
                attributes: ['idImage', 'lien', 'collection', 'position'],
                limit: 15,
                where: {
                    featured: true
                }
            });
            return data;
        });
    },
    execCreationImg(base64, dossier, contentType) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, img_file_1.MoveImg)({ data: base64, contentType: contentType }, dossier).then((lien) => {
                return { creationDone: true, link: lien };
            }).catch((error) => {
                return { creationDone: false, error: error.message };
            });
        });
    }
};
exports.GestionImage = GestionImage;
