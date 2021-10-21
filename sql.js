var Connection = require("tedious").Connection;
var config = {
    server: "10.10.1.13",
    userName: "Magento",
    password: "Asd@123456",
    port: 1433,
    database: "almaneaDB",
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
        "SELECT ITEMID from Products p group By ITEMID;",
        function(err) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Successful");
            }
        }
    );

    connection.execSql(request);
}