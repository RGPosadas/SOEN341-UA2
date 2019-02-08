var http = require('http');
var fs = require('fs');

// createrServer takes a function that is executed every time the server gets a request from client.
// This function is called a requestListener. It handles the requests from the user and also the response back.
// req = request object who is actually a IncomingMessage Object.
// res = response object whos is actually a ServerResponse Object.
var server = http.createServer(function(req, res){

    console.log('request was made: ' + req.url);

    //routing
    if(req.url === '/home' || req.url === '/'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname + '/index.html', 'utf8').pipe(res);;
    }

    // Receiving POST from index.html form
    if(req.method === 'POST'){

        let body = '';
        req.on('data', function(chunk){
            body+= chunk.toString(); // buffering data
        });
        req.on('end', function(){
            console.log(body);
            res.end('Congratulations Node.js is Running');
        });
    }

});

server.listen(8080);
console.log('Listening to port 8080');
