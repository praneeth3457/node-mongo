var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var Schema = mongoose.Schema;

var supplier = new Schema({
    emailId: {type: String, required: true, index:true, unique: true},
    phoneNumber: {type: Number, required: true},
    companyId: {type: String, required: true},
    dateAdded: {type: Date, required: true}
});

module.exports =  mongoose.model('supplier', supplier);
