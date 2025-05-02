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
exports.GestionAdresse = void 0;
const Adresse_1 = __importDefault(require("../models/Adresse"));
const GestionAdresse = {
    create(adress) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield Adresse_1.default.create(adress);
            return resp;
        });
    },
    update(newAdresse) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield Adresse_1.default.update({
                titre: newAdresse.titre,
                adresse: newAdresse.adresse,
                pays: newAdresse.pays,
                ville: newAdresse.ville,
                etat: newAdresse.etat,
                numero_telepone: newAdresse.numero_telepone,
                quartier: newAdresse.quartier,
            }, {
                where: {
                    idAdresse: newAdresse.idAdresse,
                    idUser: newAdresse.idUser
                }
            });
            return resp;
        });
    },
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield Adresse_1.default.destroy({
                where: {
                    idAdresse: id
                }
            });
            return resp;
        });
    },
    getAll(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataRetrieve = yield Adresse_1.default.findAll({
                where: {
                    idUser: idUser
                }
            });
            return dataRetrieve;
        });
    }
};
exports.GestionAdresse = GestionAdresse;
