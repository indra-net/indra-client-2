var http = require('http')
  , shoe = require('shoe')
  , spawn = require('child_process').spawn
  , es = require('event-stream')
  , mindwaveClientPath = __dirname + '/lib/mindwave-client.js'
  , ecstatic = require('ecstatic')(__dirname + '/public')
  , server = http.createServer(ecstatic)

server.listen(8000)

// spawn node mindwaveCleintPath
var c = spawn('node', [mindwaveClientPath])

var sock = shoe(function (stream) {
  c.stdout.pipe(stream)
})

sock.install(server, '/raws')
