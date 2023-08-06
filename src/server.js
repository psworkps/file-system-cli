require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;


// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));