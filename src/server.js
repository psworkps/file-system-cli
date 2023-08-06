require('dotenv').config();
const express = require('express');
const app = new express();
const path = require('path')
const PORT = process.env.PORT || 3001;
const { logger } = require('./middleware/logError');


// custom middleware logger
app.use(logger);

// set the view engine to ejs
app.set('view engine', 'ejs');

// static files reference
app.use(express.static(path.join(__dirname, '../public')))

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

// routes
app.use('/', require('./routes'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));