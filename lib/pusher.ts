import pusherServer from "pusher";
import pusherClient from "pusher-js";

export const PusherServer = new pusherServer({
    appId: "1812579",
    key: "db82f7fe8a01c4874e83",
    secret: "9d007b7e06e03a4ef78e",
    cluster: "ap2",
    useTLS: true
    
});

export const PusherClient = new pusherClient(
    "db82f7fe8a01c4874e83",
    {
        cluster: "ap2"
    }
);
