import { User } from "./user"
import { Channel } from "./channel"
import { Message } from "./message"

export interface Session {
    user: User,
    channel: Channel
    channels: Channel[]
    messages: Message[]
}
