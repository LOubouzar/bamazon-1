CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT,
    product_name VARCHAR(40) NOT NULL,
    department_name VARCHAR(40) NOT NULL,
    price DECIMAL(7,2) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Outlet covers", "Electronics", 10.00, 500), ("24-Pack Bud Light", "Beer and Wine", 24.99, 100), ("Spaghetti", "Food", 3.00, 5), ("Titanic", "Movies", 10.00, 1000), ("Baby Driver", "Movies", 20.00, 0), ("Apples (per pound)", "Food", 2.99, 10), ("Bananas", "Food", 0.69, 200), ("Cardboard", "Crafts", 1.00, 5000), ("Watercolor Paint", "Crafts", 10.00, 50), ("PlayStation 4", "Electronics", 500.00, 20);