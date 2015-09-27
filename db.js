// all the db stuff

var mongo = require('mongodb');
var collection = db.get('users');

/**
 * Save a token, user, service triple in the db
 */
exports.saveTokenTriplet = function (t, u, s) {
    var entry = {
    	"token": t,
    	"user": u,
    	"service": s,
    	"id": (u + s);
    };
    collection.insert(entry, function(err, doc) {
    	if(err) return err;
    	return doc;
    });
    // console.log(t,u,s);
};

exports.getToken = function (u, s, callback, res) {
    var entry = collection.findOne({"id": (u + s)});
    var token = entry.token;
    callback(res, token);
};
