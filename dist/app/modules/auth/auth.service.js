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
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const config_1 = require("../../config");
const ApiError_1 = require("../../utils/ApiError");
const user_model_1 = require("../user/user.model");
const common_1 = require("../../interfaces/common");
exports.AuthService = {
    register: (payload) => __awaiter(void 0, void 0, void 0, function* () {
        const exists = yield user_model_1.User.findOne({ email: payload.email });
        if (exists)
            throw new ApiError_1.ApiError(http_status_codes_1.default.BAD_REQUEST, 'Email already in use');
        let driver;
        const role = payload.role || common_1.UserRole.RIDER;
        if (role === common_1.UserRole.DRIVER) {
            driver = {
                status: common_1.DriverStatus.PENDING,
                vehicleType: payload.vehicleType,
                vehicleNumber: payload.vehicleNumber,
                isAvailable: false,
                earnings: 0,
            };
        }
        const user = yield user_model_1.User.create({
            name: payload.name,
            email: payload.email,
            password: payload.password,
            role,
            status: common_1.UserStatus.ACTIVE,
            driver,
        });
        return { id: user._id, role: user.role };
    }),
    login: (payload) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.User.findOne({ email: payload.email }).select('+password');
        if (!user)
            throw new ApiError_1.ApiError(http_status_codes_1.default.UNAUTHORIZED, 'Invalid credentials');
        const ok = yield user.comparePassword(payload.password);
        if (!ok)
            throw new ApiError_1.ApiError(http_status_codes_1.default.UNAUTHORIZED, 'Invalid credentials');
        if (user.status !== common_1.UserStatus.ACTIVE)
            throw new ApiError_1.ApiError(http_status_codes_1.default.FORBIDDEN, 'Account blocked');
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, config_1.config.jwt.secret, {
            expiresIn: config_1.config.jwt.expiresIn,
        });
        return { token, role: user.role };
    }),
};
