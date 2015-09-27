// all the db stuff

var MongoClient = require('mongodb').MongoClient;
var mongo = null;
var collection = null;
//MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
MongoClient.connect('mongodb://lakitu3332.mybluemix.net:5678/test', function(err, db) {
   // 5678
  if(err) throw err;
  mongo = db;
  collection = db.collection('test');
});

/**
 * Save a token, user, service triple in the db
 */
exports.saveTokenTriple = function (t, u, s) {
    var entry = {
    	"token": t,
    	"user": u,
    	"service": s,
    	"_id": (u + s),
    };
    collection.remove({"_id": (u + s)});
    collection.insert(entry, function(err, doc) {
        if(err) {
            console.log('Error inserting to mongo ', err);
            return;
        }
    });
};

exports.getToken = function (u, s, callback, res) {
    collection.findOne({"_id": (u + s)}, function (err, result) {
        callback(res, result.token);
    });
};
