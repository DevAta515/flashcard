const express = require('express');
const app = express();
const flashcardRoutes = require("./routes/flashcard");
const cors = require('cors');
const mysql = require('mysql');

app.use(express.json());
app.use(cors());
app.use('/api/flashcards', flashcardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
