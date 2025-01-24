const express = require('express')
const cors = require("cors");
const path = require('path')
const app  = express()
const nconf = require('./config/nconf')

const port = nconf.get("port")
const environment = nconf.get("environment")

var corsOptions = {
    origin: "http://localhost:8081"
  };
  
  app.set('view engine', 'ejs');
  app.set('views', './views'); 
  
  // parse requests of content-type - application/json
  app.use(express.json());
  
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));
  
  app.use(express.static(path.join(__dirname, 'public')));



app.get('/' , (req ,res) =>  {
    res.send('Hello ')
})
require("./routes/account.routes")(app);
console.log(app)

app.listen(port, () => {
  
    console.log(`Application listening on port ${port} in ${environment} mode.`);
})