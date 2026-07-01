
// LOAD COMPONENT
function loadComponent(id, file) {

    const element = document.getElementById(id);

    if (!element) return;

    fetch(file)
        .then(response => response.text())
        .then(data => {

            element.innerHTML = data;

            if (id === "sidebar-container") {
                activeMenu();
                initSidebar();
            }

            if (id === "topbar-container") {
                updateTopbarUser();
            }

            if (id === "chat-container") {
                initChat();
            }

        })
        .catch(error => console.log(error));
}

document.addEventListener("DOMContentLoaded", () => {

    loadComponent("sidebar-container", "components/sidebar.html");
    loadComponent("topbar-container", "components/topbar.html");
    loadComponent("chat-container", "components/chatbot.html");
    loadComponent("footer-container", "components/footer.html");

});


// MỞ / ĐÓNG CHAT

function initChat() {

    setTimeout(() => {

        const btn = document.getElementById("toggleChat");
        const chat = document.getElementById("chatPanel");

        if (!btn || !chat) return;

        if (btn.dataset.loaded) return;

        btn.dataset.loaded = true;

        btn.addEventListener("click", () => {

            chat.classList.toggle("hidden-chat");

        });

    }, 300);

}

// ACTIVE MENU

function activeMenu() {

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .replace(".html", "");

    document.querySelectorAll(".nav-link").forEach(link => {

        if (link.dataset.page === currentPage) {

            link.classList.add(
                "bg-green-700",
                "text-white",
                "font-semibold"
            );

            link.querySelectorAll(".material-symbols-outlined").forEach(icon=>{
                icon.classList.add("text-white");
            });

        }

    });

}


function updateTopbarUser() {

    // Avatar
    const avatar = localStorage.getItem("avatar");
    const topbarAvatar = document.getElementById("topbarAvatar");

    if (avatar && topbarAvatar) {
        topbarAvatar.src = avatar;
    }

    // Thông tin người dùng
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {

        const name = document.getElementById("topbarName");

        if (name) {
            name.textContent = user.fullName;
        }

    }

}

//sidebar
function initSidebar() {

    // Active menu
    const page = location.pathname.split("/").pop();

    document.querySelectorAll(".sidebar-item").forEach(item => {

        if (item.getAttribute("href") === page) {

            item.style.background = "#166534";
            item.style.color = "#fff";
            item.style.fontWeight = "600";

            item.querySelectorAll(".material-symbols-outlined").forEach(icon => {
                icon.style.color = "#fff";
            });
        }

    });

    // Nút Tìm hiểu
    const btn = document.getElementById("vneidInfoBtn");

    if (btn) {

        btn.addEventListener("click", () => {

            alert(
             `Phiên bản hiện tại là MVP.

            Chức năng liên kết VNeID là định hướng phát triển trong tương lai và sẽ được triển khai khi hệ thống được cơ quan có thẩm quyền cấp quyền kết nối.`
                            );
            });
    }
}