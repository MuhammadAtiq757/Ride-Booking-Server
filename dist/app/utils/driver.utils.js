"use strict";
// driver.utils.ts
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
exports.ensureDriverProfile = void 0;
const common_1 = require("../interfaces/common");
const user_model_1 = require("../modules/user/user.model");
const ensureDriverProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user)
        throw new Error('User not found');
    if (user.role === common_1.UserRole.DRIVER && !user.driver) {
        user.driver = {
            status: common_1.DriverStatus.PENDING,
            isAvailable: false,
            earnings: 0,
        };
        yield user.save();
    }
});
exports.ensureDriverProfile = ensureDriverProfile;
