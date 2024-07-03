export function isLogged() {
    const auth = JSON.parse(localStorage.getItem("auth") || null);

    if (auth === null || auth.success === false) {
        window.location.href = "/login";
        return;
    }

    const appElement = document.querySelector("#app");
    appElement.style.display = "flex";
}