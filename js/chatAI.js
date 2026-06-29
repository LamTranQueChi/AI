const textarea = document.querySelector(".chat-input textarea");

textarea.addEventListener("input", () => {

    textarea.style.height = "40px";

    textarea.style.height = textarea.scrollHeight + "px";
});