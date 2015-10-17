var Mindwave = require('mindwave2')
   // debug
   //, raw512 = require('lodash').flatten(require('./raw512.js'))
   , Kefir = require('kefir')

//// debug
//var raws = Kefir.sequentially(2, raw512)
//raws.onValue(console.log)

var mw = new Mindwave();
mw.on('wave', console.log)
mw.connect('/dev/cu.MindWaveMobile-DevA')

