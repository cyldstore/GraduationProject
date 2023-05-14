const multer = require('multer')

const avatarStore = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/wwwroot/cyldwz.cn/dist/bysjhd/public/images/avatar')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const rateImgStore = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/wwwroot/cyldwz.cn/dist/bysjhd/public/images/rateImg')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const avatarupload = multer({ storage: avatarStore })
const rateImgupload = multer({ storage: rateImgStore })
// const avatarupload = multer({ dest: 'public/images/avatar' })


module.exports = {
    avatarupload,
    rateImgupload
}