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
exports.DriverController = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_model_1 = require("../user/user.model");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const driver_service_1 = require("./driver.service");
exports.DriverController = {
    accept: (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const ride = yield driver_service_1.DriverService.acceptRide(req.user.id, req.params.id);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "Ride accepted",
            data: ride,
            statusCode: http_status_codes_1.default.OK,
        });
    })),
    updateStatus: (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const ride = yield driver_service_1.DriverService.updateStatus(req.user.id, req.params.id, req.body.status);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "Ride status updated",
            data: ride,
            statusCode: http_status_codes_1.default.OK,
        });
    })),
    setAvailability: (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { isAvailable } = req.body;
        const user = yield user_model_1.User.findByIdAndUpdate(req.user.id, { $set: { "driver.isAvailable": !!isAvailable } }, { new: true });
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "Availability updated successfully",
            data: user === null || user === void 0 ? void 0 : user.driver,
        });
    })),
    earnings: (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const user = yield user_model_1.User.findById(req.user.id);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "Total Earning",
            data: { earnings: ((_a = user === null || user === void 0 ? void 0 : user.driver) === null || _a === void 0 ? void 0 : _a.earnings) || 0 },
        });
    })),
};
