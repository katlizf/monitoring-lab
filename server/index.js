const express = require('express')
const path = require('path')
const Rollbar = require("rollbar")

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../styles/index.html'))
    rollbar.info('html file served successfully.')
})

app.use(express.static("styles"))

let rollbar = new Rollbar({
    accessToken: '3ab6e5a8142347e894de5e4e9bef7fc7',
    captureUncaught: true,
    captureUnhandledRejections: true
})

rollbar.log("Hello again!")

let numbers = []

app.post('/api/number', (req, res)=>{
    let {number} = req.body
    
    numbers.push(number)

    rollbar.log('Number added successfully', {author: 'Katie', type: 'manual entry'})

    res.status(200).send(numbers)
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4554

app.listen(port, () => console.log(`Take us to warp ${port}!`))