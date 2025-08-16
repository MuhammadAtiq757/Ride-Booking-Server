"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = exports.notFound = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const ApiError_1 = require("../utils/ApiError");
const notFound = (req, res) => {
    res.status(http_status_codes_1.default.NOT_FOUND).json({ success: false, message: 'Not found' });
};
exports.notFound = notFound;
const globalErrorHandler = (err, req, res, _next) => {
    let status = http_status_codes_1.default.INTERNAL_SERVER_ERROR;
    let message = 'Something went wrong';
    if (err instanceof ApiError_1.ApiError) {
        status = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        message = err.message || message;
    }
    res.status(status).json({ success: false, message });
};
exports.globalErrorHandler = globalErrorHandler;
