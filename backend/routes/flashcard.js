const express = require('express');
const router = express.Router();
const db = require('../db');
// const { getFlashcards, addFlashcard, updateFlashcard, deleteFlashcard } = require('../models/flashcardModel');

router.get('/flashes', (req, res) => {
  db.query('SELECT * FROM flashes', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

router.post('/add', (req, res) => {
  const { question, answer } = req.body;
  const query = 'INSERT INTO flashes (question, answer) VALUES (?, ?)';
  db.query(query, [question, answer], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId });
  });
});

router.put('/update', (req, res) => {
  const id = req.query.id; 
  console.log(id);
  const { question, answer } = req.body; 
  
  const query = 'UPDATE flashes SET question = ?, answer = ? WHERE id = ?';
  
  db.query(query, [question, answer, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message }); 
    }
    res.json({ affectedRows: results.affectedRows });
  });
});

router.delete('/delete', (req, res) => {
  const id = req.query.id;
  console.log(id);
  const query = 'DELETE FROM flashes WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ affectedRows: results.affectedRows });
  });
});



module.exports = router;
