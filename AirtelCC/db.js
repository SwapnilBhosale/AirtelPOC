var mysql = require('mysql');
var db = null;

function connectDatabase() {
  if (!db) {
    db = mysql.createPool({
            host : "localhost",
            connectionLimit : 100,
            user : "root",
            password : "root",
            database : "airtel"
        }); 
  }
  return db;
}

module.exports = connectDatabase();
