var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var PORT = process.env.PORT || 3000;
var mongoose = require('./config/mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(function(err, status) {
    if(err) {
        console.log(err + '-' + status);
    }else{
        console.log('Connected to the database = ' + status);
    }
});

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
//app.use(session({secret:"udj9sd8un8d678aaf76", resave:false, saveUninitialized:true}));

/*
* APIs for the School Application
 */
var supplier = require('./server/routes/supplier')(app, express);
app.use('/data', supplier);

app.use(express.static(__dirname + '/'));

app.listen(PORT, function(err){
    if(err){
        console.log('Error in server!');
    }else{
        console.log('Server running on port: 3000');
    }
});
