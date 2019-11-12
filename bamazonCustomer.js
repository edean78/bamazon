// Require mysql and inquirer
var mysql = require("mysql");
var inquirer = require("inquirer");

// Create DB
var myDB = {
    host: '192.168.99.100',
    port: '3306',
    user: 'root',
    password: 'docker',
    database: 'BamazonDB'
};

// Create the DB connection
var connection = mysql.createConnection(myDB);

connection.connect(err => {
    if(err) throw err;

    console.log("Connected as Id: " + connection.threadId);
    selectItems();
});

function selectItems() {
    connection.query("SELECT item_id, product_name, price FROM BamazonDB.products",(err, res) => {
        if (err) throw err;


        for(var i = 0; i < res.length; i++){
           console.log(res[i]);
        }
        
        connection.end();
    });
}

