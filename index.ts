import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "./types";
import { Server as NetServer } from "http";
import { Server as ServerIO } from "socket.io";

const SocketHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (!res.socket.server.io) {
        console.log("Creating new socketio");

        const httpServer: NetServer = res.socket.server as any;
        res.socket.server.io = new ServerIO(httpServer, {
            path: "/api/socketio"
        });
    } else {
        console.log("Socket already exists");
    }
    res.end();
}

export default SocketHandler;
