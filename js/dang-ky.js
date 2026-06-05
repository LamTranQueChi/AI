document.addEventListener("DOMContentLoaded", function(){

    const form =
        document.querySelector("form");

    form.addEventListener("submit", function(event){

        event.preventDefault();

        alert("Đăng ký thành công!");

    });

});