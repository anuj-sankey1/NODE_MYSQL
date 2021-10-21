var sql = require("mssql");

var dbconfig = {
    server: "10.10.1.13",
    database: "almaneaDB",
    user: "Magento",
    password: "Asd@123456",
    port: 1433,
};

function getData() {
    var conn = new sql.ConnectionPool(dbconfig);
    var req = new sql.Request(conn);
    conn.connect(function(err) {
        if (err) {
            console.log("Error", err);
            return;
        } else {
            console.log("Connected succesful");
        }
    });
}

getData();

// const sql = require("mssql");

// async() => {
//     try {
//         // make sure that any items are correctly URL encoded in the connection string
//         await sql.connect(
//             "Server=localhost,1433;Database=database;User Id=username;Password=password;Encrypt=true"
//         );
//         const result = await sql.query `select * from mytable where id = ${value}`;
//         console.dir(result);
//     } catch (err) {
//         // ... error checks
//     }
// };