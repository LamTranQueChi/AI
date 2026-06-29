const tags = document.querySelectorAll(".popular-tags button");

tags.forEach(tag => {

    tag.addEventListener("click", () => {

        tags.forEach(btn =>
            btn.classList.remove("active")
        );

        tag.classList.add("active");
    });

});