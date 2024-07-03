export function groupMessage(session) {
    return ({ sender, channelname, message }) => {
        const channel = session.channel
        channel.messages.push({ sender, channelname, message });

        const messagesListElement = document.querySelector("#messages");
        messagesListElement.innerHTML += `<li>${ message }</li>`;
    };
}

export function privateMessage(session) {
    return ({ sender, to, message }) => {
        const messages = session.messages;
        messages.push({ sender, to, message });
        console.log({ sender, to, message });

        if (session.nickname === to) {
            console.log(`${ sender + ": " + message }`)
            const messagesListElement = document.querySelector("#messages");
            messagesListElement.innerHTML += `<li>${ sender + ": " + message }</li>`;            
        } else {
            console.log(`<li>${ "yourself:  " + message }</li>`);
            const messagesListElement = document.querySelector("#messages");
            messagesListElement.innerHTML += `<li>${ "yourself:  " + message }</li>`;
        }
    };
}
