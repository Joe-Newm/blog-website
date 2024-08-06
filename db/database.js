import sqlite3 from 'sqlite3';
import {open} from 'sqlite';

async function openDb() {
    return open({
        filename: './db/database.db',
        driver: sqlite3.Database,
    });
}

async function createTable() {
    const db = await openDb();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS blog_posts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          content TEXT,
          date TEXT
        )
      `);
}

export { openDb, createTable };