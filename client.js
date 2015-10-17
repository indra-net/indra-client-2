var shoe = require('shoe')
  , parser = require('JSONStream').parse('fft')
  , es = require('event-stream')
  , h = require('virtual-dom/h')
  , main = require('main-loop')
  , loop = main({ spectrum: []}, render, require('virtual-dom'))
  , _ = require('lodash')

//function smap (fn) {
//  return es.mapSync(fn)
//}
//
//function alphaBandpass (s) {
//  return _.slice(s,6,13)
//}

function drawSpectrum (s) {
  loop.update({spectrum: s})
}

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
     state.spectrum.map(point)
  ])
}

document.querySelector('#content').appendChild(loop.target)
var stream = shoe('/raws').pipe(parser).pipe(smap(drawSpectrum))
