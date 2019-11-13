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
    if (err) throw err;

    console.log("Connected as id: ", connection.threadId);
    selectAll();
});

function selectAll() {
    connection.query("select * from products;", (err, response) => {
        if (err) throw err;

        console.log(response);
        purchaseItem();
    });
}

function purchaseItem() {
    inquirer
        .prompt([
            {
                name: "item_no",
                type: "input",
                message: "Enter the Item ID of the product you would like to purchase?",
                filter: Number
            },

            {
                name: "quantity",
                type: "input",
                message: "How many units would you like to buy?",
                filter: Number
            }
        ])
        .then(function (answer) {

            var item = answer.item_no;
            var quantity = answer.quantity;
            purchaseOrder(item, quantity);

            console.log(item);
            console.log(quantity);
        });
}

function purchaseOrder(id, quan) {
    connection.query('Select * FROM products WHERE item_id = ' + id + ';', function (err, res) {
        if(err) throw err;

        var products = res[0];

        if(quan <= products.stock_quantity) {
            var total = products.price * quan;
            var newQuan = products.stock_quantity - quan;

            console.log("Your order is being processed now!! \n");
            console.log(`Your total is $${total}\n`);
            console.log('Thank you for shopping with Bamazon!!!');

            connection.query('UPDATE products SET stock_quantity = ' + newQuan + ' WHERE item_id = ' + id + ';');
        } else {
            console.log("Sorry!!! Your order couldn't be processed due to insufficient stock\nPlease modify your order or check back at a later date.");
            setTimeout(purchaseItem(), 3000);
        }
    });
}