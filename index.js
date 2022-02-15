const express = require('express');
const app = express();
const mysql = require('mysql2');
const fs = require('fs');
const bodyParer = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(bodyParer.urlencoded({extended: true}));
app.use(bodyParer.json());

const logins = {};

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'password',
    database: 'ronniesburgerbar'
});

connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to Database");
    createTables();
    if (process.argv.includes("--init")) init();
    console.log("Server Started Successfully");
});

app.get('/products', async (request, response) => {
    connection.query("SELECT * FROM products", (error, results) => {
        if (error) console.log(error);
        response.status(200).json(results);
    });
});

app.post('/createProduct', async (request, response) => {
    if (!isAuthorised(request.body.token)) {
        await response.send("You are not authorised to make this request.");
        return;
    }
    connection.query('INSERT INTO products(category, name, description, price, image) VALUES (?, ?, ?, ?, ?)', [
        request.body.category, request.body.name, request.body.description, request.body.price, request.body.image
    ], (error, results) => {
        if (error) console.log(error);
        response.status(200).json(results);
    });
});


app.post('/editProduct', async (request, response) => {
    if (!isAuthorised(request.body.token)) {
        await response.send("You are not authorised to make this request.");
        return;
    }
    connection.query("UPDATE products SET category = ?, name = ?, description = ?, price = ?, image = ? WHERE id = ?", [
        request.body.category, request.body.name, request.body.description, request.body.price, request.body.image, request.body.productID
    ], (error, results) => {
        if (error) console.log(error);
        response.status(200).json(results);
    });
});


app.post('/deleteProduct', async (request, response) => {
    if (!isAuthorised(request.body.token)) {
        await response.send("You are not authorised to make this request.");
        return;
    }
    connection.query("DELETE FROM products WHERE id = ?", [
        request.body.productID
    ], (error, results) => {
        if (error) console.log(error);
        response.status(200).json(results);
    });
});

app.post('/registerUser', async (request, response) => {
    const usernamePattern = /^[a-zA-Z]{3,15}$/;
    const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-;:]).{8,}$/;
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let email = request.body.email;
    let firstName = request.body.firstName;
    let lastName = request.body.lastName;
    let password = request.body.password;

    let message = "";
    if (!usernamePattern.test(firstName)) {
        message = "First name is not a valid name"
    }
    if (!usernamePattern.test(lastName)) {
        message = "Last name is not a valid name"
    }
    if (!passwordPattern.test(password)) {
        message = "Password needs to include uper and lower case a number a symbol and be 8+ characters long"
    }
    if (!emailPattern.test(email)) {
        message = "Invalid email"
    }

    connection.query("SELECT * FROM users where email = ?", [email],
        (error, results) => {
            if (error) console.log(error);
            if (results.length > 0) message = "A user already exists by this email.";

            if (message === "") {
                connection.query("INSERT into users (first_name, last_name, email, password, role) VALUES(?, ?, ?, ?, 0)", [
                        firstName, lastName, email, bcrypt.hashSync(password, saltRounds)
                    ],
                    (error) => {
                        if (error) console.log(error);
                        response.status(200).json({
                            success: true,
                            message: message
                        });
                    });
            } else {
                response.status(200).json({
                    success: false,
                    message: message
                });
            }
        });
});

app.post('/login', async (request, response) => {
    connection.query("SELECT * FROM users where email = ?", [request.body.email], (error, results) => {
        if (error) console.log(error);
        if (results.length === 0) {
            response.status(200).json({
                token: "",
                message: "Unknown Email"
            });
            return;
        }
        const isAuthorised = bcrypt.compareSync(request.body.password, results[0].password);
        response.status(200).json({
            token: isAuthorised ? getToken(results[0]) : "",
            message: isAuthorised ? "" : "Incorrect Password"
        });
    });
});

app.post('/logout', async (request, response) => {
    const token = request.body.token;
    delete logins[token];
    response.status(200).json({});
});

app.post('/createOrder', async (request, response) => {
    const token = request.body.token;
    if (!(token in logins)) {
        response.send("You are not authorised to make this request.");
        return;
    }
    const user = logins[token];

    Promise.all(request.body.order
        .map(async productID => {
            return new Promise(resolve => {
                connection.query("SELECT * FROM products where id = ?", [productID], (error, results) => {
                    if (error) console.log(error);
                    resolve({
                        productID: results[0].id,
                        productCost: results[0].price
                    });
                });
            });
        })).then(async order => {
        const orderID = await new Promise(resolve => {
            connection.query('INSERT INTO orders(user_id) VALUES (?)', [user.id], (error, results) => {
                if (error) console.log(error);
                resolve(results.insertId);
            });
        });
        for (let i = 0; i < order.length; i++) {
            connection.query('INSERT INTO order_items(order_id, product_id, product_cost) VALUES (?, ?, ?)', [
                orderID, order[i].productID, order[i].productCost
            ], (error) => {
                if (error) console.log(error);
            });
        }
        response.status(200).send("Order Created");
    });
});

function isAuthorised(token) {
    if (!(token in logins)) return false;
    return logins[token].role === 1
}

function getToken(user) {
    const token = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
    logins[token] = user;
    return token;
}

function init() {
    console.log("Initializing Database");

    connection.query("DELETE FROM users;");
    connection.query("DELETE FROM orders;");
    connection.query("DELETE FROM order_items;");
    connection.query("DELETE FROM products;");
    console.log("Successfully Deleted Table Content");

    const menu = JSON.parse(fs.readFileSync('menu.json'));
    for (let i = 0; i < menu.length; i++) {
        const product = menu[i];
        connection.query('INSERT INTO products(category, name, description, price, image) VALUES (?, ?, ?, ?, ?)',
            [product.category, product.name, product.description, product.price, product.image]
        );
    }
    console.log("Successfully Added Default Products");
    connection.query("INSERT into users (first_name, last_name, email, password, role) VALUES(?, ?, ?, ?, 1)", [
        "Admin", "", "admin@gmail.com", bcrypt.hashSync("password", saltRounds)
    ]);
    console.log("Successfully Created Admin account");
    console.log("Email: admin@gmail.com");
    console.log("Password: password");
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