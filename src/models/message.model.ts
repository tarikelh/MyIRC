import { Message } from "../@types/message";
import { mongoose, Schema } from "../lib";

const messageSchema: Schema = new Schema({
    user: { type: String, required: true },
    channel: { type: String, required: true },
    timestamp: { type: String, required: true },
    content: { type: String, required: true }
});

export const MessageModel = mongoose.model<Message>("Message", messageSchema);