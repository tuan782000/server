// _ giành cho các cái đối số truyền vào mà không dùng.
// next là giành cho middleware mới có. (next có ý nghĩa hàm đó xử lý xong rồi thì gọi tới hàm tiếp theo)
// 500 lỗi server.
const errorMiddleHandle = (err, _req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode).json({
        message: err.message,
        statusCode,
        stack: err.stack
    })
}

module.exports = errorMiddleHandle