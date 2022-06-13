/**Imports */
import WebSocket, { WebSocketServer } from "ws";
import queryString from "query-string";

/**Interfaces for TSC */
import { Server } from "http";
import { IncomingMessage } from "http";
import { Duplex } from "stream";

/**
 * Websocket Handler for App
 * @author mKolt
 * @param expressServer 
 * @returns 
 */
const HomeChannel = async (expressServer: Server)=>{
    
    /**
     * Create WS Server
     */
    const wss = new WebSocketServer({
        noServer: true, 
        path:'/websockets'
    });

    /**
     * Connect WS Server with Express Server
     */
    expressServer.on("upgrade",(request: IncomingMessage, socket: Duplex, head: Buffer)=>{
        wss.handleUpgrade(request, socket, head, (websocket: WebSocket) => {
            wss.emit("connection", websocket, request);
        });
    });


    /**
     * Connection Handler
     */
    wss.on("connection", (ws: WebSocket.WebSocket, req:Request)=>{
        const [_path, params] = req?.url?.split("?");
        const Channel = queryString.parse(params);

        ws.on("message", (message)=>{
            const parsedMessage = JSON.parse(message.toString());
            console.log(parsedMessage);

            wss.clients.forEach(client=>{
                console.log(client);
                client.send(JSON.stringify(parsedMessage))
            })
        })
    })


    return wss;
}

export default HomeChannel