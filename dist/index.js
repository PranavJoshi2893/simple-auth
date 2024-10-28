"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const HOST = process.env.HOST ? process.env.HOST : "localhost";
app_1.default.listen(PORT, HOST, () => {
    console.log(`[ready] http://${HOST}:${PORT}`);
});
