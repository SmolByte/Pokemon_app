const http = require('http');
const fs = require('fs');
const { resolveNaptr } = require('dns');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    //lodash
    const num = _.random(0,20);
    console.log(num);

    //Setting content header type
    res.setHeader('Content-Type', 'text/html');

    //Sending the HTML file
    fs.readFile('./view/index.html', (err, data) => {
        try {
            res.write(data);
            res.end();
        }
        catch (err){
            console.log(err);
            res.end();
        }
    }) 
    
});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests');
});
