const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContent = document.getElementById("cart-content");

if(cart.length == 0)
{
    const text = document.createElement("p");
    text.innerText = "Không có sản phẩm nào trong giỏ hàng.";
    cartContent.appendChild(text);
}
else
{
    for(let i = 0; i < cart.length; i++)
    {
        // Khung sản phẩm
        const item = document.createElement("div");
        item.className = "cart-item";

        // Ảnh
        const image = document.createElement("img");
        image.src = cart[i].image;

        // Khung thông tin
        const info = document.createElement("div");
        info.className = "cart-info";

        // Tên
        const name = document.createElement("h3");
        name.innerText = cart[i].name;

        // Mô tả ngắn
        const shortDesc = document.createElement("p");
        shortDesc.innerText = cart[i].shortDesc;

        // Giá
        const price = document.createElement("p");
        price.innerText = cart[i].price;

        // Nút xóa
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Xóa";
        deleteBtn.className = "delete-btn";

        deleteBtn.onclick = function()
        {
            cart.splice(i, 1);

            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );

            location.reload();
        };

        info.appendChild(name);
        info.appendChild(shortDesc);
        info.appendChild(price);

        item.appendChild(image);
        item.appendChild(info);
        item.appendChild(deleteBtn);

        cartContent.appendChild(item);
    }
}
