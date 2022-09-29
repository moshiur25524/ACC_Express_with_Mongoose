const multer = require('multer')
const path = require('path')

const uploader = multer({
    dest:'images/',
    fileFilter: (req, file,cb) =>{
        const supportedImage =  /png|jpg/;
        const extension = path.extname(file.originalname)

        if(supportedImage.test(extension)){
            cb(null, true)
        }
        else{
            cb(new Error('Must be png/jpg image'))
        }
    },
    limits: {
        fileSize: 5000000,
    }
})

module.exports = uploader;