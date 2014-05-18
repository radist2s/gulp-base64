'use strict';
var through = require('through2');
var encode = require('./lib/encode');
var path = require('path');

module.exports = function (opts) {

    function rebase(file, encoding, callback) {
        var self = this;

        encode.stylesheet(file, opts, function (err, src) {
            if (err) {
                console.error(err);
            }

            if (opts.fileSuffix) {
                var fileExt = file.path.substring(file.path.lastIndexOf('.'))

                if (fileExt === file.path) {
                    fileExt = ''
                }

                var fileName = path.basename(file.path, fileExt)

                file.path = path.join(path.dirname(file.path), fileName + String(opts.fileSuffix) + fileExt)
            }

            file.contents = new Buffer(src);

            self.push(file);
            callback();
        });

    }

    return through.obj(rebase);
};

