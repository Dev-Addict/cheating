const multer = require('multer');

const storage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimeType.startsWith('image')) {
        cb(null, true);
    } else {
        cb(
            new AppError(
                'invalid file input we only accept images.',
                400
            ),
            false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: multerFilter
});

module.exports = upload;