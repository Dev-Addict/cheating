const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/questions');
    },
    filename: function (req, file, cb) {
        cb(null, req.user._id + '-' + Date.now());
    }
});

const upload = multer({ storage: storage });

module.exports = upload;