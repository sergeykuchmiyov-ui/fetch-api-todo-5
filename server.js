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

// Получить все задачи
app.get('/api/tasks', (req, res) => {
    const tasks = db.prepare('SELECT * FROM tasks').all();
    res.json(tasks);
});

//створюємо нову задачу
app.post('/api/tasks', (req, res) => {
    const { title } = req.body;

    // Перевіряємо назву задачі
    if (!title || typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({
            error: 'Назва задачі обов’язкова'
        });
    }

    const result = db.prepare(
        'INSERT INTO tasks (title) VALUES (?)'
    ).run(title.trim());

    res.status(201).json({
        id: result.lastInsertRowid,
        title: title.trim()
    });
});

// запускаємо сервер
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

