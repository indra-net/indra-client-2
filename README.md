# neurosky-browser

ideating on the next generation of indra EEG client.

## installation

`npm install`

then

`npm run build`

and finally, turn on your neurosky device, and

`npm start`

## explanation

see a real-time FFT of your neurosky data..........in the web browser!!

lib/mindwave-client.js is reading neurosky data over the serial port using the [mindwave2](http://npmjs.com/package/mindwave2) package on npm. it wites this data to process.stdout

server.js spawns mindwave-client, and pipes that process's stdout to a [shoe](http://npmjs.com/package/shoe) stream.

the web client (client.js) takes that stream, turns each buffer into an integer, and uses [kefir](rpominov.github.io/kefir/) to make a sliding window of the last 512 values, FFT them, and render the spectrogram to the DOM.

the result? a real-time FFT of your neurosky data at a smooth 512 Hz -- with all-javascript DSP!

## TODO

try JSON stream from the neurosky client -- remember, atomic observations

JSONStream should work with just stringify() and parse('*') -- try it

dumbly forward data over process.stdout -- but restart the neurosky process when we don't hear anything for a while

now build another process on top of that, see how we can process the json stream into something useful (like bandpassed, fft'd data)

now, lets pretend that the original client emits from 7 different electrodes -- does the stack still work?

find patterns that can scale + scale

make tools that can work on any level -- gulping up the same kinds of observations at each level, doing the same kinds of operations.
