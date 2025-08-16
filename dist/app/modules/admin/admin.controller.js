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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const user_model_1 = require("../user/user.model");
const catchAsync_1 = require("../../utils/catchAsync");
const rider_model_1 = require("../rider/rider.model");
const common_1 = require("../../interfaces/common");
const sendResponse_1 = require("../../utils/sendResponse");
exports.AdminController = {
    listUsers: (0, catchAsync_1.catchAsync)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield user_model_1.User.find().select("-password");
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "Users",
            data: users,
        });
    })),
    listRides: (0, catchAsync_1.catchAsync)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const rides = yield rider_model_1.Ride.find()
            .sort({ createdAt: -1 })
            .populate("rider", "_id name email role status");
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "Rides",
            data: rides,
        });
    })),
    approveDriver: (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const user = yield user_model_1.User.findByIdAndUpdate(id, { $set: { "driver.status": common_1.DriverStatus.APPROVED } }, { new: true });
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "Driver approved Successfully",
            data: user,
        });
    })),
    suspendDriver: (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const user = yield user_model_1.User.findByIdAndUpdate(id, {
            $set: {
                "driver.status": common_1.DriverStatus.SUSPENDED,
                "driver.isAvailable": false,
            },
        }, { new: true });
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "Driver suspended Successfully",
            data: user,
        });
    })),
    blockUser: (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const user = yield user_model_1.User.findByIdAndUpdate(id, { $set: { status: common_1.UserStatus.BLOCKED } }, { new: true });
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "User blocked Successfully",
            data: user,
        });
    })),
    unblockUser: (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const user = yield user_model_1.User.findByIdAndUpdate(id, { $set: { status: common_1.UserStatus.ACTIVE } }, { new: true });
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "User unblocked Successfully",
            data: user,
        });
    })),
};
