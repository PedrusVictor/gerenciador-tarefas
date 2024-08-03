const sqlite= require('sqlite3').verbose()

const db= new sqlite.Database('database.db')

db.serialize(function(){
    db.run(" CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT, describe TEXT,dateC DATE,dateV DATE, status TEXT)")

})
module.exports= db