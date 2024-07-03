import { Channel } from "../@types/channel";
import { mongoose, Schema } from "../lib";

const channelSchema: Schema = new Schema({
    name: { type: String, required: true },
    topic: { type: String, required: true },
    isPrivate: { type: Boolean, required: true },
    users: [{ type: String, required: true }],
});

export const ChannelModel = mongoose.model<Channel>('Channel', channelSchema);