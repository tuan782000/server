const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

// Viết 1 cái Json Web Token
const getJsonWebToken = async (email, id) => {
    const payload = {
        email, id
    }
    const token = jwt.sign(payload, process.env.SECERT_KEY, {
        expiresIn: '7d',
    })
    return token;
}

const register = asyncHandler(async (req, res) => {
    // console.log(req.body)
    // destructuring lấy ra email để kiểm tra trong db có email này chưa
    const { email, fullname, password } = req.body;

    const existingUser = await UserModel.findOne({ email })

    console.log(existingUser)
    // Nếu có email đó đã tồn tại ném ra lỗi
    if (existingUser) {
        res.status(401)
        throw new Error(`User has already exist!!!`)
    }

    // Mã hóa mật khẩu (bcrypt)
    const salt = await bcrypt.genSalt(10); // gọi hàm genSalt cắt bao nhiêu lần

    console.log(salt); // ví dụ khi bấm đăng nhập sinh ra mã 2b$10$YGJf58TIpE7WYS.OrU6eLe

    // Giống như bạn đang nấu ăn, thì muối thêm vào cho đồ ăn mặn mà hơn

    // Mật khẩu đã được mã hóa
    const hasedPassword = await bcrypt.hash(password, salt); // đoạn này nó phải chờ nó salt chạy xong nó mới chạy đoạn này
    // hash trộn đồ ăn là password với muối lại với nhau

    console.log(hasedPassword);

    // tạo ra user mới
    const newUser = new UserModel({
        email, // email: email
        fullname: fullname ?? '', // fullname có thể có hoặc không nếu ko thì nó sẽ undefined nên phải ?? để rỗng
        password: hasedPassword // mình sẽ lấy hasedpassword để gán lại password
    })

    await newUser.save(); // lưu lại vào trong DB

    // 200 thành công
    // 201 đã tạo thành công
    res.status(200).json({
        message: "Register new user successfully",
        data: {
            ...newUser,
            // accessToken: 'This is access token'
            accessToken: await getJsonWebToken(email, newUser.id)
        },
    })

    res.send("Register to successfully")
})

module.exports = {
    register
}