const express = require('express');

const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const PORT = 3000;

// підключаємо базу данних .db
const db = new Database(path.join(__dirname, 'tasks.db'));

// створюємо таблицю тасків, якщо її ше немає звісно.
db.exec
(`
    CREATE TABLE IF NOT EXISTS tasks 
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL
    )
`);

//сервер буде приймати json данні
app.use(express.json());

//отримаємо файли з public
app.use(express.static('public'));


// запускаємо сервер
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});