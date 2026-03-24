const db = require('../config/db');

exports.getAllNurses = async (req, res) => {
    try {
        res.set('Cache-Control', 'no-store'); 
        const query = 'SELECT * FROM nurses';
        const [rows] = await db.execute(query);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.saveNurse = async (req, res) => {
    try {
        const query = 'INSERT INTO nurses (name, licenseNo, dob, age) values (?, ?, ?, ?)';
        const { name, licenseNo, dob, age } = req.body;
        await db.execute(query, [name, licenseNo, dob, age]);
        res.status(200).json({ message: 'Nurse added successfully' });
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.updateNurse = async (req, res) => {
    try {
        const query = 'UPDATE nurses SET name = ?, licenseNo = ?, dob = ?, age = ? WHERE id = ?';           
        const { name, licenseNo, dob, age } = req.body;
        const { id } = req.params;
        await db.execute(query, [name, licenseNo, dob, age, id]);
        res.status(200).json({ message: 'Nurse updated successfully' });
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.deleteNurse = async (req, res) => {
    try {
        const query = 'DELETE FROM nurses WHERE id = ?';
        const { id } = req.params;
        await db.execute(query, [id]);
        res.status(200).json({ message: 'Nurse deleted successfully' });
    } catch (error) {
        res.status(500).json(error);
    }
}   