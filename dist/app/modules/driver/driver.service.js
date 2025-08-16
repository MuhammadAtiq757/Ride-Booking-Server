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
exports.DriverService = void 0;
const common_1 = require("../../interfaces/common");
const ApiError_1 = require("../../utils/ApiError");
const driver_utils_1 = require("../../utils/driver.utils");
const rider_model_1 = require("../rider/rider.model");
const user_model_1 = require("../user/user.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
exports.DriverService = {
    acceptRide: (driverId, rideId) => __awaiter(void 0, void 0, void 0, function* () {
        const driver = yield user_model_1.User.findById(driverId);
        if (!driver) {
            throw new ApiError_1.ApiError(http_status_codes_1.default.NOT_FOUND, 'Driver not found');
        }
        if (driver.role !== common_1.UserRole.DRIVER) {
            throw new ApiError_1.ApiError(http_status_codes_1.default.FORBIDDEN, 'Only drivers can accept rides');
        }
        // Ensure driver profile exists
        yield (0, driver_utils_1.ensureDriverProfile)(driverId);
        if (driver.driver.status !== common_1.DriverStatus.APPROVED) {
            throw new ApiError_1.ApiError(http_status_codes_1.default.FORBIDDEN, 'Driver is not approved by admin');
        }
        // if (!driver.driver!.isAvailable) {
        //   throw new ApiError(httpStatus.FORBIDDEN, 'Driver must be online/available to accept rides');
        // }
        // Check active rides
        const hasActive = yield rider_model_1.Ride.findOne({
            driver: driverId,
            status: { $in: [common_1.RideStatus.ACCEPTED, common_1.RideStatus.PICKED_UP, common_1.RideStatus.IN_TRANSIT] }
        });
        if (hasActive) {
            throw new ApiError_1.ApiError(http_status_codes_1.default.BAD_REQUEST, 'Driver must finish current ride before accepting a new one');
        }
        // Validate ride
        const ride = yield rider_model_1.Ride.findById(rideId);
        if (!ride) {
            throw new ApiError_1.ApiError(http_status_codes_1.default.NOT_FOUND, 'Ride not found');
        }
        if (ride.status !== common_1.RideStatus.REQUESTED) {
            throw new ApiError_1.ApiError(http_status_codes_1.default.BAD_REQUEST, 'Ride is not available to accept');
        }
        // Assign ride
        ride.driver = driverId;
        ride.status = common_1.RideStatus.ACCEPTED;
        ride.timeline.acceptedAt = new Date();
        yield ride.save();
        return ride;
    }),
    updateStatus: (driverId, rideId, nextStatus) => __awaiter(void 0, void 0, void 0, function* () {
        const ride = yield rider_model_1.Ride.findById(rideId);
        if (!ride)
            throw new ApiError_1.ApiError(http_status_codes_1.default.NOT_FOUND, 'Ride not found');
        if (String(ride.driver) !== driverId)
            throw new ApiError_1.ApiError(http_status_codes_1.default.FORBIDDEN, 'Not your ride');
        const allowedNext = {
            [common_1.RideStatus.REQUESTED]: [common_1.RideStatus.ACCEPTED],
            [common_1.RideStatus.ACCEPTED]: [common_1.RideStatus.PICKED_UP],
            [common_1.RideStatus.PICKED_UP]: [common_1.RideStatus.IN_TRANSIT],
            [common_1.RideStatus.IN_TRANSIT]: [common_1.RideStatus.COMPLETED],
            [common_1.RideStatus.COMPLETED]: [],
            [common_1.RideStatus.CANCELED]: [],
        };
        // if (!allowedNext[ride.status].includes(nextStatus))
        //   throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid status transition');
        ride.status = nextStatus;
        const now = new Date();
        if (nextStatus === common_1.RideStatus.PICKED_UP)
            ride.timeline.pickedUpAt = now;
        if (nextStatus === common_1.RideStatus.IN_TRANSIT)
            ride.timeline.inTransitAt = now;
        if (nextStatus === common_1.RideStatus.COMPLETED) {
            ride.timeline.completedAt = now;
            // naive fare calculation for demo
            ride.fare = Math.floor(100 + Math.random() * 400);
            // increment earnings
            yield user_model_1.User.findByIdAndUpdate(driverId, { $inc: { 'driver.earnings': ride.fare || 0 } });
        }
        yield ride.save();
        return ride;
    }),
};
