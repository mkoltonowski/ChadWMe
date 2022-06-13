"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HomeChannel_1 = __importDefault(require("./WebSockets/HomeChannel"));
const express_1 = __importDefault(require("express"));
/**
 * Server Configuration
 * @author mKolt
 */
const port = process.env.PORT || 3001;
const app = (0, express_1.default)();
const server = app.listen(port, () => {
    if (process.send) {
        process.send(`Appliaction has booted at http://localhost:${port}`);
    }
});
(0, HomeChannel_1.default)(server);
