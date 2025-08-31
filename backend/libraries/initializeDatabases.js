const sqlite3 = require('sqlite3').verbose();

const voucherdb = new sqlite3.Database('./db/vouchers.db');

function initializeDatabases() {
  // Create Voucher table
  voucherdb.run(`
    CREATE TABLE IF NOT EXISTS vouchers (
      id TEXT PRIMARY KEY,
      title TEXT,
      firstName TEXT,
      lastName TEXT,
      phoneNumber TEXT,
      email TEXT,
      value REAL,
      purchaseDate TEXT,
      adjustedValue TEXT,
      dateUsed TEXT
    )
  `);

}


// Export the database connections and the initializer
module.exports = {
  initializeDatabases,
  voucherdb
};