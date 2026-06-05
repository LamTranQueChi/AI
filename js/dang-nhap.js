document.addEventListener("DOMContentLoaded", function(){

    const login =
        document.getElementById("login");

    const forgot =
        document.getElementById("forgot");

    const showForgot =
        document.getElementById("showForgot");

    const backLogin =
        document.getElementById("backLogin");


    // HIỆN QUÊN MẬT KHẨU
    showForgot.addEventListener("click", function(){

        login.style.display = "none";

        forgot.style.display = "block";

    });


    // QUAY LẠI LOGIN
    backLogin.addEventListener("click", function(){

        forgot.style.display = "none";

        login.style.display = "block";

    });

});