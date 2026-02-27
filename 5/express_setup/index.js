const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.end('Homepage')
})

app.get('/contact-us', (req, res) => {
    res.end('Contact us')
})

app.post('/message', (req, res) => {
    res.status(201).end('Message created')
})

app.listen(8000, () => console.log(`Server running on localhost:8000`))