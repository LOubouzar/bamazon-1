var mysql = require("mysql");
var inquirer = require("inquirer");

var totalCost = 0;

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});

connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
    if (err) throw err;
    for (var i in res) {
        console.log("Item ID " + res[i].item_id + " - " + res[i].product_name + ": $" + res[i].price);
    }
});

setTimeout(function () {
    inquirer.prompt({
        type: 'input',
        name: 'productPick',
        message: 'Enter the ID of the product you wish to purchase: ',
        validate: function validateNum(name) {
            return !(isNaN(name)) && (name !== '');
        }
    }).then((answers) => {
        if (parseInt(answers.productPick) > 10 || parseInt(answers.productPick) < 1) {
            console.log("That product ID does not exist.");
            connection.end();
        } else {
            inquirer.prompt({
                type: 'input',
                name: 'productCount',
                message: 'How many units of this product would you like to purchase?',
                validate: function validateNum(name) {
                    return !(isNaN(name)) && (name !== '');
                }
            }).then((choices) => {
                connection.query("SELECT * FROM products WHERE ?", {
                    item_id: parseInt(answers.productPick)
                }, function (err, res) {
                    if (err) throw err;
                    if (parseInt(choices.productCount) > res[0].stock_quantity) {
                        console.log("Insufficient stock! Try again Thursday after our restock!");
                        connection.end();
                    } else {
                        totalCost += (parseInt(choices.productCount) * res[0].price);
                        var remaining = parseInt(res[0].stock_quantity) - parseInt(choices.productCount);
                        connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [remaining, parseInt(answers.productPick)], function (err, res, fields) {
                            if (err) throw err;
                        });
                        console.log("Remaining stock quantity: " + remaining + " units.")
                        console.log("Total Amount Due: $" + totalCost);
                        connection.end();
                    }
                });
            });
        }
    });    
}, 250);

