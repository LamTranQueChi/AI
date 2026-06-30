document.addEventListener("DOMContentLoaded", () => {
    // Tabs

    const tabs = document.querySelectorAll(".tab-btn");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
        });
    });

    const button = document.getElementById("linkVneidBtn");

    button.addEventListener("click", () => {

        alert(
    `Trong phiên bản MVP của AI Public Assistant, chức năng liên kết VNeID chưa được triển khai.

    Tính năng này sẽ được tích hợp khi hệ thống được cơ quan có thẩm quyền cấp quyền kết nối với VNeID.`
        );

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