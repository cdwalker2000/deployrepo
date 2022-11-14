// const db = require('./db');

// const pool = db.pool;


require('dotenv').config()

const Pool = require('pg').Pool;

const pool = new Pool({
  user: "csce315_909_prasad",
  password: "730002297",
  host: "csce-315-db.engr.tamu.edu",
  database: "csce315_909_91",
  port: 5432,
  ssl: {rejectUnauthorized: false}
});

// Our first endpoint will be a GET request. 
// Inside the pool.query() we can put the raw SQL that will touch the api database. 
// We’ll SELECT all users and order by id.

const getOrders = (request, response) => {
  console.log("Got here2");
  pool.query('SELECT * FROM orders LIMIT(5)', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
    console.log(results.rows)
  })
  console.log("ASDASDAS");
}

// 

const getCart = (request, response) => {
  pool.query("SELECT * FROM inventory WHERE category = 'protein';", (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// 

const getProteins = (request, response) => {
  pool.query("SELECT * FROM inventory WHERE category = 'protein';", (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// 

const getToppings = (request, response) => {
  pool.query("SELECT * FROM inventory WHERE category = 'topping';", (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// 

const getSauces = (request, response) => {
  pool.query("SELECT * FROM inventory WHERE category = 'sauce';", (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//   The API will take a GET and POST request to the /users endpoint. In the POST request, we’ll be adding a new user. 
//   In this function, we’re extracting the name and email properties from the request body, and INSERTing the values.

  const createUser = (request, response) => {
    const { username, password, fname, lname } = request.body
  
    console.log("Got here4");
    console.log(username, password, fname, lname);

    pool.query('INSERT INTO users (name, email, fname, lname, role) VALUES ($1, $2, $3, $4, $5)', [username, password, fname, lname, "customer"], (error, result) => {
      if (error) {
        throw error
      }
      
      response.status(201).send(`User added with ID: ${result.insertId}`);
      // troubleshoot this line of code further, not functioning correctly
      
    })
    console.log("Got here5");

  }


  module.exports = {
    getOrders,
    getCart,
    getProteins,
    getToppings,
    getSauces,
    createUser,
  }