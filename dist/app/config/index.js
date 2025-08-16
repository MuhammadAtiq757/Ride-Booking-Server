"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: Number(process.env.PORT) || 5000,
    databaseUrl: process.env.DATABASE_URL || '',
    jwt: {
        secret: (process.env.JWT_SECRET || 'secret'),
        expiresIn: (process.env.JWT_EXPIRES_IN || '7d'),
    },
    bcryptRounds: Number(process.env.BCRYPT_SALT_ROUNDS || 10),
};
