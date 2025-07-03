"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants_1.Constant.VALIDATION_ERROR:
            res.json({
                error: "true",
                title: "VALIDATION failed",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants_1.Constant.UNAUTHORIZED:
            res.json({
                error: "true",
                title: "Unauthorized",
                message: err.message,
                starkTrace: err.stack,
            });
        case constants_1.Constant.NOT_FOUND:
            res.json({
                error: "true",
                title: "Not Found",
                message: err.message,
                starkTrace: err.stack,
            });
        case constants_1.Constant.FORBIDDEN:
            res.json({
                error: "true",
                title: "Forbidden",
                message: err.message,
                starkTrace: err.stack,
            });
        case constants_1.Constant.SERVER_ERROR:
            res.json({
                error: "true",
                title: "Server Error",
                message: err.message,
                starkTrace: err.stack,
            });
        default:
            console.log("no Error All good !!");
            break;
    }
};
exports.default = errorHandler;
