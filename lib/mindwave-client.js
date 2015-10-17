var Mindwave = require('mindwave2')
  , JSONStream = require('JSONStream')
  // debug
  //, raw512 = require('lodash').flatten(require('./raw512.js'))
  //, raws = require('kefir').sequentially(2, raw512)
  // EEG processing stuff
  , fftjs = require('fft-js')
  , fft = fftjs.fft
  , freq = function (d) { return fftjs.util.fftFreq(d,512) }
  , magnitudes = function (raws) { return fftjs.util.fftMag(fft(raws)) }

var stringifier = JSONStream.stringifyObject()
function writeFFT (d) {
  stringifier.write(['fft', d])
}

// process raw mindwave data
var mw = new Mindwave();
Kefir.fromEvents(mw, 'wave')
     .slidingWindow(512,512)
     .throttle(10)
     .map(magnitudes)
     .onValue(writeFFT)

connect to mw
mw.connect('/dev/cu.MindWaveMobile-DevA')

stringifier.pipe(process.stdout)
