var mysql = require('mysql');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();


// Link http://localhost:3000/customer

// Connection
var conn = mysql.createConnection({
    host: "10.10.1.13",
    user: "Magento",
    password: "Asd@123456",
    database: "almaneaDB"
});


// MYSQL data in cmd
conn.connect(function(err) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Connected to mysql");


    }

});

// set port, listen for requests
// app.listen(3000, () => {
//     console.log("Server is running on port 3000.");
// });

// // default route
// app.get('/', function(req, res) {
//     return res.send({ error: true, message: 'Default route' })
// });

// // Retrieve all customers 
// app.get('/customer', function(req, res) {
//     conn.query('SELECT * FROM customer_entity', function(error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results, message: 'Customer data' });
//     });
// });

// Retrieve all Product 
// app.get('/product', function(req, res) {
//     conn.query('SELECT value FROM `catalog_product_entity_varchar` WHERE store_id=2;', function(error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results, message: 'Product data' });
//     });
// });











// conn.query("SELECT * FROM customer_entity", function(err, result, fields) {
//     if (err) {
//         console.log("Error ", err);
//     } else {
//         console.log(result);
//     }

// });