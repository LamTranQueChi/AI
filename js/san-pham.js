const container = document.getElementById("product-list");
const paginationNumbers = document.getElementById("pagination-numbers");

let currentPage = 1;
const productsPerPage = 9;

let filteredProducts = [...productList];


/* HIỂN THỊ SẢN PHẨM */
function renderProducts(products)
{
    container.innerHTML = "";

    const start =
        (currentPage - 1) * productsPerPage;

    const end =
        start + productsPerPage;

    const paginatedProducts =
        products.slice(start, end);

    paginatedProducts.forEach(function(product){

        // COL
        const col = document.createElement("div");
        col.className = "col-lg-4 col-md-6";

        // CARD
        const card = document.createElement("div");
        card.className = "product-card";

        // IMAGE
        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;

        // CONTENT
        const content = document.createElement("div");
        content.className = "product-content";

        // NAME
        const name = document.createElement("h3");
        name.innerText = product.name;

        // DESC
        const desc = document.createElement("p");
        desc.innerText = product.shortDesc;

        // PRICE
        const price = document.createElement("h4");
        price.className = "price";
        price.innerText = product.price;

        // BUTTON
        const button = document.createElement("a");
        button.href = product.productLink;
        button.className = "product-btn";
        button.innerText = "XEM CHI TIẾT";

        // APPEND
        content.appendChild(name);
        content.appendChild(desc);
        content.appendChild(price);
        content.appendChild(button);

        card.appendChild(image);
        card.appendChild(content);

        col.appendChild(card);

        container.appendChild(col);

    });

    renderPagination(products);
}


/* PHÂN TRANG */
function renderPagination(products)
{
    paginationNumbers.innerHTML = "";

    const totalPages =
        Math.ceil(products.length / productsPerPage);

    for(let i = 1; i <= totalPages; i++)
    {
        const btn = document.createElement("button");

        btn.innerText = i;

        btn.classList.add("page-btn");

        if(i === currentPage)
        {
            btn.classList.add("active");
        }

        btn.onclick = function(){

            currentPage = i;

            renderProducts(filteredProducts);

        };

        paginationNumbers.appendChild(btn);
    }
}


/* CHUYỂN TRANG */
function changePage(page)
{
    const totalPages =
        Math.ceil(filteredProducts.length / productsPerPage);

    if(page < 1 || page > totalPages)
    {
        return;
    }

    currentPage = page;

    renderProducts(filteredProducts);
}


/* LỌC SẢN PHẨM */
function filterProduct(category)
{
    currentPage = 1;

    if(category === "all")
    {
        filteredProducts = [...productList];
    }
    else
    {
        filteredProducts = productList.filter(function(product){

            return product.category === category;

        });
    }

    renderProducts(filteredProducts);
}


/* SẮP XẾP */

function sortProducts(type)
{
    currentPage = 1;

    if(type == "asc")
    {
        filteredProducts.sort(function(a, b)
        {
            let priceA =
                parseInt(a.price.replace(/\D/g, ""));

            let priceB =
                parseInt(b.price.replace(/\D/g, ""));

            if(priceA > priceB)
            {
                return 1;
            }

            if(priceA < priceB)
            {
                return -1;
            }

            return 0;
        });
    }

    if(type == "desc")
    {
        filteredProducts.sort(function(a, b)
        {
            let priceA =
                parseInt(a.price.replace(/\D/g, ""));

            let priceB =
                parseInt(b.price.replace(/\D/g, ""));

            if(priceA < priceB)
            {
                return 1;
            }

            if(priceA > priceB)
            {
                return -1;
            }

            return 0;
        });
    }

    renderProducts(filteredProducts);
}


/* TÌM KIẾM */
function searchProducts()
{
    currentPage = 1;

    const keyword = document
    .getElementById("searchInput")
    .value
    .toLowerCase();

    filteredProducts = productList.filter(function(product){

        return product.name
        .toLowerCase()
        .includes(keyword);

    });

    renderProducts(filteredProducts);
}


/* LOAD */
renderProducts(filteredProducts);