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
const User_1 = __importDefault(require("../models/User"));
const Message_1 = __importDefault(require("../models/Message"));
const crypto_js_1 = require("../config/crypto-js");
const gest_message = {
    //@route/api/message
    //@mathod post
    //@data = objet, response true ? false
    //envoi d'un message
    createMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                if (data != null) {
                    yield Message_1.default.create({
                        idUser: data.idUser,
                        contenus: data.contenus,
                    });
                    return res.status(201).json({
                        send: true,
                        message: "message envoyé avec sucèss!!",
                    });
                }
                return res.status(404).json({ message: "veuillez fournir les donnees" });
            }
            catch (error) {
                return res.status(500).json({
                    message: "echec de l'envoi",
                    erreur: console.log(error),
                });
            }
        });
    },
    //@route /api/admin/message
    //@method delete
    //@response true ? false
    //<<<<<<< HEAD
    //@route /api/admin/detail-message
    //@method get
    //@response true ? false
    //liste des message d'un utilisateur
    getMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const information = yield Message_1.default.findOne({
                    where: {
                        idUser: id,
                    },
                    include: [
                        {
                            model: User_1.default, attributes: ['idUser', 'nom', 'tel']
                        },
                    ],
                    attributes: ['contenus'],
                });
                if (information == null) {
                    return res.status(404).json({
                        'data': [],
                        'message': 'aucun message trouve pour ce client'
                    });
                }
                return res.status(200).json({
                    'data': crypto_js_1.crypt.encode(information)
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    'message': 'erreur du serveur'
                });
            }
        });
    },
    getAllMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getMessage = yield Message_1.default.findAll({
                    include: [
                        {
                            model: User_1.default, attributes: ['idUser', 'nom', 'tel']
                        },
                    ],
                    attributes: ['idMessage', 'contenus', 'createdAt'],
                });
                // if(getMessage[0]==null){
                //     return res.status(404).json({
                //         'data':[],
                //         'message':'aucun message trouve'
                //     });
                // }
                return res.status(200).json({
                    'data': (getMessage)
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    'get': false,
                    'error': console.log('erreur sur le serveur:', error)
                });
            }
        });
    },
    //=======
    deleteMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                const checkid = yield Message_1.default.findByPk(id);
                if (!checkid) {
                    return res.status(404).json({
                        message: "aucun message trouve",
                    });
                }
                yield Message_1.default.destroy({
                    where: {
                        idMessage: id
                    }
                });
                return res.status(201).json({
                    send: true,
                    message: "message supprime avec sucess!!",
                });
                //return res.status(404).json({ message: "veuillez fournir les donnees" });
            }
            catch (error) {
                return res.status(500).json({
                    message: "echec de l'envoi",
                    erreur: console.log(error),
                });
            }
        });
    },
    //>>>>>>> vf1/vf1
    //@route /api/admin/message
    //@method delete
    //@response true ? false
    //suppression dun message
    //liste des message d'un utilisateur
    /*async getMessage(req: Request, res: any) {
      try {
        const id = req.params.id;
        const information = await message.findAll({
          where: {
            idUser: id,
          },
  
          include: [
            {
              model: User,
              attributes: ["idUser", "nom", "prenom", "tel"],
            },
          ],
          attributes: ["contenus"],
        });
  
        if (information[0] == null) {
          return res.status(404).json({
            data: [],
            message: "aucun message trouve pour ce client",
          });
        }
        return res.status(200).json({
          data: crypt.encode(information),
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: "erreur du serveur",
        });
      }
    },*/
    //@route /api/admin/detail-message
    //@method get
    //@response true ? false
};
exports.default = gest_message;
