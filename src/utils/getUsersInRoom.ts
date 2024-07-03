// import { ServerHandler, SocketHandler, SocketData } from "../@types/socketio";

// export function getUsersInRoom(io: ServerHandler<SocketData>, channelname: string) {
//     const usersInRoom = io.of('/').in(channelname).clients((error: any, clients: any) => {
//         if (error) throw error;
//         return clients.map((client: string) => io.sockets.sockets[client].nickname);
//     });

//     io.to(channelname).emit('users:list', usersInRoom);
// }
