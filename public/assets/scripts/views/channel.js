export function displayTitle(connect) {
    document.title = connect.channel.name + " | FMT IRC";
}

export function displayChannel(connect) {
    const channelNameHeader = document.querySelector("#channelName");
    channelNameHeader.textContent = connect.channel.name;
}

// export function displayChannels() {
//     socket.emit("channels:list");
//     socket.on("channels:list", (userRooms) => {
//         console.log(userRooms);
//     });
// }

//affichage liste des users
// export function displayUsers(){
//     socket.emit("users:list");
//     socket.on("users:list", (user) => {
//         console.log(user);
//     });
// }
