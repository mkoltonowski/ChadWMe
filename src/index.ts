import WebSocket, { WebSocketServer } from "ws";
import HomeChannel from "./WebSockets/HomeChannel";
import express from "express";


/**
 * Server Configuration
 * @author mKolt
 */
const port = process.env.PORT|| 3001
const app = express();


const server = app.listen(port, ()=>{
    if(process.send){
        process.send(`Appliaction has booted at http://localhost:${port}`);
    }
})


HomeChannel(server)
