var mysql = require("mysql");
var inquirer = require("inquirer");

function createProduct(name, category, price) {
    connection.query("INSERT INTO products SET ?", {
        name: name,
        category: category,
        price: price
    }, function (err, res) {

    });
}

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
    inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: 'Would you like to POST or BID?',
        choices: ['POST', 'BID']
    }]).then((answers) => {
        if (answers.choice == 'POST') {
            inquirer.prompt([{
                    type: 'input',
                    name: 'product',
                    message: 'What product are you posting?',
                    validate: function validateFilled(name) {
                        return name !== '';
                    }
                },
                {
                    type: 'input',
                    name: 'category',
                    message: 'How would you categorize this product?',
                    validate: function validateFilled(name) {
                        return name !== '';
                    }
                },
                {
                    type: 'input',
                    name: 'bid',
                    message: 'What is the starting bid (in $)?',
                    validate: function validateNum(name) {
                        return !(isNaN(name)) && (name !== '');
                    }
                }
            ]).then((choices) => {
                createProduct(choices.product, choices.category, parseFloat(choices.bid));
                connection.end();
            });
        } else {
            var categories = [];
            connection.query("SELECT category FROM products", function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    categories.push(res[i].category);
                }
            });

            function queryProducts(category) {
                var products = [];
                connection.query("SELECT name FROM products WHERE ?", {
                    category: category
                }, function (err, res) {
                    for (var j = 0; j < res.length; j++) {
                        products.push(res[j].name);
                    }
                });
                return products;
            }
            setTimeout(function () {
                inquirer.prompt([{
                    type: 'list',
                    name: 'categories',
                    message: 'What category do you wish to query?',
                    choices: categories
                }]).then((choices) => {
                    var products = queryProducts(choices.categories);
                    setTimeout(function () {
                        inquirer.prompt([{
                            type: 'list',
                            name: 'products',
                            message: 'What product do you wish to bid on?',
                            choices: products
                        }]).then((product) => {
                            var price;
                            connection.query("SELECT price FROM products WHERE ?", {
                                name: product.products
                            }, function (err, res) {
                                price = res[0].price;
                            });
                            setTimeout(function () {
                                console.log("Current bidding price: $" + price);
                                inquirer.prompt([{
                                    type: 'input',
                                    name: 'bidding',
                                    message: 'What do you wish to bid?',
                                    validate: function validateNum(name) {
                                        return !(isNaN(name)) && (name !== '');
                                    }
                                }]).then((bid) => {
                                    if (parseInt(bid.bidding) > price) {
                                        connection.query("UPDATE products SET ? WHERE ?",
                                            [{
                                                    price: parseInt(bid.bidding)
                                                },
                                                {
                                                    name: product.products
                                                }
                                            ],
                                            function (err, res) {
                                                if (err) throw err;
                                            });
                                            console.log("Bid successful!");
                                            connection.end();
                                    } else {
                                        console.log("Bid too low. Bidding request rejected.");
                                        connection.end();
                                    }
                                });
                            }, 500);
                        });
                    }, 500);
                });
            }, 500);
        }
    });
});