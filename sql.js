// let tedious = require('tedious');
// let Connection = tedious.Connection;
// var config = {
//     userName: 'Magento',
//     password: 'Asd@123456',
//     server: '10.10.1.13',
//     options: {
//         database: 'almaneaDB'
//     }
// }

// function handleConnection(err) {
//     if (err) console.error("error connecting :-(", err);
//     else console.log("successfully connected!!")
// }
// let connection = new Connection(config);
// console.log("Connection", connection);
// connection.on('connect', handleConnection);

var Connection = require("tedious").Connection;

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
        executeStatement();
    }

    // If no error, then good to proceed.
});

connection.connect();

var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;

//  SELECT ITEMID from Products p group By ITEMID;

function executeStatement() {
    request = new Request(
        "SELECT * from Products;",
        function(err) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Successful");
            }
        }
    );
    var result = "";
    request.on("row", function(columns) {
        columns.forEach(function(column) {
            if (column.value === null) {
                console.log("NULL");
            } else {
                result += column.value + " ";
            }
        });
        console.log(result);
        result = "";
    });

    request.on("done", function(rowCount, more) {
        console.log(rowCount + " rows returned");
    });

    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function(rowCount, more) {
        connection.close();
    });

    connection.execSql(request);
}