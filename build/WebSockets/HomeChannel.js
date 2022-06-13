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
/**Imports */
const ws_1 = require("ws");
const query_string_1 = __importDefault(require("query-string"));
/**
 * Websocket Handler for App
 * @author mKolt
 * @param expressServer
 * @returns
 */
const HomeChannel = (expressServer) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * Create WS Server
     */
    const wss = new ws_1.WebSocketServer({
        noServer: true,
        path: '/websockets'
    });
    /**
     * Connect WS Server with Express Server
     */
    expressServer.on("upgrade", (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, (websocket) => {
            wss.emit("connection", websocket, request);
        });
    });
    /**
     * Connection Handler
     */
    wss.on("connection", (ws, req) => {
        var _a;
        const [_path, params] = (_a = req === null || req === void 0 ? void 0 : req.url) === null || _a === void 0 ? void 0 : _a.split("?");
        const Channel = query_string_1.default.parse(params);
        ws.on("message", (message) => {
            const parsedMessage = JSON.parse(message.toString());
            console.log(parsedMessage);
            wss.clients.forEach(client => {
                console.log(client);
                client.send(JSON.stringify(parsedMessage));
            });
        });
    });
    return wss;
});
exports.default = HomeChannel;
