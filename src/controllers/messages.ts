import { ServerHandler, SocketHandler } from "../@types/socketio";
import { Channel } from "../@types/channel";

export function groupMessage(io: ServerHandler, socket: SocketHandler) {
    return (data: { sender: string, channelname: string, message: string }) => {
        io.to(data.channelname).emit("messages:group", data);
    };
}

export function privateMessage(io: ServerHandler, socket: SocketHandler, Data: { users: any[] }) {
    return (data: { sender: string, to: string, message: string }) => {
        const recipient = Data.users.find(user => user.nickname === data.to);
        
        if (!recipient) return;

        socket.to(recipient.id).emit("messages:private", data);
    };
}

// export function editMessage() {}
