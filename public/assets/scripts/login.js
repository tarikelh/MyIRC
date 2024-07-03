import { startConnect } from "./services/login.js";
import { handleInput, handleSubmit } from "./containers/login.js";

const auth = JSON.parse(localStorage.getItem("auth") || null);
if (auth && auth.success === true) {
    window.location.href = "/";
}

const nicknameInputElement = document.querySelector("#nickname");
nicknameInputElement.addEventListener("input", handleInput);

const channelInputElement = document.querySelector("#channel");
channelInputElement.addEventListener("input", handleInput);

const loginFormElement = document.querySelector("#loginForm");
const submit = handleSubmit(startConnect)
loginFormElement.addEventListener("submit", submit);
