const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080
const db = require('./queries')
const cors = require("cors")

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
// app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.post('/change_password', db.changePassword)

app.get('/cart', db.getCart)
app.post('/clear_cart', db.clearCart)
app.post('/add_dish_to_cart', db.addDishToCart)
app.delete('/delete_last_dish', db.deleteLastDish)

app.get('/mains', db.getMains)
app.get('/starters', db.getStarters)
app.get('/dish_type/:dish_id', db.getDishType)

app.get('/proteins', db.getProteins)
app.get('/toppings', db.getToppings)
app.get('/sauces', db.getSauces)

app.post('/inventory', db.getInventory)
app.post('/new_user', db.addNewUser)
app.post('/add_new_dish', db.addNewDish)
app.post('/add_new_inventory', db.addNewInventory)

app.post('/sales_report', db.getSalesReport)
app.get('/restock_report', db.getRestockReport)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
