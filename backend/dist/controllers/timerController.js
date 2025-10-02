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
exports.getTimer = exports.updateTimer = exports.createTimer = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const timer_1 = __importDefault(require("../models/timer"));
//@desc create a timer 
//@route POST /api/admin/timer
//@access public
const createTimer = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("enter");
    let { status, collection } = req.body;
    if (!collection) {
        throw new Error("entrer le nom de la categorie");
    }
    if (!status) {
        status = false;
    }
    const timer = yield timer_1.default.create({ status, collection });
    res.status(201).json({ reps: timer, done: true });
}));
exports.createTimer = createTimer;
//@desc update timer
//@route PUT /api/admin/timer/:id
//@access public
const updateTimer = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { status, collection } = req.body;
    const timer = yield timer_1.default.findByPk(id);
    if (!timer) {
        res.status(400).json({ message: "pas de timer dispo" });
        return;
    }
    if (status !== undefined) {
        timer.status = status;
    }
    if (collection !== undefined) {
        timer.collection = collection;
    }
    yield timer.save();
    res.status(200).json({ reps: timer, done: true });
}));
exports.updateTimer = updateTimer;
//@desc read timer
//@route GET /api/admin/timer
//@access public
const getTimer = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const timer = yield timer_1.default.findOne();
    timer ? res.status(200).json({ reps: timer, done: true }) : res.status(200).json({ reps: null, done: false });
}));
exports.getTimer = getTimer;
