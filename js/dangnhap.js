console.log("dangnhap.js đã chạy");
document.addEventListener("DOMContentLoaded", () => {

    const loginBtn = document.getElementById("loginBtn");

    loginBtn.addEventListener("click", function () {

        const account = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^0\d{9}$/;

        // Kiểm tra tài khoản
        if (account === "") {
            alert("Vui lòng nhập Email hoặc Số điện thoại.");
            return;
        }

        if (!emailRegex.test(account) && !phoneRegex.test(account)) {
            alert("Email hoặc số điện thoại không đúng định dạng.");
            return;
        }

        // Kiểm tra mật khẩu
        if (password === "") {
            alert("Vui lòng nhập mật khẩu.");
            return;
        }

        // Demo đăng nhập thành công
        const user = {
            fullName: "Lâm Trần Quế Chi",
            email: "quechi@gmail.com",
            phone: "0987654321"
        };

        // Lưu user
        localStorage.setItem("user", JSON.stringify(user));

        alert("Đăng nhập thành công!");

        // Chuyển trang
        window.location.href = "tongquan.html";

    });

});
// VNeID (dự kiến)
const futureVneidBtn = document.getElementById("futureVneidLoginBtn");

if (futureVneidBtn) {

    futureVneidBtn.addEventListener("click", () => {

        alert(
`Phiên bản hiện tại là MVP.

Đăng nhập bằng VNeID là tính năng dự kiến và sẽ được triển khai khi hệ thống được cơ quan có thẩm quyền cấp quyền kết nối với VNeID.`
        );

    });

}

// Hiện / Ẩn mật khẩu
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const passwordIcon = document.getElementById("passwordIcon");

if (togglePassword) {

    togglePassword.addEventListener("click", () => {

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            passwordIcon.textContent = "visibility";
        } else {
            passwordInput.type = "password";
            passwordIcon.textContent = "visibility_off";
        }

    });

}