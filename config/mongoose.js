var mongoose = require('mongoose');

module.exports.connect = function(callback) {
  var db = mongoose.connect('mongodb://localhost:27017', function(err){
      if(err) {
          return callback(err, 500);
      }

      return callback(false, 200);
  });
};
