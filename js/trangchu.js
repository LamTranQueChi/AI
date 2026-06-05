const navLinks =
    document.querySelectorAll(".navbar a");

for(let i = 0; i < navLinks.length; i++)
{
    navLinks[i].addEventListener(
        "mouseenter",

        function()
        {
            this.style.color =
                "#d89b1e";
        }
    );

    navLinks[i].addEventListener(
        "mouseleave",

        function()
        {
            this.style.color =
                "white";
        }
    );
}


/*Sản phẩm nổi bật*/
const bestProductList = document.getElementById("bestProductList");

const bestProducts = productList.slice(0, 4);

bestProducts.forEach(function(product){

    const card = document.createElement("div");
    card.className = "best-product-card";

    const link = document.createElement("a");
    link.href = product.productLink;

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;

    const info = document.createElement("div");
    info.className = "best-product-info";

    const title = document.createElement("h3");
    title.textContent = product.name;

    const price = document.createElement("div");
    price.className = "best-price";
    price.textContent = product.price;

    link.appendChild(img);

    info.appendChild(title);
    info.appendChild(price);

    card.appendChild(link);
    card.appendChild(info);

    bestProductList.appendChild(card);

});