export function handleDisconnectElement(event) {
    const disconnectElement = document.querySelector(".disconnect");
    const isVisible = disconnectElement.style.display === "block";

    disconnectElement.style.display = !isVisible ? "block" : "none";
}

export function handleDisconnection(socket, session) {
    return () => {
        localStorage.clear();
        socket.emit("auth:disconnect", { nickname: session.nickname, channels: session.channels });
    
        window.location.href = "/login";
    };
}

export function handleMessageSubmit(socket, session) {
    return (event) => {
        event.preventDefault();

        const messageInputElement = document.querySelector("#messageInput");
        if (messageInputElement.value === "") return;

        const valueTrimmed = messageInputElement.value.trim();
        const valueSplitted = valueTrimmed.split(" ")
        const command = valueSplitted[0].toUpperCase();

        let channel = "";

        switch(command) {
            case "JOIN":
                channel = valueSplitted[1].toLowerCase();

                if (!channel) {
                    alert("missing parameter")
                    return;
                }

                socket.emit("channels:join", { nickname: session.nickname, channelname: channel });
                break;
            case "PART":
                channel = (valueSplitted[1]) ? valueSplitted[1] : session.channel.name

                socket.emit("channels:leave", { nickname: session.nickname, channelname: channel });
                break;
            case "LIST":
                socket.emit("channels:list");
                break;
            case "QUIT":
                localStorage.clear();
                socket.emit("auth:disconnect", { nickname: session.nickname, channels: session.channels });
                window.location.href = "/login";
                break
            case "PRIVMSG":
                socket.emit("messages:private", { sender: session.nickname, to: valueSplitted[1], message: valueSplitted[2] });
                break;
            case "MODE":
                break;
            default:
                socket.emit("messages:group", { sender: session.nickname, channelname: session.channel.name, message: messageInputElement.value });
                break;
        }

        messageInputElement.value = "";
    };
}
