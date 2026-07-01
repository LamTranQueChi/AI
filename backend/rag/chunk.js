function splitText(text, chunkSize = 500, overlap = 100) {
    const chunks = [];

    for (let i = 0; i < text.length; i += (chunkSize - overlap)) {
        chunks.push(text.slice(i, i + chunkSize));
    }

    return chunks;
}

module.exports = splitText;