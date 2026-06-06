const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));
const product = productList.find(item => item.id === id);
const detailContainer = document.getElementById("product-detail");

if(product)
{
    // Card
    const card = document.createElement("div");
    card.className = "detail-card";

    // Row
    const row = document.createElement("div");
    row.className = "row align-items-center";

    // Cột trái
    const leftCol = document.createElement("div");
    leftCol.className = "col-lg-6";

    // Ảnh
    const image = document.createElement("img");
    image.src = product.image;
    image.className = "img-fluid detail-image";

    leftCol.appendChild(image);

    // Cột phải
    const rightCol = document.createElement("div");
    rightCol.className = "col-lg-6";

    // Tên sản phẩm
    const title = document.createElement("h1");
    title.className = "detail-title";
    title.innerText = product.name;

    // Giá
    const price = document.createElement("h3");
    price.className = "detail-price";
    price.innerText = product.price;


    // Mô tả
    const descBox = document.createElement("div");
    descBox.className = "info-item";

    const descTitle = document.createElement("h5");
    descTitle.innerText = "MÔ TẢ";

    const descText = document.createElement("p");
    descText.innerText = product.fullDesc;

    descBox.appendChild(descTitle);
    descBox.appendChild(descText);

    // Chất liệu
    const materialBox = document.createElement("div");
    materialBox.className = "info-item";

    const materialTitle = document.createElement("h5");
    materialTitle.innerText = "CHẤT LIỆU";

    const materialText = document.createElement("p");
    materialText.innerText = product.material;

    materialBox.appendChild(materialTitle);
    materialBox.appendChild(materialText);

    // Trọng lượng
    const weightBox = document.createElement("div");
    weightBox.className = "info-item";

    const weightTitle = document.createElement("h5");
    weightTitle.innerText = "TRỌNG LƯỢNG";

    const weightText = document.createElement("p");
    weightText.innerText = product.weight;

    weightBox.appendChild(weightTitle);
    weightBox.appendChild(weightText);

    // Kích thước
    const sizeBox = document.createElement("div");
    sizeBox.className = "info-item";

    const sizeTitle = document.createElement("h5");
    sizeTitle.innerText = "KÍCH THƯỚC";

    const sizeText = document.createElement("p");
    sizeText.innerText = product.size;

    sizeBox.appendChild(sizeTitle);
    sizeBox.appendChild(sizeText);

    // Tồn kho
    const stockBox = document.createElement("div");
    stockBox.className = "info-item";

    const stockTitle = document.createElement("h5");
    stockTitle.innerText = "SỐ LƯỢNG CÒN";

    const stockText = document.createElement("p");
    stockText.innerText = product.stock + " sản phẩm";
    stockBox.appendChild(stockTitle);
    stockBox.appendChild(stockText);

    // Quantity Box
    const quantityBox = document.createElement("div");
    quantityBox.className = "quantity-box";



    // Nút mua
    const buyBtn = document.createElement("button");
    buyBtn.className = "detail-btn buy-btn";
    buyBtn.innerText = "MUA NGAY";
    // tự động nhập sản phẩm vào mục sau khi bấm nút mua
    buyBtn.onclick = function(){
    localStorage.setItem("productName", product.name);
    location.href = "../html/lien-he.html";
    };


    // Nút giỏ hàng
    const cartBtn = document.createElement("button");
    cartBtn.className = "detail-btn cart-btn";
    cartBtn.innerText = "THÊM GIỎ HÀNG";

    cartBtn.onclick = function ()
    {
        let cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        let found = false;

        for(let i = 0; i < cart.length; i++)
        {
            if(cart[i].name == product.name)
            {
                cart[i].quantity =
                    cart[i].quantity += 1;

                found = true;
                break;
            }
        }

        if(found == false)
        {
            cart.push({
            name: product.name,
            price: product.price,
            image: product.image,
            shortDesc: product.shortDesc,
            quantity: 1
        });
        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        alert("Đã thêm vào giỏ hàng!");
    };

    // Button
    const button = document.createElement("button");
    button.className = "detail-btn back-btn";
    button.innerText = "QUAY LẠI";

    button.onclick = function(){history.back();};

    // Gắn vào cột phải
    rightCol.appendChild(title);
    rightCol.appendChild(price);
    rightCol.appendChild(descBox);
    rightCol.appendChild(materialBox);
    rightCol.appendChild(weightBox);
    
    rightCol.appendChild(sizeBox);
    rightCol.appendChild(stockBox);
    rightCol.appendChild(quantityBox);
    rightCol.appendChild(buyBtn);
    rightCol.appendChild(cartBtn);
    rightCol.appendChild(button);

    // Gắn 2 cột vào row
    row.appendChild(leftCol);
    row.appendChild(rightCol);

    // Gắn row vào card
    card.appendChild(row);

    // Hiển thị
    detailContainer.appendChild(card);
}
else

{
    const error = document.createElement("h2");
    error.className = "text-center";
    error.innerText = "Không tìm thấy sản phẩm";
    detailContainer.appendChild(error);

}
