const express = require('express')
const path = require('path')
const Rollbar = require("rollbar")

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../styles/index.html'))
    rollbar.info('html file served successfully.')
})

app.get('/style', (req, res) => {
    res.sendFile(path.join(__dirname, '../styles.css'))
    rollbar.info('css file served')
})

// app.use(express.static("styles"))
app.use(express.static(path.join(__dirname, '../styles/index.css')))

let rollbar = new Rollbar({
    accessToken: '3ab6e5a8142347e894de5e4e9bef7fc7',
    captureUncaught: true,
    captureUnhandledRejections: true
})

rollbar.log("Hello again!")

app.post()

const port = process.env.PORT || 4554

app.listen(port, () => console.log(`Take us to warp ${port}!`))