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
exports.RideService = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const ApiError_1 = require("../../utils/ApiError");
const user_model_1 = require("../user/user.model");
const common_1 = require("../../interfaces/common");
const rider_model_1 = require("./rider.model");
exports.RideService = {
    requestRide: (riderId, payload) => __awaiter(void 0, void 0, void 0, function* () {
        const rider = yield user_model_1.User.findById(riderId);
        if (!rider || rider.role !== common_1.UserRole.RIDER)
            throw new ApiError_1.ApiError(http_status_codes_1.default.FORBIDDEN, 'Only riders can request rides');
        if (rider.status !== common_1.UserStatus.ACTIVE)
            throw new ApiError_1.ApiError(http_status_codes_1.default.FORBIDDEN, 'Account blocked');
        const active = yield rider_model_1.Ride.findOne({ rider: riderId, status: { $in: [
                    common_1.RideStatus.REQUESTED, common_1.RideStatus.ACCEPTED, common_1.RideStatus.PICKED_UP, common_1.RideStatus.IN_TRANSIT
                ] } });
        if (active)
            throw new ApiError_1.ApiError(http_status_codes_1.default.BAD_REQUEST, 'You already have an active ride');
        const ride = yield rider_model_1.Ride.create(Object.assign(Object.assign({ rider: riderId }, payload), { status: common_1.RideStatus.REQUESTED }));
        return ride;
    }),
    cancelRide: (riderId, rideId) => __awaiter(void 0, void 0, void 0, function* () {
        const ride = yield rider_model_1.Ride.findById(rideId);
        if (!ride)
            throw new ApiError_1.ApiError(http_status_codes_1.default.NOT_FOUND, 'Ride not found');
        if (String(ride.rider) !== riderId)
            throw new ApiError_1.ApiError(http_status_codes_1.default.FORBIDDEN, 'Not your ride');
        if (ride.status !== common_1.RideStatus.REQUESTED)
            throw new ApiError_1.ApiError(http_status_codes_1.default.BAD_REQUEST, 'Cannot cancel after driver accepts');
        ride.status = common_1.RideStatus.CANCELED;
        ride.timeline.canceledAt = new Date();
        yield ride.save();
        return ride;
    }),
    myRides: (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
        if (role === common_1.UserRole.RIDER)
            return rider_model_1.Ride.find({ rider: userId }).sort({ createdAt: -1 });
        if (role === common_1.UserRole.DRIVER)
            return rider_model_1.Ride.find({ driver: userId }).sort({ createdAt: -1 });
        throw new ApiError_1.ApiError(http_status_codes_1.default.FORBIDDEN, 'Invalid role');
    }),
};
