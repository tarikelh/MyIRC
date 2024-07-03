import { joinChannel, someoneJoinChannel, leaveChannel, someoneLeaveChannel, listChannels } from "./handlers/channels.js";
import { groupMessage, privateMessage } from "./handlers/messages.js";

export function initSocket() {
    const socket = io();

    const login = JSON.parse(localStorage.getItem("login") || null);
    const { nickname, channelname } = login;
    const session = { nickname, channel: {}, channels: [], messages: [] };

    socket.on("connect", () => {
        socket.emit("channels:join", { nickname, channelname });
    });
    
    const join = joinChannel(session);
    socket.on("channels:join", join);

    const someoneJoin = someoneJoinChannel(session);
    socket.on("channels:join:someone", someoneJoin);
    
    const leave = leaveChannel(socket, session);
    socket.on("channels:leave", leave);

    const someoneLeave = someoneLeaveChannel(session);
    socket.on("channels:leave:someone", someoneLeave);

    const list = listChannels(session);
    socket.on("channels:list", list);

    const group = groupMessage(session);
    socket.on("messages:group", group);

    const privmsg  = privateMessage(session);
    socket.on("messages:private", privmsg);

    return { socket, session };
}
