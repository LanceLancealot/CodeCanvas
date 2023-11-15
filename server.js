const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const PORT = process.env.PORT || 3000;
const hbs = exphbs.create({});
const api = require('./routes/api');
const mysql = require('mysql2');
const dotenv = require('dotenv');

//Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//JSON parse middleware
app.use(express.urlencoded( {extended:true}));
app.use(express.json());

//CSS styles middleware
app.use('/public', express.static(path.join(__dirname, 'public')));

//Homepage route
//app.get('/', (req,res) => {
//    res.render('homepage');
//})

//API routes
//app.use('/api', api);

dotenv.config({ path: __dirname + '/.env' });

// Connect to database
const db = mysql.createConnection(
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the posts_db database.`)
  );
  
app.listen(PORT, () => {
    console.log (`Server running on ${PORT}`)
});