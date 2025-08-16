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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
let server;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect("mongodb+srv://muhammadatiq757:vcm5WBVx5dyg8JNs@cluster0.pfpfkus.mongodb.net/Ride-Booking?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to DB!!");
        server = app_1.default.listen(5000, () => {
            console.log("Server is listening to port 5000");
        });
    }
    catch (error) {
        console.log(error);
    }
});
startServer();
// 1. unhandled rejection error
process.on("unhandledRejection", (err) => {
    console.log("unhandled Rejection detected... server sutting down..", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
// 2. uncaught rejection error
process.on("uncaughtException", (err) => {
    console.log("uncaught exceptional error detected... server sutting down..", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
// 3. signal termination (sigterm) error
process.on("SIGTERM", () => {
    console.log("SIGTERM Signal Rechived... server sutting down..");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
