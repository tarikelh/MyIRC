export function joinChannel(session) {
    return ({ channel }) => {
        session.channel = channel;
        session.channels.push(channel);

        document.title = channel.name + " | FMT IRC";

        const channelNameElement = document.querySelector("#channelName");
        channelNameElement.textContent = channel.name;

        const userElement = document.querySelector("#user");
        userElement.textContent = session.nickname;

        const channelsList = document.querySelector("#channelsList");
        channelsList.innerHTML = (session.channels.length !== 0) ? session.channels.map((channelItem) => {
            return `<li class="channelItem${ (channelItem.name === session.channel.name) ? " active" : ""}">${ channelItem.name }</li>`;
        }).join("") : "";

        const channelsListElement = document.querySelector("#channels");
        channelsListElement.style.display = "none";

        const messagesList = document.querySelector("#messagesList");
        messagesList.innerHTML = (session.messages.length !== 0) ? session.messages.map((messageItem) => {
            return `<li class="messageItem${ (messageItem.name === session.channel.name) ? " active" : ""}">${ messageItem.name }</li>`;
        }).join("") : "";

        const messagesListElement = document.querySelector("#messages");
        messagesListElement.style.display = "block";
        messagesListElement.innerHTML = "";
    };
}

export function someoneJoinChannel(session){
    return ({ nickname, channelname, users }) => {
        if (session.channel.name === channelname) {
            session.channel.users = users

            const peopleHereElement = document.querySelector(".people-here");
            peopleHereElement.textContent = `${ session.channel.users.length } people here`;

            const nickListElement = document.querySelector("#nicklist");
            nickListElement.innerHTML = session.channel.users.map((user) => `<li>${ user }</li>`).join("");

            const messagesListElement = document.querySelector("#messages");
            messagesListElement.innerHTML += `<li>→ ${ nickname } has joined</li>`;
        }
    };
}

export function leaveChannel(socket, session) {
    return ({ channel }) => {
        const _channel = channel;
        
        if (session.channels.length >= 2) {
            session.channels = session.channels.filter((channel) => channel.name !== _channel.name);
            socket.emit("channels:join", { nickname: session.nickname, channelname: session.channels[0].name });
        } else {
            localStorage.clear();
            socket.emit("auth:disconnect", { nickname: session.nickname, channels: session.channels });
            window.location.href = "/login";
        }
    };
}

export function someoneLeaveChannel(session){
    return ({ nickname, channelname, users }) => {
        if (session.channel.name === channelname) {
            session.channel.users = users

            const peopleHereElement = document.querySelector(".people-here");
            peopleHereElement.textContent = `${ session.channel.users.length } people here`;

            const nickListElement = document.querySelector("#nicklist");
            nickListElement.innerHTML = session.channel.users.map((user) => `<li>${ user }</li>`).join("");

            const messagesListElement = document.querySelector("#messages");
            messagesListElement.innerHTML += `<li>→ ${ nickname } has left</li>`;
        }
    };
}

export function listChannels(session) {
    return ({ channels }) => {
        const messagesListElement = document.querySelector("#messages");
        messagesListElement.style.display = "none";

        const channelsListElement = document.querySelector("#channels");
        channelsListElement.style.display = "block";
        channelsListElement.innerHTML = channels.map((channel) => `<li>${ channel.name } - ${ channel.users.length } users</li>`);
    };
}
