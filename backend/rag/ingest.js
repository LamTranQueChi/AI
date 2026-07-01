const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");
const splitText = require("./chunk");

const docsFolder = path.join(__dirname, "docs");

async function ingest() {
    const files = fs.readdirSync(docsFolder);

    for (const file of files) {

        if (!file.endsWith(".pdf")) continue;

        console.log("Đang đọc:", file);

        const filePath = path.join(docsFolder, file);
        const buffer = fs.readFileSync(filePath);

        const result = await pdf(buffer);

const text = result.text;

// Chia văn bản thành các chunk
const chunks = splitText(text);

console.log(`Có ${chunks.length} chunks`);

chunks.forEach((chunk, index) => {
    console.log(`\n===== Chunk ${index + 1} =====`);
    console.log(chunk);
});

console.log("-------------------------------------");
    }
}

ingest();