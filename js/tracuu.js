
// LẤY CÁC PHẦN TỬ

const cards = Array.from(
    document.querySelectorAll(".service-card")
);

const tags = document.querySelectorAll(
    ".popular-tags button"
);

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const pageButtons =
    document.querySelectorAll(".page-btn");

const prevButton =
    document.getElementById("prevPage");

const nextButton =
    document.getElementById("nextPage");


const cardsPerPage = 3;

let currentPage = 1;
let selectedTag = "Tất cả";
let searchKeyword = "";


// BỎ DẤU TIẾNG VIỆT

function normalizeText(text) {

    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d");

}


// LỌC CARD

function getFilteredCards() {

    return cards.filter(card => {

        const title =
            card.querySelector("h3").innerText;

        const category =
            card.querySelector(".service-type").innerText;

        const cardText =
            normalizeText(card.innerText);


        // Tìm kiếm
        const matchSearch =
            searchKeyword === "" ||
            cardText.includes(
                normalizeText(searchKeyword)
            );


        // Lọc lĩnh vực
        let matchTag = true;

        if (selectedTag !== "Tất cả") {

            const tag =
                normalizeText(selectedTag);

            const titleText =
                normalizeText(title);

            const categoryText =
                normalizeText(category);


            matchTag =
                titleText.includes(tag) ||
                categoryText.includes(tag);


            // nhóm đặc biệt
            if (selectedTag === "Khai sinh & Giám hộ") {

                matchTag =
                    titleText.includes("khai sinh") ||
                    titleText.includes("giam ho");

            }

            if (selectedTag === "Giấy lái xe") {

                matchTag =
                    titleText.includes("giay phep lai xe");

            }

            if (selectedTag === "Dự thi") {

                matchTag =
                    titleText.includes("du thi");

            }

            if (selectedTag === "Căn cước công dân") {

                matchTag =
                    titleText.includes("cccd") ||
                    titleText.includes("can cuoc");

            }

            if (selectedTag === "Trợ cấp") {

                matchTag =
                    titleText.includes("tro cap") ||
                    titleText.includes("that nghiep");

            }

        }


        return matchSearch && matchTag;

    });

}

// HIỂN THỊ KẾT QUẢ + PHÂN TRANG

function renderCards() {

    const filteredCards = getFilteredCards();

    const totalPages = Math.ceil(
        filteredCards.length / cardsPerPage
    );


    if (currentPage > totalPages) {
        currentPage = totalPages || 1;
    }


    const start =
        (currentPage - 1) * cardsPerPage;

    const end =
        start + cardsPerPage;


    // Ẩn tất cả
    cards.forEach(card => {
        card.style.display = "none";
    });


    // Hiện card của trang hiện tại
    filteredCards
        .slice(start, end)
        .forEach(card => {

            card.style.display = "";

        });


    // cập nhật số kết quả
    const resultCount =
        document.querySelector(
            ".result-header strong"
        );

    if (resultCount) {
        resultCount.innerText =
            filteredCards.length;
    }


    // cập nhật pagination
    pageButtons.forEach(button => {

        const page =
            Number(button.dataset.page);

        button.style.display =
            page <= totalPages
                ? ""
                : "none";

        button.classList.toggle(
            "active",
            page === currentPage
        );

    });


    prevButton.disabled =
        currentPage === 1;

    nextButton.disabled =
        currentPage >= totalPages;

}

// CLICK LĨNH VỰC

tags.forEach(tag => {

    tag.addEventListener("click", () => {

        tags.forEach(btn => {
            btn.classList.remove("active");
        });

        tag.classList.add("active");

        selectedTag =
            tag.innerText.trim();

        currentPage = 1;

        renderCards();

    });

});



// TÌM KIẾM
function search() {

    searchKeyword =
        searchInput.value.trim();

    currentPage = 1;

    renderCards();

}


searchButton.addEventListener(
    "click",
    search
);


// Nhấn Enter cũng tìm
searchInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {
            search();
        }

    }
);


// Tự hiện lại tất cả khi xóa nội dung
searchInput.addEventListener(
    "input",
    () => {

        if (searchInput.value.trim() === "") {

            searchKeyword = "";

            currentPage = 1;

            renderCards();

        }

    }
);



// PHÂN TRANG

pageButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentPage =
            Number(button.dataset.page);

        renderCards();

    });

});


prevButton.addEventListener("click", () => {

    if (currentPage > 1) {

        currentPage--;

        renderCards();

    }

});


nextButton.addEventListener("click", () => {

    const totalPages =
        Math.ceil(
            getFilteredCards().length /
            cardsPerPage
        );

    if (currentPage < totalPages) {

        currentPage++;

        renderCards();

    }

});


// CHẠY LẦN ĐẦU
renderCards();