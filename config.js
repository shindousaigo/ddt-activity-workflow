


var __ = '20180312'

var path = require('path');

module.exports = {
    src: path.resolve(__dirname, 'src', __),
    dist: path.resolve(__dirname, 'dist', __),
    compile: path.resolve(__dirname, 'src', __, 'compile'),
    node_modules: path.resolve(__dirname, 'node_modules')
}
