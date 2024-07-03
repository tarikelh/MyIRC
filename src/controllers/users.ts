import { Request, Response } from "../lib";
import { User } from "../models/index.model";
import { ServerHandler, SocketHandler, SocketData } from "../@types/socketio";


export function getAllUsers(/*request: Request, response: Response,*/ socket: SocketHandler<SocketData>) {
    return async (channelName : string) => {
        const usersInChannel = getUsersInChannel(channelName);

        socket.emit("users:list", await usersInChannel);
    };
    // const users : User[] = await User.find();
    //     response.json(users);
    //     return 
            //response.status(500).json({ message: "Internal server error" });

}

export async function getOneUser(request: Request, response: Response) {
    try {
        //const user = await User.findOne({nickname: });

    } catch (error) {
        
    }
}

export function updateUser(request: Request, response: Response) {}

export function deleteUser(request: Request, response: Response) {}


export function getChannelsByUser(request: Request, response: Response) {

}

async function getUsersInChannel(channelName : string){
    try {
        const usersInChannel = await User.find({ channels: { $in: [channelName] } });
        const usernames : string[] = usersInChannel.map((user : any) => user.username);

        return usernames;
    } catch (error) {
        // Gérer les erreurs ici
        console.error('Error fetching users in channel:', error);
        return [];
    }
};