document.addEventListener("DOMContentLoaded", () => {
    // Tabs

    const tabs = document.querySelectorAll(".tab-btn");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
        });
    });

    // VNeID

    const status = document.getElementById("vneidStatus");
    const button = document.getElementById("linkVneidBtn");

    function updateVneidUI() {
        if (localStorage.getItem("vneidLinked") === "true") {
            status.textContent = "🟢 Đã liên kết VNeID";
            button.textContent = "Quản lý";
        } else {
            status.textContent = "🔴 Chưa liên kết VNeID";
            button.textContent = "Liên kết ngay";
        }
    }

    // Hiển thị trạng thái khi mở trang
    updateVneidUI();

    button.addEventListener("click", () => {

        // Đã liên kết
        if (localStorage.getItem("vneidLinked") === "true") {

            alert("Tài khoản đã liên kết VNeID.");

            return;
        }

        // Chưa liên kết
        window.open("https://universal.vneid.gov.vn/", "_blank");

        const success = confirm(
            "Giả lập liên kết VNeID thành công?"
        );

        if (success) {
            localStorage.setItem("vneidLinked", "true");
            updateVneidUI();
        }

    });

    // Avatar
    const avatarWrapper = document.querySelector(".avatar-wrapper");
    const avatarInput = document.getElementById("avatarInput");
    const avatarPreview = document.getElementById("avatarPreview");

    // Khi mở trang thì lấy ảnh đã lưu
    const savedAvatar = localStorage.getItem("avatar");

    if (savedAvatar) {
        avatarPreview.src = savedAvatar;
    }

    // Click ảnh để chọn ảnh mới
    avatarWrapper.addEventListener("click", () => {
        avatarInput.click();
    });

    // Chọn ảnh
    avatarInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            avatarPreview.src = e.target.result;

            // Lưu vào localStorage
            localStorage.setItem("avatar", e.target.result);

        };

        reader.readAsDataURL(file);

    });
});

// Hiển thị thông tin tài khoản
// Hiển thị thông tin tài khoản
const user = JSON.parse(localStorage.getItem("user"));
const savedAvatar = localStorage.getItem("avatar");

const topbarAvatar = document.getElementById("topbarAvatar");

// Hiển thị avatar
if (topbarAvatar && savedAvatar) {
    topbarAvatar.src = savedAvatar;
}

// Hiển thị thông tin người dùng
if (user) {

    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");
    const userPhone = document.getElementById("userPhone");
    const profileFullName = document.getElementById("profileFullName");

    if (userName) {
        userName.textContent = user.fullName;
    }

    if (userEmail) {
        userEmail.textContent = user.email;
    }

    if (userPhone) {
        userPhone.textContent = user.phone;
    }

    if (profileFullName) {
        profileFullName.textContent = user.fullName;
    }

}