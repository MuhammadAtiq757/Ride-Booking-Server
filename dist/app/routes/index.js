"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const rider_routes_1 = __importDefault(require("../modules/rider/rider.routes"));
const driver_routes_1 = __importDefault(require("../modules/driver/driver.routes"));
const admin_routes_1 = __importDefault(require("../modules/admin/admin.routes"));
const router = (0, express_1.Router)();
router.use('/auth', auth_routes_1.default);
router.use('/rides', rider_routes_1.default);
router.use('/drivers', driver_routes_1.default);
router.use('/admin', admin_routes_1.default);
exports.default = router;
