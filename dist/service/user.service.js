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
exports.registerUser = registerUser;
exports.loginUser = loginUser;
const library_1 = require("@prisma/client/runtime/library");
const prisma_config_1 = __importDefault(require("../model/prisma.config"));
const error_handler_1 = require("../utils/error.handler");
const bcrypt_1 = require("bcrypt");
/**
 * User Registration Module
 *
 * This module provides functionality for user registration, including:
 * 1. Password extraction and validation
 * 2. Hashing the password using bcrypt
 * 3. Checking email uniqueness in the database
 * 4. Storing user credentials securely
 *
 * @module UserRegistration
 * @requires bcrypt
 * @requires Database
 */
function registerUser(userDetails) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { firstName, lastName, email, password } = userDetails;
            const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
            yield prisma_config_1.default.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                },
            });
            return { message: "New User Created" };
        }
        catch (e) {
            if (e instanceof library_1.PrismaClientKnownRequestError) {
                if (e.code === "P2002")
                    throw new error_handler_1.ConflictError("Email Credential's already taken");
            }
            throw new error_handler_1.BadRequestError("Something bad happened during user registration");
        }
    });
}
function loginUser(userDetails) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = userDetails;
        const user = yield prisma_config_1.default.user.findUnique({
            where: { email },
            select: { password: true },
        });
        if (!user)
            throw new error_handler_1.NotFoundError("Invalid Credentials");
        const isMatch = yield (0, bcrypt_1.compare)(password, user.password);
        if (!isMatch)
            throw new error_handler_1.ForbiddenError("Invalid Password");
        return { message: "Login Successful!" };
    });
}
