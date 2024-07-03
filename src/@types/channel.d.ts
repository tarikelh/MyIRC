import { Message } from "./message";

export interface Channel {
    name: string,
    users: string[],
    messages: Message[],
    private: boolean
}