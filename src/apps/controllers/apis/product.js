const ProductModel = require("../../models/product");

// Helper function để kiểm tra dữ liệu đầu vào
const validateProductInput = (name, price) => {
    if (!name || !price || isNaN(price)) {
        return { valid: false, message: "Tên và giá sản phẩm không được để trống và giá phải là số" };
    }
    return { valid: true };
};

// Lấy tất cả sản phẩm
exports.getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi lấy sản phẩm", error: error.message });
    }
};

// Thêm sản phẩm mới
exports.addProduct = async (req, res) => {
    try {
        const { name, price } = req.body;

        // Kiểm tra đầu vào
        const validation = validateProductInput(name, price);
        if (!validation.valid) {
            return res.status(400).json({ message: validation.message });
        }

        const newProduct = new ProductModel({ name, price });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi thêm sản phẩm", error: error.message });
    }
};

// Sửa sản phẩm theo ID
exports.updateProduct = async (req, res) => {
    try {

        const { id } = req.params; // Lấy ID từ URL
        const { name, price } = req.body; // Lấy dữ liệu từ request body
      
        // Kiểm tra đầu vào
        const validation = validateProductInput(name, price);
        if (!validation.valid) {
            return res.status(400).json({ message: validation.message });
        }

        // Kiểm tra nếu sản phẩm tồn tại
        const updatedProduct = await ProductModel.findById(id);
        if (!updatedProduct) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        }

        // Cập nhật thông tin sản phẩm
        updatedProduct.name = name;
        updatedProduct.price = price;
       
        const savedProduct = await updatedProduct.save();

        res.json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi cập nhật sản phẩm", error: error.message });
    }
};

// Xóa sản phẩm theo ID
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra nếu sản phẩm tồn tại
        const deletedProduct = await ProductModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        }

        res.json({ message: "Xóa sản phẩm thành công", deletedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi khi xóa sản phẩm", error: error.message });
    }
};
