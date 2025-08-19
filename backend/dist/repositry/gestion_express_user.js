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
exports.GestionExpressUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const GestionExpressUser = {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data) {
                throw new Error('Erreur De creation de compte expresse.');
            }
            const verificationRslt = yield User_1.default.findOne({
                where: {
                    tel: data.tel
                }
            });
            if (verificationRslt) {
                //return the user data
                console.log('le user existe deja avec ce numero de livraison');
                return verificationRslt.dataValues;
            }
            const insertData = yield User_1.default.create(data);
            return insertData.dataValues;
        });
    }
};
exports.GestionExpressUser = GestionExpressUser;
