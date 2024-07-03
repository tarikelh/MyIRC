import { handleDisconnectElement, handleDisconnection, handleMessageSubmit } from "./containers/channel.js";
import { initSocket } from "./listeners/socketio.js";
import { isLogged } from "./utils/isLogged.js";

isLogged()

const { socket, session } = initSocket();

const messageInputElement = document.querySelector("#messageInput");
messageInputElement.focus();

const avatarElement = document.querySelector(".avatar");
avatarElement.addEventListener("click", handleDisconnectElement);

const forgetMeElement = document.querySelector(".forget-me");
const disconnect = handleDisconnection(socket, session)
forgetMeElement.addEventListener("click", disconnect);

const messageFormElement = document.querySelector("#messageForm");
const messageSubmit = handleMessageSubmit(socket, session);
messageFormElement.addEventListener("submit", messageSubmit);
