import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types";

const SocketHandler = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
    const sockets = await res.socket.server.io.fetchSockets();
    const ids = sockets.map((socket) => socket.id)
    res.status(200).json({ids});
}

export default SocketHandler;
