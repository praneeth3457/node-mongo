var Supplier = require('../schemas/supplierSchema');
var Company = require('../schemas/supplierCompanySchema');

module.exports = function(app, express) {

    var api = express.Router();

    //POST Supplier API
    api.post('/saveSupplier', function(req, res) {

      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      var checkEmail = emailRegex.test(req.body.emailId);
      var checkCompanyEmail = emailRegex.test(req.body.company.companyEmail);
      if(!checkEmail || !checkCompanyEmail) {
        if(!checkEmail) {
          res.status(200).send({success : false, msg: "Supplier email is not valid"});
        } else {
          res.status(200).send({success : false, msg: "Company email is not valid"});
        }
      } else {
          var supplierObj = new Supplier({
            emailId : req.body.emailId,
            phoneNumber : req.body.phoneNumber,
            companyId : "",
            dateAdded : Date.now()
          });

          var companyObj = new Company({
            companyName : req.body.company.companyName,
            companyAddress : req.body.company.companyAddress,
            companyPhoneNumber : req.body.company.companyPhoneNumber,
            clientPrimaryContact : req.body.company.clientPrimaryContact,
            companyEmail : req.body.company.companyEmail,
            companySize : req.body.company.companySize,
            dateAdded : Date.now()
          });

          Company.find({"companyName": req.body.company.companyName}, function(err, data){
            if(err){
              res.status(200).send({success : false, err: err});
            }

            if(data.length == 0) {
              companyObj.save(function(companyErr, companyData) {
                if(companyErr) {
                  res.status(200).send({success : false, err: companyErr});
                }

                if(companyData) {
                  supplierObj.companyId = companyData.companyId;

                  Supplier.find({"emailId": req.body.emailId}, function(errSupplier, dataSupplier){
                      if(errSupplier) {
                        console.log("Supplier Data error");
                        res.status(403).send({success : false, err: errSupplier});
                      }

                      if(dataSupplier.length > 0) {
                        console.log("Supplier Data exist");
                        res.status(403).send({success : false, msg : 'Supplier already registered'});
                      } else {
                        console.log("No Supplier Data");
                        supplierObj.save(function(supDBErr, supplierDBData) {
                          if(supDBErr) {
                            res.status(403).send({success : false, msg : 'Unable to save/find supplier data', err: supDBErr});
                          }

                          res.status(200).send({success : true, data: "Successfully Saved!"});
                        });
                      }
                  });
                }
              });
              res.status(200).send({success : true, data: data});
            } else {
              supplierObj.companyId = data[0].companyId;

              supplierObj.save(function(supplierErr, supplierData) {
                if(supplierErr) {
                  res.status(200).send({success : false, err: supplierErr});
                }

                res.status(200).send({success : true, data: supplierData});
              });
            }
          });
          //
          //CODE
          //


      }
    });

    //Get Supplier API with query params
    api.get('/getAllSuppliers', function(req, res) {
        if(req.query && req.query.emailId) {
          Supplier.findOne({"emailId":req.query.emailId}, function(err, data){
            if(err) {
               res.status(200).send({success : false, msg : 'Supplier not exist with this email'});
            }

            if(data){
              Company.findOne({"companyId":data.companyId}, function(companyError, companyData){
                if(companyError) {
                  res.status(200).send({success: false, err: companyError});
                }

                if(companyData){
                  var resObj = data.toObject();;
                  resObj.company = companyData;
                  res.status(200).send({success: true, data: resObj});
                }
              });
            } else {
              res.status(200).send({success : false, msg : 'Supplier not exist with this email'});
            }
          });
        } else {
          Supplier.find({}, function(err, data){
            if(err) {
               res.status(200).send({success : false, msg : 'No Data'});
            }

            if(data){
              res.status(200).send({suppliers: data});
            }
          });
        }
    });

    return api

};






/////////CODE
/*
Company.find({"companyName": req.body.company.companyName}, function(err, data){
  console.log("Found");
  if(err) {
    console.log("checking companyName");
    res.status(403).send({success : false, err: err});
  }
  if(data.length == 0) {
    console.log("No Company Data");
    companyObj.save(function(companyDataErr, companyData) {
      if(companyDataErr) {
        res.status(403).send({success : false, msg : 'Unable to save/find company data', err: companyDataErr});
      }

      if(companyData){
        console.log("Saved Company Data");
        supplierObj.companyId = companyData.companyId;

        Company.find({"emailId": req.body.emailId}, function(errSupplier, dataSupplier){
            if(errSupplier) {
              console.log("Supplier Data error");
              res.status(403).send({success : false, err: errSupplier});
            }

            if(dataSupplier.length > 0) {
              console.log("Supplier Data exist");
              res.status(403).send({success : false, msg : 'Supplier already registered'});
            } else {
              console.log("No Supplier Data");
              supplierObj.save(function(supDBErr, supplierDBData) {
                if(supDBErr) {
                  res.status(403).send({success : false, msg : 'Unable to save/find supplier data', err: supDBErr});
                }

                res.status(200).send({success : true, data: "Successfully Saved!"});
              });
            }
        });
      }
    });
  } else {
    supplierObj.companyId = data[0].companyId;

    Company.find({"emailId": req.body.emailId}, function(errSupplier, dataSupplier){
        if(errSupplier) {
          res.status(403).send({success : false, err: errSupplier});
        }

        if(dataSupplier.length > 0) {
          res.status(403).send({success : false, msg : 'Supplier already registered'});
        } else {
          supplierObj.save(function(supDBErr, supplierDBData) {
            if(supDBErr) {
              res.status(403).send({success : false, msg : 'Unable to save/find supplier data', err: supDBErr});
            }

            res.status(200).send({success : true, data: "Successfully Saved!"});
          });
        }
    });
  }
});*/
