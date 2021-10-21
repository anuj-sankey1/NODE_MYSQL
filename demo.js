var express = require('express');
var app = express();

app.get('/', function(req, res) {

    var sql = require("mssql");

    // config for your database
    var config = {
        server: "10.10.1.13",
        authentication: {
            type: "default",
            options: {
                userName: "Magento",
                password: "Asd@123456",
            },
        },
        options: {
            // encrypt: false,  // Second solution to disable enforcement of TLS protocol
            database: "almaneaDB",
            // SQL Server does not support TLS 1.2, but it's required by default in Node.js 12
            // So enforcing TLSv1
            cryptoCredentialsDetails: {
                minVersion: "TLSv1",
            },
        },
    };

    // connect to your database
    sql.connect(config, function(err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query('select * from Products', function(err, recordset) {

            if (err) console.log(err)

            // send records as a response
            res.send(recordset);

        });
    });
});

var server = app.listen(5000, function() {
    console.log('Server is running..');
});