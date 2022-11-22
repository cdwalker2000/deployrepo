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

const changePassword = (request, response) => {
  const { username, old_password, new_password } = request.body

  console.log(username, old_password, new_password );

  pool.query("UPDATE users SET password = $1 WHERE username = $2;", [new_password, username], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// 

const getCart = (request, response) => {
  pool.query("SELECT * FROM cart;", (error, results) => {
    if (error) {
      throw error
    }
  console.log(results.rows)
  response.status(200).json(results.rows)
  })
}

// 

const clearCart = (request, response) => {
  console.log("clearCart start");
  console.log("dropped table");
  let drop = "DROP TABLE cart;"
  let create = "CREATE TABLE cart (cart_item_id SERIAL PRIMARY KEY, dish_name VARCHAR(50) NOT NULL, protein_name VARCHAR(50), ingr1_name VARCHAR(50), ingr2_name VARCHAR(50), ingr3_name VARCHAR(50), ingr4_name VARCHAR(50), sauce_name VARCHAR(50), have_drink INT NOT NULL, total_cost FLOAT NOT NULL);"
  let dropCreate = drop + " " + create;
  pool.query(dropCreate, (error, results) => {
    if (error) {
      throw error
    }
    console.log(results);
    // response.status(201).send(`Cart table recreated`);
  })
  console.log("Recreated cart");
  response.status(201).send(`Cart table recreated`);
}

//

const addDishToCart = (request, response) => {
  const { dish_name, protein_name, ingr1_name, ingr2_name, ingr3_name, ingr4_name, sauce_name, have_drink, total_cost } = request.body

  // console.log("Got here4");
  console.log(dish_name, protein_name, ingr1_name, ingr2_name, ingr3_name, ingr4_name, sauce_name, have_drink, total_cost );

  pool.query('INSERT INTO cart (dish_name, protein_name, ingr1_name, ingr2_name, ingr3_name, ingr4_name, sauce_name, have_drink, total_cost) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [dish_name, protein_name, ingr1_name, ingr2_name, ingr3_name, ingr4_name, sauce_name, have_drink, total_cost], (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Cart item added`);
  })
}

//

const deleteLastDish = (request, response) => {
  pool.query('DELETE FROM cart WHERE cart_item_id = (SELECT cart_item_id FROM cart ORDER BY cart_item_id DESC LIMIT(1));', (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Last cart item deleted`);
  })
}

//

const getMains = (request, response) => {
  pool.query("SELECT * FROM dish WHERE dish_type = 'main';", (error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows)
    response.status(200).json(results.rows)
  })
}

//

const getStarters = (request, response) => {
  pool.query("SELECT * FROM dish WHERE dish_type = 'starter';", (error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows)
    response.status(200).json(results.rows)
  })
}

//

const getDishType = (request, response) => {
  const dish_id = parseInt(request.params.dish_id)
  
  pool.query('SELECT dish_name, dish_type FROM dish WHERE dish_id = $1', [dish_id], (error, results) => {
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

//

const getInventory = (request, response) => {
  const { ingredient_name } = request.body
  let query = "SELECT * FROM inventory WHERE ingredient_name LIKE '%" + ingredient_name + "%';";

  pool.query(query, (error, results) => {
    if (error) {
      throw error
    } 
    console.log(results.rows);
    response.status(200).json(results.rows)
  })
}

//

const addNewUser = (request, response) => {
  const { new_fname, new_lname, new_username, new_password, new_role} = request.body

  // console.log("Got here4");
  console.log(new_fname, new_lname, new_username, new_password, new_role);

  pool.query('INSERT INTO users (username, password, fname, lname, role) VALUES ($1, $2, $3, $4, $5);', [new_username, new_password, new_fname, new_lname, new_role], (error, result) => {
    if (error) {
      throw error
    }
    console.log(result.rows);
    response.status(201).send(`New user added`);
  })
}

//

const addNewDish = (request, response) => {
  const { new_dish_name, new_dish_price } = request.body

  // console.log("Got here4");
  console.log(new_dish_name, new_dish_price);

  pool.query("INSERT INTO dish (dish_name, dish_price, dish_type) VALUES ($1, $2, $3);", [new_dish_name, new_dish_price, "starter"], (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send(`New dish item added`);
  })
}

//

const addNewInventory = (request, response) => {
  const { new_dish_name, new_dish_price } = request.body

  // console.log("Got here4");
  console.log(new_dish_name, new_dish_price);

  pool.query("INSERT INTO inventory (ingredient_name, stock, restock, location, category) VALUES ($1, $2, $3, $4, $5);", [new_dish_name, 0, 1000, "fridge", "starter"], (error, result) => {
    if (error) {
      throw error
    }
    response.status(201).send(`New inventory item added`);
  })
}

// 

const getSalesReport = (request, response) => {
  const { s_start_date, s_end_date, e_start_date, c_category1, c_category2 } = request.body

  pool.query("SELECT * FROM orders WHERE time BETWEEN $1 AND $2;", [s_start_date, s_end_date], (error, results) => {
    if (error) {
      throw error
    } 
    console.log(results.rows);
    response.status(200).json(results.rows)
  })
}

// 

const getRestockReport = (request, response) => {
  pool.query("SELECT ingredient_name, stock, restock FROM inventory WHERE stock < restock;", (error, results) => {
    if (error) {
      throw error
    } 
    console.log(results.rows);
    response.status(200).json(results.rows)
  })
}


  module.exports = {
    getOrders,
    changePassword,
    getCart,
    clearCart,
    addDishToCart,
    deleteLastDish,
    getMains,
    getStarters,
    getDishType,
    getProteins,
    getToppings,
    getSauces,
    getInventory,
    addNewUser,
    addNewDish,
    addNewInventory,
    getSalesReport,
    getRestockReport,
  }