function initChat() {

    const btn = document.getElementById(
        "chatFloatingBtn"
    );

    const panel = document.getElementById(
        "chatPanel"
    );

    const closeBtn = document.getElementById(
        "closeChat"
    );

    if (!btn || !panel) return;

    // Mở chat

    btn.onclick = () => {

        panel.classList.remove(
            "hidden-chat"
        );

    };

    // Đóng chat

    closeBtn.onclick = () => {

        panel.classList.add(
            "hidden-chat"
        );

    };


    // Drag Button

    let dragging = false;
    let offsetX, offsetY;

    btn.addEventListener("mousedown", e => {

        dragging = true;

        offsetX = e.clientX - btn.offsetLeft;
        offsetY = e.clientY - btn.offsetTop;

        btn.style.cursor = "grabbing";

    });

    document.addEventListener("mousemove", e => {

        if (!dragging) return;

        btn.style.left =
            (e.clientX - offsetX) + "px";

        btn.style.top =
            (e.clientY - offsetY) + "px";

        btn.style.right = "auto";
        btn.style.bottom = "auto";
    });

    document.addEventListener("mouseup", () => {

        dragging = false;

        btn.style.cursor = "grab";

    });

}