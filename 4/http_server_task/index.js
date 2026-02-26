const http = require('node:http')
const fs = require('node:fs')

const PORT = 3000

const server = http.createServer((req, res) => {

    console.log("URL: ", req.url)
    console.log("METHOD: ", req.method)
    const path = req.url
    const method = req.method

    const log =`[${Date.now()}]: ${method} ${path}`
    fs.appendFileSync('log.txt', log, 'utf-8')

    if (method === 'GET') {
        if(path === "/") {
            //* writeHead
            return res.writeHead(200).end(`Hello`)
        }
        if(path === "/contact-us") {
            //* writeHead
            res.writeHead(200)
            return res.end('contact-us ON EMAIL OR PHONE')
        }
    }

    if (method === 'POST') {
        if (path === '/tweet') {
            return res.writeHead(201).end('Your tweet was created')
        }

    }

    return res.writeHead(404).end('You are lost.')
})


server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})