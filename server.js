var http= require('http')
  , shoe = require('shoe')
  , spawn = require('child_process').spawn
  , mindwaveClientPath = __dirname + '/lib/mindwave-client.js'

var ecstatic = require('ecstatic')(__dirname + '/public');
var server = http.createServer(ecstatic);
server.listen(8000)

// spawn node mindwaveCleintPath
var c = spawn('node', [mindwaveClientPath])
c.stdout

var sock = shoe(function (stream) {
  c.stdout.pipe(stream)
})

sock.install(server, '/raws')
