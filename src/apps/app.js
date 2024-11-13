const express = require("express");
const config = require("config");
const cors = require("cors");
const app = express();

// Cấu hình CORS (cho phép tất cả các nguồn truy cập API, có thể tùy chỉnh)
app.use(cors());

// Middleware để phân tích body của request nếu dữ liệu là JSON
app.use(express.json());

// Sử dụng router từ config (sử dụng đúng đường dẫn đến router)
app.use(require(config.get("app.router")));

// Khởi động server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:8000`);
});

module.exports = app;
