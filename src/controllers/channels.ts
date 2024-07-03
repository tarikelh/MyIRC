import { ServerHandler, SocketHandler } from "../@types/socketio";
import { Channel } from "../@types/channel";
import { Message } from "../@types/message";

export function joinChannel(io: ServerHandler, socket: SocketHandler, Data: { channels: Channel[], users: any[], messages: Message[] }) {
    return (data: { nickname: string, channelname: string }) => {

        const { nickname, channelname } = data;
        const { channels, users, messages } = Data;

        socket.join(channelname);

        const userExists = users.some(user => user.nickname === nickname);

        if (!userExists) {
            users.push({ id: socket.id, nickname });
        }

        const channelFound = channels.find((channel) => channel.name === channelname);

        if (!channelFound) {
            const newChannel = { name: channelname, users: [nickname], messages, private: false };
            channels.push(newChannel);

            socket.emit("channels:join", { channel: newChannel });
            io.to(channelname).emit("channels:join:someone", { nickname, channelname, users: newChannel.users });
        } else {
            if (!channelFound.users.includes(nickname)) {
                channelFound.users.push(nickname);
            }

            socket.emit("channels:join", { channel: channelFound });
            io.to(channelname).emit("channels:join:someone", { nickname, channelname, users: channelFound.users });
        }
    };
}

export function leaveChannel(io: ServerHandler, socket: SocketHandler, Data: { channels: Channel[] }) {
    return (data: { nickname: string, channelname: string }) => {
        const { channels } = Data;
        
        const channelFound = channels.find((channel) => channel.name === data.channelname);
        
        if (channelFound) {
            Data.channels.forEach((channel) => {
                const index = channel.users.indexOf(data.nickname);
                channel.users.filter((nickname) => nickname !== data.nickname);
                if (index !== -1) channel.users.splice(index, 1);

                socket.leave(data.channelname);
                socket.emit("channels:leave", { channel: channelFound });
                io.to(channel.name).emit("channels:leave:someone", { nickname: data.nickname, channelname: channel.name, users: channel.users });
            });
        }
    };
}

export function listChannels(socket: SocketHandler, Data: { channels: Channel[] }) {
    return () => {
        socket.emit("channels:list", { channels: Data.channels })
    };
}
