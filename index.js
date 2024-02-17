// console.log("Hello world!!!")

const express = require('express')
const cors = require('cors')
const app = express()

const PORT = 3001

app.use(cors())

app.get('/auth/hello', (_req, res) => {
    res.send(`<h1>Hello World</h1>`)
})

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(`Server starting at http://localhost:${PORT}`)
})
