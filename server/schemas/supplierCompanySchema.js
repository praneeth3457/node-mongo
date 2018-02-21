var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var Schema = mongoose.Schema;

var supplierCompany = new Schema({
    companyId : {type:ObjectIdSchema, default: function () { return new ObjectId()}},
    companyName: {type: String, required: true},
    companyAddress: {type: String, required: true},
    companyPhoneNumber: {type: Number, required: true},
    clientPrimaryContact: {type: String, required: true},
    companyEmail: {type: String, required: true, index:true, unique: true},
    companySize: {type: Number, required: true},
    dateAdded: {type: Date, required: true}
});

module.exports =  mongoose.model('supplierCompany', supplierCompany);
