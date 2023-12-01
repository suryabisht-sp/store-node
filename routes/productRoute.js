var express = require('express');
var router = express.Router();
const { getAllProductStatic, getAllProducts } = require("../controller/product.js")


router.get('/', getAllProducts);
router.get('/static', getAllProductStatic);

module.exports = router;
