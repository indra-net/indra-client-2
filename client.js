var shoe = require('shoe');
var through = require('through2');
var _ = require('lodash')
 
function rawStream (s) {
  return require('kefir').stream(function (e) {
    s.pipe(through(function(buff, _, next) {
      var n = Number(buff)
      if (n) e.emit(n)
      next()
    }))
  })
}
      
var raws = rawStream(shoe('/raws'))

// EEG processing stuff
var fftjs = require('fft-js')
 , fft = fftjs.fft
 , fftUtil = fftjs.util

var powerSpectra = raws.slidingWindow(512,512)
                       .throttle(50)
                       .map(fft)
                       .map(fftUtil.fftMag) 
                       .onValue(drawSpectrum)

// rendering stuff
var h = require('virtual-dom/h')
  , main = require('main-loop')
  , loop = main({ spectrum: []}, render, require('virtual-dom'))

function drawSpectrum (s) {
  loop.update({spectrum: s})
}

document.querySelector('#content').appendChild(loop.target)

function render (state) {

  function point (y) {
    return h('div.point', { style: {
      'height':y/65+'px' 
      , 'width': '1px' 
      , 'float': 'left'
      , 'padding':'1px' 
      , 'background-color': '#3ee'
     }
   })
  }

  return h('div', [
     _.map(state.spectrum, point)
  ])
}

