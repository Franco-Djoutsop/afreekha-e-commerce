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
exports.GestionCommandeArticle = void 0;
const CommandArticle_1 = __importDefault(require("../models/CommandArticle"));
const GestionCommandeArticle = {
    create(commandArticle) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRslt = yield CommandArticle_1.default.bulkCreate(commandArticle);
            return queryRslt;
        });
    },
    getCommandArticle(idCommande) {
        return __awaiter(this, void 0, void 0, function* () {
            const commandArticles = yield CommandArticle_1.default.findAll({
                where: { idCommande: idCommande }
            });
            return commandArticles;
        });
    },
    deleteCommandeArticle(idCommande) {
        return __awaiter(this, void 0, void 0, function* () {
            const commandArticle = yield CommandArticle_1.default.destroy({
                where: { idCommande: idCommande }
            });
            return commandArticle;
        });
    }
};
exports.GestionCommandeArticle = GestionCommandeArticle;
