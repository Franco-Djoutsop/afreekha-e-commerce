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
exports.roleUsers = exports.deleteRole = exports.updateRole = exports.allRoles = exports.createRole = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Role_1 = __importDefault(require("../models/Role"));
const User_1 = __importDefault(require("../models/User"));
const crypto_js_1 = require("../config/crypto-js");
//@desc create a role
//@route POST /api/admin/roles
//@access public
const createRole = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("entree");
    const { nom } = req.body;
    const role = yield Role_1.default.create({ nom });
    res.status(201).json({ reps: crypto_js_1.crypt.encode(role), done: true });
}));
exports.createRole = createRole;
//@desc read all roles
//@route GET /api/roles
//@access public
//<<<<<<< HEAD
const allRoles = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield Role_1.default.findAll();
        if (roles[0] != null) {
            return res.status(200).json({ reps: roles, done: true });
        }
        return res.status(404).json({ message: "Aucun role trouve" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur de serveur" });
    }
}));
exports.allRoles = allRoles;
/*
const allRoles = asyncHandler(async (req: Request, res: Response) => {
  const roles = await Role.findAll();
  res.status(200).json({
    // reps: crypt.encode(roles),
    reps: roles,
    done: true,
  });
>>>>>>> vf1/vf1
});
*/
//@desc update a role
//@route PATCH /api/admin/roles/"id"
//@access public
const updateRole = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { nom } = req.body;
    const role = yield Role_1.default.findByPk(id);
    if (!role) {
        res.status(400);
        throw new Error("Aucun role trouve");
    }
    role.nom = nom || role.nom;
    yield role.save();
    res.status(200).json({ reps: role, done: true });
}));
exports.updateRole = updateRole;
//@desc delete a role
//@route DEL /api/admin/roles/:id
//@access private
const deleteRole = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const role = yield Role_1.default.findByPk(id);
    if (!role) {
        res.status(400);
        throw new Error("aucun role trouve");
    }
    yield role.destroy();
    res.status(200).json({ actionDone: true });
    return;
}));
exports.deleteRole = deleteRole;
//@desc read a role with all users
//@route GET /apiadmin/roleUsers/:id
//@access public
const roleUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const roleUsers = yield Role_1.default.findByPk(id, {
        include: [{ model: User_1.default, through: { attributes: [] } }],
    });
    res.status(200).json({ reps: roleUsers, done: true });
}));
exports.roleUsers = roleUsers;
