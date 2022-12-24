const sharp = require('sharp');
const path = require('path');

class Resize {
    constructor(folder,filename) {
        this.folder = folder;
        this.filename = filename;
    }

    async save(buffer) {
        const filename = this.filename;
        const filepath = this.filepath();

        await sharp(buffer)
            .resize(800, 800, {
                fit: sharp.fit.inside,
                withoutEnlargement: true
            })
            .toFile(filepath);

        return filename;
    }
    filepath() {

        return path.resolve(`${this.folder}/${this.filename}`);
    }
}

module.exports = Resize;