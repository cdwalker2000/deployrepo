const Pool = require('pg').Pool

// Create pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

const getMerchants = () => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM inventory;', (error, results) => {
        if (!error) {
            reject(error)
        }
        else {
            resolve(results);
        }
    })
}) 
}

console.log(getMerchants());





  
