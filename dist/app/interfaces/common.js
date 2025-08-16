"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideStatus = exports.DriverStatus = exports.UserStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["RIDER"] = "rider";
    UserRole["DRIVER"] = "driver";
})(UserRole || (exports.UserRole = UserRole = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "active";
    UserStatus["BLOCKED"] = "blocked";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
var DriverStatus;
(function (DriverStatus) {
    DriverStatus["PENDING"] = "pending";
    DriverStatus["APPROVED"] = "approved";
    DriverStatus["SUSPENDED"] = "suspended";
    DriverStatus["OFFLINE"] = "offline";
    DriverStatus["ONLINE"] = "online";
})(DriverStatus || (exports.DriverStatus = DriverStatus = {}));
var RideStatus;
(function (RideStatus) {
    RideStatus["REQUESTED"] = "requested";
    RideStatus["ACCEPTED"] = "accepted";
    RideStatus["PICKED_UP"] = "picked_up";
    RideStatus["IN_TRANSIT"] = "in_transit";
    RideStatus["COMPLETED"] = "completed";
    RideStatus["CANCELED"] = "canceled";
})(RideStatus || (exports.RideStatus = RideStatus = {}));
