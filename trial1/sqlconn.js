var express = require('express');
var app = express();
// var dateFormat = require('dateformat');

app.get('/', function(req, res) {
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'Magento', //update me
        password: 'Asd@123456',
        server: '10.10.1.13',
        database: 'almaneaDB'
    };
    sql.close();
    // connect to your database
    sql.connect(config, function(err) {

        if (err) {
            console.log('Error', err);
        } else {
            console.log("Connected");
        }
        // create Request object  
        var request = new sql.Request();


        // query to the database and get the records
        // request.query("select top 2 'Invoices' as Tipe,InvoiceID,InvoiceNumber,InvoiceDate,(select top 1DriverPicture from dbDigitalApp.dbo.tbdriver) as Blob from AR_Invoices", function(err, result) {


        if (err) console.log(err)

        var myarr = new Array();

        // for (var i = 0; i < result.recordset.length; ++i) {
        //     var InvoiceNumber = result.recordset[i].InvoiceNumber;
        //     var InvoiceDate = dateFormat(result.recordset[i].InvoiceDate, "dd mmmm yyyy");
        //     var Blob = result.recordset[i].Blob;
        //     myarr.push({ 'InvoiceNumber': InvoiceNumber, 'InvoiceDate': InvoiceDate, 'Blob': Buffer.from(Blob).toString('base64') });

        // }

        res.json(myarr);

        sql.close();
    });



});

// });

var server = app.listen(5000, '0.0.0.0', function() {
    console.log('Server is running..');
});