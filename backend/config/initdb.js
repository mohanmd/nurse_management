const mysql = require('mysql2/promise');

const initDB = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: ''
    });

    await connection.query(
        `CREATE DATABASE IF NOT EXISTS nurse_management`
    );

    console.log('Database ready');

    await connection.end();
};

module.exports = initDB;