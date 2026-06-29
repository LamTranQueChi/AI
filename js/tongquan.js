document.addEventListener("DOMContentLoaded", () => {

    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);

    const greeting = document.getElementById("greetingName");
    console.log(greeting);

    if (user && greeting) {
        greeting.textContent = `Xin chào, ${user.fullName}! 👋`;
    }

});