// all the db stuff

/**
 * Save a token, user, service triple in the db
 */
exports.saveTokenTriple = function (t, u, s) {
    console.log(t,u,s);
};

exports.getToken = function (user, callback, res) {
    var token = ''; // TODO
    callback(res, token);
};
