/*
Author: Gokturk Enez
Mail: hi@gokturkenez.com.tr
Description: PayU Turkey ALU v3 Node JS Sample Code
*/
var express = require('express'),
    app = express(),
    port = 8995;
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ type: 'application/x-www-form-urlencoded', extended: false }));
app.use(bodyParser.json());

var moment = require('moment');
date = moment.utc().format('YYYYMMDDHHmmss').toString();
SecretKey = "SECRET_KEY";
hashstring = '';
app.post('/ipn', function (req, res) {
    var ipnparams = req.body;
    var array = { };
    array['IPN_PID'] = ipnparams["IPN_PID[]"][0];
    array['IPN_PNAME'] = ipnparams["IPN_PNAME[]"][0];
    array['IPN_DATE'] = ipnparams['IPN_DATE'];
    array['DATE'] = date;
    console.log(array);
    for (var k in array) {
        hashstring += array[k].length + array[k] ;
    }
    console.log(array);
    console.log(hashstring);
    var hash = require('crypto')
        , data = hashstring
        , secretkey = SecretKey;

    signature = hash.createHmac('md5', secretkey).update(data).digest('hex');
    res.end("<EPAYMENT>"+date+"|"+signature+"</EPAYMENT>")

});

var server = app.listen(port, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)

});