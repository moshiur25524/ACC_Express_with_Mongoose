const express = require('express')
const productControllers = require('../controllers/products.controller')
const uploader = require('../middleware/uploader');
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/authorization')

const router = express.Router()

// router.use(verifyToken)

router.post('/file-upload',uploader.array("image"), productControllers.fileUpload);

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
.post(verifyToken,authorization('admin' , 'store-manager'),productControllers.saveProduct)


router
.route('/:id')
.patch(productControllers.updateAProduct)
.delete(productControllers.deleteAProduct)


module.exports = router