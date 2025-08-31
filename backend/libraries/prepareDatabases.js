

//Prepare vouchers database
const sqlite3 = require('sqlite3').verbose();
//Connect to database
const vouchersdb = new sqlite3.Database('./db/vouchers.db', (err) => {
  if (process.env.NODE_ENV !== "test") {
  
    if (err) {
      console.error('Could not connect to the Vouchers database:', err);
    } else {
      console.log('Connected to vouchers.db');
    }
  }
});


module.exports = {
  vouchersdb
};