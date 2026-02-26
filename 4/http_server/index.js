const http = require('http')
// const { type } = require('os')

// const server = http.createServer()
const server = http.createServer(function (req, res) {
    console.log('=== Request received ===', req.url)
    // db 
    res.writeHead(200, {'Content-type': 'application/json'})
    res.end('Thanks for visiting my server')
})

const PORT = 8000

server.listen(PORT, () => {
    console.log(`HTTP Server running on port ${PORT}`)
})