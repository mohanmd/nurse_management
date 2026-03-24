const express = require('express');

const router = express.Router();
const { getAllNurses, saveNurse, updateNurse, deleteNurse } = require('./controller/controller');

router.get('/', getAllNurses);
router.post('/save', saveNurse);
router.put('/update/:id', updateNurse);
router.delete('/delete/:id', deleteNurse); 

module.exports = router;