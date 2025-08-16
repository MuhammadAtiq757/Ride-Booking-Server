"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
// import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
// import notFound from "./app/middlewares/notFound";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1", routes_1.default);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Ride Booking system",
    });
});
// global error handler
// app.use(globalErrorHandler);
// app.use(notFound);
exports.default = app;
