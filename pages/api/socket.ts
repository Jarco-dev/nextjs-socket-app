import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";

const handle = (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (!res.socket.server.io) {
        console.log("Creating new socket");
        const httpServer: NetServer = res.socket.server as any;
        const io = new ServerIO(httpServer, {
            path: "/api/socket"
        });
        res.socket.server.io = io;

        io.on("connection", (input) => console.log(input));
    }
    res.end();
}

export default handle;
