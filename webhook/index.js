const http = require('http');
const createHandler = require('github-webhook-handler');
const exec = require('child_process').exec;
const handler = createHandler({path: '/', secret: 'secret'})

http.createServer(function (req, res) {
    handler(req, res, function (_) {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(7777, "0.0.0.0");

console.log("GitHub Hook Server running at http://0.0.0.0:7777/");

handler.on('error', function (err) {
    console.error('Error:', err.message)
})

handler.on('push', function (event) {
    console.log(
        'Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref,
    );
    if (event.payload.ref === 'refs/heads/gh-pages') {
        exec("bash ./update.sh", function (error, stdout, stderr) {
            if(error) {
                console.error('Script update.sh error:' + error);
                return;
            }
            console.log('Script update.sh stdout:', stdout);
            console.log('Script update.sh stderr:', stderr);
        })
    }
});
