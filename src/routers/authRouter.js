const Router = require("express")

const authRouter = Router()

// authRouter.get('/hello', (_req, res) => {
//     res.send('Hello')
// })

authRouter.post('/register', (req, res) => {
    console.log(req.body);
    res.send('');
})

module.exports = authRouter;