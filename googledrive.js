/**
 * Code for interacting and authorizing with Google Drive
 *
 * A lot of this code is shamelessly ripped from
 * https://developers.google.com/drive/v2/reference/
 */

var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var SCOPES = ['https://www.googleapis.com/auth/drive','https://www.googleapis.com/auth/userinfo.email'];
var CLIENT_SECRET = null;

/**
 * Code for authorization
 */

/**
 * Load client secrets from a local file, then call authorize()
 */
function readClientSecret () {
    fs.readFile('client_secret_googledrive.json', function (err, content) {
        if (err) {
            console.log('Error loading client secret file: ' + err);
            return;
        }
        // Store the client secret
        CLIENT_SECRET = JSON.parse(content);

        console.log('Loaded client secret :)');

    authorize();
    });
}

function getOAuth2Client () {
  var clientSecret = CLIENT_SECRET.installed.client_secret;
  var clientId = CLIENT_SECRET.installed.client_id;
  var redirectUrl = 'http://localhost:3000/oauth/googledrive';
  var auth = new googleAuth();
  return new auth.OAuth2(clientId, clientSecret, redirectUrl);
}

/**
 * Create an OAuth2 client with the given credentials.
 *
 * @param res the response
 */
function authorize(res) {
  var oauth2Client = getOAuth2Client();
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  res.redirect(authUrl);
}

/**
 * Backend API definitions
 */

/**
 * Login and get OAuth2 token
 */
function login (res) {
    if (!CLIENT_SECRET) {
        readClientSecret(res);
    } else {
        authorize(res)
    }
}

exports.login = login;

/**
 * Get token from authorization code
 */
function getToken (res, code) {
    var oauth2Client = getOAuth2Client();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      res.cookie('', token, {maxAge: 1e10,}); //TODO
    });
}

exports.getToken = getToken;

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

    if (logged in) {

    } else {
        <login>
    }

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
