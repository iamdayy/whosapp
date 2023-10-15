import { io } from "socket.io-client";

const socket = io("https://whosapp.fly.dev" ,{
    autoConnect: false,
});

export default socket;