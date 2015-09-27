/**
 * Code for interacting with Google Drive
 *
 * A lot of this code is shamelessly ripped from
 * https://developers.google.com/drive/v2/reference/
 */

var https = require('https');

/**
 * {'cats.txt' : {
 * type: 'txt',
 * size: '100',
 * date: '26 September 2015',
 * thumbnailPath: '',
 * iconPath: '',
 * },
 * }
 */
function parsify(files) {
    var clean = {};
    for (var i in files.items) {
        var file = files.items[i];
        clean[file.title] = {
            'type': parseType(file.mimeType.substring(file.mimeType.indexOf('/')+1)),
            'size': file.fileSize,
            'date': file.modifiedDate,
            'thumbnamePath': file.thumbnailLink,
            'iconPath': file.iconLink,
        };
    }
    return clean;
}

function parseType(type) {
    console.log(type);
    switch (type) {
        case 'png':
        case 'gif':
        case 'jpg':
        case 'jpeg': return 'img';
        case 'txt':
        case 'pdf': return 'txt';
        default: return 'other';
    }
}

/**
 * List files
 */
exports.listFiles = function (res, token) {

    // get all files using the token
    var req = https.get('https://www.googleapis.com/drive/v2/files?alt=json&access_token=' + token,
 function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            res.send(parsify(parsed));
        });
    });
}

/**
 * Delete from GD
 */
function deleteFile (token, filename) {

    //if (logged in) {

    //} else {
    //    <login>
    //}

}

exports.deleteFile = deleteFile;

/**
 * Download a file
 */
function downloadFile (token, filename) {

}

exports.downloadFile = downloadFile;

/**
 * Upload a file
 */
function uploadFile (token, filename, filedata) {

}

exports.uploadFile = uploadFile;
