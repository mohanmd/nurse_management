const db = require('./db');

const createTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS nurses (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            licenseNo VARCHAR(100),
            dob DATE,
            age INT
        )
    `;

    await db.execute(query);

    console.log('Table ready');
};

module.exports = createTable;