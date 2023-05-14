const multer = require('multer')

const foodsStore = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/wwwroot/cyldwz.cn/dist/bysjhd/public/images/foods')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const swiperStore = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/wwwroot/cyldwz.cn/dist/bysjhd/public/images/swiper')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const foodsupload = multer({storage:foodsStore})
const swiperupload = multer({storage:swiperStore})

module.exports = {
    foodsupload,
    swiperupload,
}