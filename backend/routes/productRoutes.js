const express = require("express")
const router = express.Router()

const {createProduct, editProduct, getProductDetails, deleteProduct, getallProducts} = require('../controllers/product');

router.post('/create', createProduct);
router.put('/edit', editProduct);
router.get('/get', getProductDetails)
router.delete('/delete', deleteProduct)
router.get('/getall', getallProducts)

module.exports = router;