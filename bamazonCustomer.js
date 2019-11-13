// Require mysql and inquirer
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

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

        // instantiate
        var table = new Table({
            head: ['Item_Id', 'Product_Name', 'Department', 'Price', 'Stock_Quantity'],
            colWidths: [15, 30, 30, 10, 15]
        });

        // table is an Array, so you can `push`, `unshift`, `splice` and friends
        for(var i = 0; i < response.length; i++){
            var data = response[i];
        table.push([
            data.item_id, data.product_name, data.department_name, data.price, data.stock_quantity
        ]);
        }
        console.log(table.toString());

        setTimeout(purchaseItem, 3000);
    });
}

function runAgain() {
    setTimeout(selectAll, 3000);
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

        });
}

function purchaseOrder(id, quan) {
    connection.query('Select * FROM products WHERE item_id = ' + id + ';', function (err, res) {
        if (err) throw err;

        var products = res[0];

        if (quan <= products.stock_quantity) {
            var total = products.price * quan;
            var newQuan = products.stock_quantity - quan;

            console.log("Your order is being processed now!! \n");
            console.log(`Your total is $${total}\n`);
            console.log('Thank you for shopping with Bamazon!!!');

            connection.query('UPDATE products SET stock_quantity = ' + newQuan + ' WHERE item_id = ' + id + ';');

            runAgain();
        } else {
            console.log("Sorry!!! Your order couldn't be processed due to insufficient stock\nPlease modify your order or check back at a later date.");
            runAgain();
        }
    });
}

