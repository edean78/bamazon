-- Drop the database if it already exists
DROP DATABASE IF EXISTS BamazonDB;

-- Create the Bamazon Database
CREATE DATABASE BamazonDB;

-- Use the Bamazon Database
USE BamazonDB;

-- Create the products table
CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (45) NULL,
    department_name VARCHAR (25) NULL,
    price DECIMAL (10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

-- Insert values into the products table
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("American Girl Doll", "Toys", 100.00, 20), ("Star Wars Legos", "Toys", 25.00, 20), ("Nintendo Switch", "Electronics", 299.99, 10), ("Super Mario Game", "Electronics", 35.99, 15), ("Jeans", "Apparel", 25.99, 20), ("T-Shirts", "Apparel", 15.99, 20), ("Bicycles", "Sporting Goods", 99.99, 20), ("Bicycle Helmets", "Sporting Goods", 19.99, 20), ("Dog Man Book", "Books", 9.99, 20), ("Frozen II Coloring Book", "Books", 2.99, 20)


