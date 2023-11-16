const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const PORT = process.env.PORT || 3000;
const hbs = exphbs.create({});
const api = require('./controllers/api');

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
  
app.listen(PORT, () => {
    console.log (`Server running on ${PORT}`)
});