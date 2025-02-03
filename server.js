require('dotenv').config();
const express = require('express')
const cors = require("cors");
const path = require('path')
const mongoose = require('mongoose')
const db = mongoose.connection
const cookieParser = require('cookie-parser');
const app  = express()
const nconf = require('./config/nconf')

const port = nconf.get("port")
const environment = nconf.get("environment")

  app.set('view engine', 'ejs');
  app.set('views', './views'); 
  
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, 'public')));

require("./routes/account.routes")(app);
require("./routes/member.routes")(app);
require("./routes/shop.routes")(app);
require("./routes/users.routes")(app);


   mongoose.connect(process.env.DATABASE_URL)
   .then(() => console.log('Connected to Database'))
   .catch((error) => console.error('Database connection error:', error));
 
   
app.listen(port, () => {
  
    console.log(`Application listening on port ${port} in ${environment} mode.`);
})