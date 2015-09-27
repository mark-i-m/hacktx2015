/**
 * Code for interacting with Google Drive
 *
 * A lot of this code is shamelessly ripped from
 * https://developers.google.com/drive/v2/reference/
 */
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var CLIENT_ID = '115410561308-92eq20of2kgjlieg5cofnffkph2pm4rs.apps.googleusercontent.com';
var CLIENT_SECRET = 'xFA2s2ukGDCaPTQYR4z2iqNu';
var REDIRECT_URL = '';

/**
 * List files
 */
function listFiles (token) {

}

exports.listFiles = listFiles;

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

exports.test = function (t, u) {
    console.log(t, u);

var OAuth2Client = google.auth.OAuth2;
    var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
    oauth2Client.setCredentials({
        access_token: t,
        token_type: 'Bearer',
        expiry_date: 1443341617498
    });

    var service = google.drive('v2');
    service.files.list({
        auth: oauth2Client,
        maxResults: 10,
    }, function(err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var files = response.items;
        if (files.length == 0) {
            console.log('No files found.');
        } else {
            console.log('Files:');
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                console.log('%s (%s)', file.title, file.id);
            }
        }
    });
};
