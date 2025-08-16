"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowRoles = exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const config_1 = require("../config");
const ApiError_1 = require("../utils/ApiError");
const checkAuth = (req, _res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        throw new ApiError_1.ApiError(http_status_codes_1.default.UNAUTHORIZED, 'Unauthorized');
    }
    const token = header.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwt.secret);
        req.user = decoded;
        next();
    }
    catch (_a) {
        throw new ApiError_1.ApiError(http_status_codes_1.default.UNAUTHORIZED, 'Invalid token');
    }
};
exports.checkAuth = checkAuth;
const allowRoles = (...roles) => {
    return (req, _res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            throw new ApiError_1.ApiError(http_status_codes_1.default.FORBIDDEN, 'Forbidden');
        }
        next();
    };
};
exports.allowRoles = allowRoles;
