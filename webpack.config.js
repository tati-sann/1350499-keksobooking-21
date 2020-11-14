const path = require('path');

module.exports = {
  entry: [
    './js/util.js',
    './js/debounce.js',
    './js/message.js',
    './js/server.js',
    './js/pins.js',
    './js/mainPin.js',
    './js/card.js',
    './js/form.js',
    './js/map.js',
    './js/filter.js',
    './js/main.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    iife: true
  },
  devtool: false
};
