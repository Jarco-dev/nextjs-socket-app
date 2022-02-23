import type { NextPage } from 'next';
import { ChangeEvent, useEffect, useState } from "react";
import SocketIO from "socket.io-client";

let socket: ReturnType<typeof SocketIO>;
const Home: NextPage = () => {
    const [input, setInput] = useState("");

    useEffect(() => {
        (async () => {
            await fetch("http://localhost:3000/api/socket");

            socket = SocketIO("ws://localhost:3000", {
                path: "/api/socket"
            });

            socket.on("connect", () => {
                console.log("Socket connected ", socket.id);
            });

            socket.on("input-update", (input: string) => {
                setInput(input);
            });
        })();
    }, []);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        fetch("http://localhost:3000/api/input-update", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({input: e.target.value})
        });
    }

    return (
        <input
            placeholder="Type something"
            value={input}
            onChange={onChangeHandler}
        />
    )
}

export default Home;
