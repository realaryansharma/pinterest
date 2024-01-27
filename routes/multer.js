const multer  = require('multer');
const {v4 : uuidv4} = require('uuid');
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images/uploads/');
    },
    filename: function(req, file, cb) {
        file.originalname
        const uniqueFilename = uuidv4(); // generates unique file name
        cb(null, uniqueFilename + path.extname(file.originalname)); // uploads with that unique name
    }
}); 

const upload = multer({ storage: storage});
module.exports = upload;