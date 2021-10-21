var sql = require('mssql');

// config for your database

var config = {

    "user": 'Magento',

    "password": 'Asc@123456',

    "server": '10.10.1.13',

    "database": 'almaneaDB',

    "port": '1433',

    "dialect": "mssql",

    "dialectOptions": {

        "instanceName": "SQLEXPRESS"

    }

};

(async() => {

    try {

        // connect to your database

        let pool = await sql.connect(config);

        // create Request object

        const request = pool.request();



        // query to the database and get the records

        request.query('SELECT ITEMID from Products p group By ITEMID;', (err, result) => {

            console.dir(result)

        })

    } catch (err) {

        // ... error checks

        console.log('This is Error');

        console.log(err);

        console.dir(err);

    }

})()

sql.on('error', err => {

    // ... error handler

    console.log('This is Error handler');

})