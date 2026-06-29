const uploadZone = document.getElementById("uploadZone");
const fileInput = document.getElementById("fileUpload");

uploadZone.addEventListener("click", () => {
    fileInput.click();
});

uploadZone.addEventListener("dragover", e => {
    e.preventDefault();
    uploadZone.classList.add("drag-over");
});

uploadZone.addEventListener("dragleave", () => {
    uploadZone.classList.remove("drag-over");
});

uploadZone.addEventListener("drop", e => {
    e.preventDefault();

    uploadZone.classList.remove("drag-over");

    const files = e.dataTransfer.files;

    console.log(files);
});