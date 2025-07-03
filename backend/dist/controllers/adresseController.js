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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdresseController = void 0;
const gestion_adresse_1 = require("../repositry/gestion_adresse");
const crypto_js_1 = require("../config/crypto-js");
const AdresseController = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("before");
                if (!req.body.errors) {
                    const resp = yield gestion_adresse_1.GestionAdresse.create(req.body);
                    console.log("response", resp);
                    return res.status(200).json([{ data: crypto_js_1.crypt.encode(resp.dataValues) }]);
                }
                else {
                    return res.status(404).json({ messageError: "something wrong" });
                }
            }
            catch (error) {
                return res.status(400).json([{ message: error.message }]);
            }
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body.errors) {
                    const resp = yield gestion_adresse_1.GestionAdresse.update(req.body);
                    return res.status(200).json([{ data: crypto_js_1.crypt.encode(resp) }]);
                }
            }
            catch (error) {
                return res.status(400).json([{ message: error.message }]);
            }
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.id) {
                    const resp = yield gestion_adresse_1.GestionAdresse.delete(Number.parseInt(req.params.id));
                    return res.status(200).json([{ data: crypto_js_1.crypt.encode(resp) }]);
                }
            }
            catch (error) {
                return res.status(400).json([{ message: error.message }]);
            }
        });
    },
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield gestion_adresse_1.GestionAdresse.getAll(Number.parseInt(req.params.id));
                return res.status(200).json([{ data: crypto_js_1.crypt.encode(resp) }]);
            }
            catch (error) {
                return res.status(400).json([{ message: error.message }]);
            }
        });
    }
};
exports.AdresseController = AdresseController;
