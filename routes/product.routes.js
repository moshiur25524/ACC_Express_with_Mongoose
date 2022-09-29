const express = require('express')
const productControllers = require('../controllers/products.controller')
const uploader = require('../middleware/uploader')

const router = express.Router()

router.post('/file-upload',uploader.single("image"), productControllers.fileUpload);

{/* <input type="file" name="image" id="" />;
const formData = new formData();
formData.append('image', formData) */}


router
.route('/bulk-update')
.patch(productControllers.bulkUpdateAProduct)

router
.route('/bulk-delete')
.delete(productControllers.bulkDeleteAProduct)

router
.route('/')
.get(productControllers.getProduct)
.post(productControllers.saveProduct)


router
.route('/:id')
.patch(productControllers.updateAProduct)
.delete(productControllers.deleteAProduct)


module.exports = router