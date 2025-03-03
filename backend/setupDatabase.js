const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log('Connected to the SQLite database.');
});

db.serialize(() => {
  db.run(\`
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      date TEXT NOT NULL
    )
  \`, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Articles table created or already exists.');
    }
  });
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});
