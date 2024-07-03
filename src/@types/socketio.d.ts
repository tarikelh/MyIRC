import { Server, Socket } from "../lib";
import { Channel } from "./channel";

interface ServerToClientEvents {
    "channels:init": (data: { nickname: string, channelname: string }) => void;
    "channels:join": (data: { nickname: string, channelname: string }) => void;
    "channels:leave": (data: { nickname: string, channelname: string }) => void;
    "channels:list": () => void;

    // "users:list": (users: string[]) => void;
    
    "messages:group": (data: { sender: string, channelname: string, message: string }) => void;
    "messages:private": (data: { sender: string, to: string, message: string }) => void;
    // "messages:list": () => void;
    
    "auth:disconnect": (data: { nickname: string, channels: Channel[] }) => void;
}

interface ClientToServerEvents {
    "channels:init": (data: { channel: { name: string, users: string[] } }) => void;
    "channels:join": (data: { channel: { name: string, users: string[] } }) => void;
    "channels:join:someone": (data: { nickname: string, channelname: string, users: string[] }) => void;
    "channels:leave": (data: { channel: { name: string, users: string[] } }) => void;
    "channels:leave:someone": (data: { nickname: string, channelname: string, users: string[] }) => void;
    "channels:list": (data: { channels: Channel[] }) => void;

    "messages:group": (data: { sender: string, channelname: string, message: string }) => void;
    "messages:private": (data: { sender: string, to: string, message: string }) => void;
    // "messages:receiving": (data: { sender: string, channelname: string, message: string }) => void;
    // "messages:list": () => void;
    
    // "auth:disconnect": (data: { nickname: string}) => void;
}

interface InterServerEvents {
    // ping: () => void;
}

interface SocketData {
    message: string;
    channelName: string;
    userName: string;
    channels: string[];
    users: string[];
}


export interface ServerHandler extends Server<ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData> {}

export interface SocketHandler extends Socket<ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData> {}