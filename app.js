/**
 * Module dependencies.
 */

// Node express
var express = require('express');
var app = module.exports = express.createServer();

// Cloud
var gdrive = require('./googledrive.js');
var dbox = require('./dropbox.js');

// Database
var db = require('./db.js');
var envMod = require('cfenv');
var appEnv = envMod.getAppEnv();
/**
 * Configuration
 */
app.configure(function(){
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

//app.listen(appEnv.port, function(){
app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

/**
 * Request handling and routing
 */
app.get('/app', function (req, res) {
    res.render('index.html');
});

app.get('/login/:to', function (req, res) {
    if (req.params.to == 'googledrive') {
        console.log('Login to google drive');
        res.redirect('/app/googledrive.html');
    }
    if (req.params.to == 'dropbox') {
        console.log('Login to Dropbox');
        //dbox.getAuthCode(res);
        //dbox.sendToAuthPage();
        res.redirect('/app/');
    }
});

app.post('/session_token/:token/:user/:service', function (req, res) {
    console.log('asdfasdf', req.params.token);
    db.saveTokenTriple(req.params.token, req.params.user, req.params.service);
    //gdrive.listFiles(res, req.params.token);
});

app.get('/list/:service/:user', function (req, res) {
    if (req.params.service == 'googledrive') {
        console.log('List from google drive');
        db.getToken(req.params.user, req.params.service, gdrive.listFiles, res);
    }
    else if(req.params.service == 'dropbox') {
        console.log('List from DropBox');
        dbox.list('d', res);
    }
});


app.get('/delete/:file/:service/:user', function (req, res) {


});

app.get('/download/:file/:service/:user', function (req, res) {

});

app.post('/upload/:service/:user', function (req, res) {

});

app.get('/move/:file/:fromservice/:fromuser/:toservice/:touser', function (req, res) {

});
