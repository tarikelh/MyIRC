import { Request, Response } from "../lib";
import { ServerHandler, SocketHandler } from "../@types/socketio";
import { Channel } from "../@types/channel";
import { User } from "../models/user";

export function handleConnection(request: Request, response: Response) {
    try {
        const { nickname, password, channelname } = request.body;

        if (!nickname || !channelname) throw { status: 400, message: "missing parameters", success: false };
        const _nickname: string = nickname.toLowerCase().trim();
        const _channelname: string = channelname.toLowerCase().trim();

        const userFound = User.findOne({ nickname: _nickname });
        console.log(userFound)

        // if (password && !userFound) {
        //     const validPassword = (password === userFound.password);
        //     if (!validPassword) throw { status: 401, message: "invalid password", success: false };
        // } else if (!password && userFound) {
        //     throw { status: 409, message: "user already existed", success: false };
        // } else if (password && !userFound) {
        //     const newUser = { username: "", password, nickname, realname: "", admin: false }
        //     User.create(newUser);
        // }

        if (!password && userFound) {
            throw { status: 409, message: "user already existed", success: false };
        }

        response.status(201).json({ message: "user successfully/ registered", nickname: _nickname, channelname: _channelname, success: true });
    } catch(error: any) {
        response.status(error.status).json({ message: error.message, success: error.success });
    }
}

export function handleDisconnection(io: ServerHandler, socket: SocketHandler, Data: { channels: Channel[], users: any[] }) {
    return (data: { nickname: string, channels: Channel[] }) => {
        Data.users = Data.users.filter((user) => user.nickname !== data.nickname);
        Data.channels.forEach((channel) => {
            const index = channel.users.indexOf(data.nickname);
            channel.users.filter((nickname) => nickname !== data.nickname);
            if (index !== -1) channel.users.splice(index, 1);
        });
        
        data.channels.forEach((channel) => {
            const index = channel.users.indexOf(data.nickname);
            channel.users.filter((nickname) => nickname !== data.nickname);
            if (index !== -1) channel.users.splice(index, 1);
            io.to(channel.name).emit("channels:leave:someone", { nickname: data.nickname, channelname: channel.name, users: channel.users });
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected', socket.id);
        });
    };
}
