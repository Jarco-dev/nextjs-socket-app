import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types";

const handle = (req: NextApiRequest, res: NextApiResponseServerIO) => {
    const input = req.body.input;
    if(res.socket.server.io) res.socket.server.io.emit("input-update", input);
    res.status(201).json({input});
}

export default handle;
