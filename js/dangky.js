
// Hiện / Ẩn mật khẩu
function setupToggle(inputId, buttonId, iconId) {

    const input = document.getElementById(inputId);
    const button = document.getElementById(buttonId);
    const icon = document.getElementById(iconId);

    if (!input || !button || !icon) return;

    button.addEventListener("click", () => {

        if (input.type === "password") {
            input.type = "text";
            icon.textContent = "visibility";
        } else {
            input.type = "password";
            icon.textContent = "visibility_off";
        }

    });

}
setupToggle("password", "togglePassword", "passwordIcon");
setupToggle(
    "confirm_password",
    "toggleConfirmPassword",
    "confirmPasswordIcon"
);

document.addEventListener("DOMContentLoaded", () => {

    // Nút VNeID (Dự kiến)
    const futureBtn = document.getElementById("futureVneidBtn");

    if (futureBtn) {
        futureBtn.addEventListener("click", () => {

            alert(`Phiên bản hiện tại là MVP.

Đăng ký bằng VNeID là tính năng dự kiến và sẽ được triển khai khi hệ thống được cơ quan có thẩm quyền cấp quyền kết nối với VNeID.`);

        });
    }

    // Đăng ký tài khoản
    const form = document.querySelector("form");

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const fullName = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm_password").value;

        // Kiểm tra dữ liệu

        if (!fullName || !email || !phone || !password || !confirmPassword) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp.");
            return;
        }

        try {

            const response = await fetch("http://localhost:3000/register", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    fullName,
                    email,
                    phone,
                    password
                })

            });

            const data = await response.json();

            alert(data.message);

            if (data.success) {

                form.reset();

                // Có thể chuyển sang trang đăng nhập
                window.location.href = "dangnhap.html";

            }

        } catch (error) {

            console.error(error);

            alert("Không thể kết nối tới máy chủ.");

        }

    });

});