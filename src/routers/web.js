const express = require("express");
const router = express.Router();

const productController = require("../apps/controllers/apis/product");


// Route lấy tất cả sản phẩm
router.get("/products", productController.getAllProducts);

// Route thêm sản phẩm mới
router.post("/products", productController.addProduct);

// // Route cập nhật sản phẩm theo ID
router.put("/products/:id", productController.updateProduct);

// // Route xóa sản phẩm theo ID
router.delete("/products/:id", productController.deleteProduct);



module.exports = router;