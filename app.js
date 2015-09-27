/**
 * Module dependencies.
 */

// Node express
var express = require('express');
var app = module.exports = express.createServer();

// Cloud
var gdrive = require('./googledrive.js');
var dbox = require('./dropbox.js');

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

});

app.get('/oauth/:service', function (req, res) {

});

app.get('/list/:from', function (req, res) {

});

app.get('/delete/:file/:from', function (req, res) {

});

app.get('/download/:file/:from', function (req, res) {

});

app.post('/upload/:to', function (req, res) {

});

app.get('/move/:file/:from/:to', function (req, res) {
    //console.log(req.params);
    //console.log(req.query);
});
