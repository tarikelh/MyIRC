/**
 * This function handles input events to check if the input field is empty.
 * If the input field is empty, it disables the submit button; otherwise, it enables it.
 * @param {Event} event - The input event object.
 */
export function handleInput(event) {
    const submitInputElement = document.querySelector("#submit");
    submitInputElement.disabled = (event.target.value.trim() === "") ? true : false;
}

/**
 * This function creates a new connection for a user to a predefined channel 
 * and initializes connection details in the localStorage.
 * @param {Function} startConnect - The function to initiate the connection.
 * @returns {Function} - An asynchronous function to handle form submission.
 */
export function handleSubmit(startConnect) {
    return async (event) => {
        event.preventDefault();

        const nicknameInputElement = document.querySelector("#nickname");
        const channelInputElement = document.querySelector("#channel");

        const nicknameValue = nicknameInputElement.value;
        const channelValue = channelInputElement.value.toLowerCase();

        const response = await startConnect({ nickname: nicknameValue, channelname: channelValue });

        if (response.success) {
            localStorage.setItem("auth", JSON.stringify({ success: true }));
            localStorage.setItem("login", JSON.stringify({ nickname: response.nickname, channelname: response.channelname }));
            window.location.href = "/";
        }
    }
}
