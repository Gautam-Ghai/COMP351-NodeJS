const http = require('http');
let url = require('url');
const fs = require('fs');

const path = './file.txt'

const server = http.createServer((req, res) =>{
    let q = url.parse(req.url, true);
    if(q.pathname === '/COMP351/labs/4/getDate/'){
        if (fs.existsSync(path)) {
            fs.appendFile('file.txt', `${q.query['text']} \n`, function (err) {
                if (err) throw err;
              });
            res.write(`${q.query['text']} written to file`);
            res.end();
        }

        else {
            fs.writeFile('file.txt', `${q.query['text']} \n`, function (err) {
                if (err) throw err;
            });
            res.write(`${q.query['text']} written to file`);
            res.end();
        }
    }
    else if(q.pathname === '/COMP351/labs/4/getDate/file.txt'){
        if (fs.existsSync(path)) {
            fs.readFile('file.txt', 'utf8', function(err, data) {
                if (err) throw err;
              res.writeHead(200, {'Content-Type': 'text/html'});
              res.write(data);
              return res.end();
            });
        }
        else {
            res.write('There is no data in file.txt');
            res.end();
        }
    }
    else{
        res.write('Server is still in Developemt!');
        res.end();
    }

});

server.listen(process.env.PORT || 3000);
 