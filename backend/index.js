const express = require('express');
const cors = require('cors');
const app = express();
const nurseRoutes = require('./routes');
const initDB = require('./config/initdb');

app.use(cors());
app.use(express.json());    

(async () => {
    await initDB(); // ✅ Step 1 (create DB)

    const createTable = require('./config/createTable'); // ✅ require AFTER DB exists
    await createTable(); // ✅ Step 2 (create table)

    app.listen(5000, () => {
        console.log('Server running');
    });
})();

app.use('/api/nurses', nurseRoutes);