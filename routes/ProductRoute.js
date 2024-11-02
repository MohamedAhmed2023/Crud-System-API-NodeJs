let { getallProducts, addProduct, getProduct, updateProducts, deleteProduct } = require('../controller/ProductController');
const express = require('express');
const router = express.Router();
router.route('/')
    .get(getallProducts)
    .post(addProduct);



router.route('/:Productid')
    .get(getProduct)
    .put(updateProducts)
    .delete(deleteProduct);


module.exports = router;