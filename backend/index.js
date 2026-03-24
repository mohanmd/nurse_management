const express = require('express');
const cors = require('cors');
const app = express();
const nurseRoutes = require('./routes');

app.use(cors());
app.use(express.json());    

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

app.use('/api/nurses', nurseRoutes);