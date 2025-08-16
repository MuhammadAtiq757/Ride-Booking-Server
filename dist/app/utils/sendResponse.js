"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const sendResponse = (res, { success, message, data = null, statusCode = http_status_codes_1.default.OK, }) => {
    res.status(statusCode).json({
        success,
        message,
        data,
    });
};
exports.sendResponse = sendResponse;
