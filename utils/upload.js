const multer = require('multer');

const upload = multer({
    limits: {
        fileSize: 12 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg"  || file.mimetype === "image/jpeg" || file.mimetype === "image/webp") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg, .jpeg, webp formats allowed!"));
        }
    }
});

module.exports = upload;