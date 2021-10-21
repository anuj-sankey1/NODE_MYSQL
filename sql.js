var Connection = require("tedious").Connection;
var express = require("express");
var app = express();

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
var connection = new Connection(config);
connection.on("connect", function(err) {
    if (err) {
        console.log("Error in connnection: ", err);
    } else {
        console.log("Connected");
        console.log(executeStatement());
    }
});

connection.connect();

var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;

//  SELECT ITEMID from Products p group By ITEMID;

function executeStatement() {
    const arr = [];

    request = new Request("SELECT * from Products;", function(err) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Successful");
        }
    });

    // ITEMID, PRODUCTNAME Vendor GROUPTYPE NAME Maintenance Color Model
    var result = "";
    request.on("row", function(columns) {
        var obj = {};
        // console.log(columns);
        columns.forEach(function(column) {
            if (column.metadata.colName == "ITEMID") {
                obj.sku = column.value;
            } else if (column.metadata.colName == "PRODUCTNAME") {
                obj.productname = column.value;
            } else if (column.metadata.colName == "Vendor") {
                obj.vendor = column.value;
            } else if (column.metadata.colName == "GROUPTYPE") {
                obj.grouptype = column.value;
            } else if (column.metadata.colName == "NAME") {
                obj.name = column.value;
            } else if (column.metadata.colName == "Maintenance") {
                obj.maintenance = column.value;
            } else if (column.metadata.colName == "Color") {
                obj.color = column.value;
            } else if (column.metadata.colName == "Model") {
                obj.model = column.value;
            }


        });
        arr.push(obj);
        console.log(arr);
        result = "";
    });

    // arr.push(result);

    request.on("done", function(rowCount, more) {
        console.log(rowCount + " rows returned");
    });

    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function(rowCount, more) {
        connection.close();
    });

    connection.execSql(request);

    return arr;
}