const http = require('node:http')

const PORT = 8001;

const server = http.createServer(function(req, res) {
    // need a response
    console.log(`=== Request received at [${Date.now()}]===`);
    console.log('Headers: ', req.headers)
    console.log(req.method)
    console.log(req.url)
    // post 
    //? rawBody ?
    // console.log(JSON.parse(req.body))

    //response
    // res.writeHead(200)
    res.writeHead(201)
    // res.end('OK')
    res.end(`Hey, you can accept ${req.headers['accept-language']}`)
})

server.listen(PORT, ()=> console.log(`server running on localhost:${PORT}`))


//? IN DEV TOOLS 
//* POST REQUEST: fetch('/', {method: 'POST'})