import { ServerHandler, SocketHandler } from "../@types/socketio";
import { joinChannel, leaveChannel, listChannels } from "../controllers/channels";
import { handleDisconnection } from "../controllers/auth";
import { groupMessage, privateMessage } from "../controllers/messages";

const channels: any[] = [];
const users: any[] = [];
const messages: any[] = [];

export function onConnection(io: ServerHandler) {
    return (socket: SocketHandler) => {
        const join = joinChannel(io, socket, { channels, users, messages });
        socket.on("channels:join", join)

        // const leave = leaveChannel(io, socket, { channels })
        // socket.on("channels:leave", leave);

        const list = listChannels(socket, { channels });
        socket.on("channels:list", list);

        // socket.on("users:list", (channel) => {
        //     socket.emit("users:list", users);
        // });
    
        const group = groupMessage(io, socket);
        socket.on("messages:group", group);


        const privmsg = privateMessage(io, socket, { users });
        socket.on("messages:private", privmsg);

        const disconnect = handleDisconnection(io, socket, { channels, users });
        socket.on("auth:disconnect", disconnect);
    }
}
