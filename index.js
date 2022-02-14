const express = require('express');
const app = express();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'password',
    database: 'ronniesburgerbar'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Successfully connected to Database");
    createTables();
    if (process.argv.includes("--init")) init();
    console.log("Server Started Successfully");
});

function init() {
    console.log("Initializing Database");
    connection.query("DELETE FROM users;");
    connection.query("DELETE FROM orders;");
    connection.query("DELETE FROM order_items;");
    connection.query("DELETE FROM products;");
    console.log("Successfully Deleted Table Content");
    connection.query('INSERT INTO products(category, name, description, price, image) VALUES ("Burgers", "Ronnies Special Cheese (Cheese Burger)", "test", 650, "test")');
    connection.query('INSERT INTO products(category, name, description, price, image) VALUES ("Burgers", "Ronnies Bacon Mix (Bacon & Cheese Burger)", "test", 750, "test")');
    connection.query('INSERT INTO products(category, name, description, price, image) VALUES ("Burgers", "The Two Ronnies (Double Burger)", "test", 900, "test")');
    connection.query('INSERT INTO products(category, name, description, price, image) VALUES ("Burgers", "Chicken Delight (Chicken Burger)", "test", 700, "test")');
    connection.query('INSERT INTO products(category, name, description, price, image) VALUES ("Burgers", "Veggie Supreme (Veggie Burger)", "test", 650, "test")');
    connection.query('INSERT INTO products(category, name, description, price, image) VALUES ("Burgers", "Cheesy Ronnies Halloumi Burger", "test", 700, "test")');
    console.log("Successfully Added Default Products");

}

function createTables() {
    connection.query(
        "CREATE TABLE IF NOT EXISTS users (" +
        "id INT auto_increment," +
        "first_name VARCHAR(255)," +
        "last_name VARCHAR(255)," +
        "email VARCHAR(255)," +
        "password VARCHAR(255)," +
        "role int," +
        "primary key (id)" +
        ");"
    );
    connection.query(
        "CREATE TABLE IF NOT EXISTS orders (" +
        "id INT auto_increment," +
        "user_id INT," +
        "creation_time DATETIME DEFAULT CURRENT_TIMESTAMP," +
        "primary key (id)" +
        ");"
    );
    connection.query(
        "CREATE TABLE IF NOT EXISTS order_items (" +
        "id INT auto_increment," +
        "order_id INT," +
        "product_id INT," +
        "product_cost INT," +
        "side_id INT," +
        "side_cost INT," +
        "primary key (id)" +
        ");"
    );
    connection.query(
        "CREATE TABLE IF NOT EXISTS products (" +
        "id INT auto_increment," +
        "category varchar(64)," +
        "name varchar(64)," +
        "description TEXT," +
        "price INT," +
        "image LONGTEXT," +
        "primary key (id)" +
        ");"
    );
    console.log("Successfully created Tables");
}

app.listen(5000, function () {
    console.log("Listening on port 5000")
});