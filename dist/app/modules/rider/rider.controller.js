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
exports.RideController = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const catchAsync_1 = require("../../utils/catchAsync");
const rider_service_1 = require("./rider.service");
const sendResponse_1 = require("../../utils/sendResponse");
exports.RideController = {
    request: (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const ride = yield rider_service_1.RideService.requestRide(req.user.id, req.body);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "Ride requested Successfully",
            data: ride,
            statusCode: http_status_codes_1.default.CREATED,
        });
    })),
    cancel: (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const ride = yield rider_service_1.RideService.cancelRide(req.user.id, req.params.id);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "Ride canceled successfully",
            data: ride,
            statusCode: http_status_codes_1.default.OK,
        });
    })),
    myRides: (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const rides = yield rider_service_1.RideService.myRides(req.user.id, req.user.role);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "Your rides",
            data: rides,
            statusCode: http_status_codes_1.default.OK,
        });
    })),
};
