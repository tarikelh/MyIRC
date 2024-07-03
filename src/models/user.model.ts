import { User } from "../@types/user";
import { mongoose, Schema } from "../lib";

const userSchema: Schema = new Schema({
    username: { type: String, required: true },
    nickname: { type: String, required: true },
    realname: { type: String, required: true },
    hostname: { type: String, required: true },
    ip_address: { type: String, required: true },
    channels: [{ type: String, required: true }],
    status: { type: String, required: true }
});

export const UserModel = mongoose.model<User>("User", userSchema);
