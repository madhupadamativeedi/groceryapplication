const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
      cb(null, path.join(__dirname, '../uploads/'));
    },
    filename:(req, file, cb)=>{
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname,ext)
        .replace(/\s/g, '_');
        cb(null, name + '-' + Date.now() + ext);
    }
});

const uploads= multer({storage});

module.exports = uploads;