const form = document.getElementById("contactForm");

form.addEventListener("submit", function(event){

    event.preventDefault();

    alert("Gửi liên hệ thành công!");
});

// Tự động điền sản phẩm
const productInput = document.getElementById("product-input");
const productName = localStorage.getItem("productName");
if(productName){
    productInput.value = productName;
}