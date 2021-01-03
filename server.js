const express = require("express");
const app = express();
//to bring colors in the console
const colors = require("colors");
//for environment variable
const dotenv = require("dotenv");
//Bringing in User Router
const users = require("./routes/users");


dotenv.config({ path: "./config/config.env" });

//body parser middleware
app.use(express.json())

//Mongo DB connection
const connectDB = require("./config/db");

connectDB();


//Route handler
app.use('/api/v1', users);



PORT = process.env.PORT || 5000;

//for deployment
if(process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));
  const path=require('path')
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


//Server for port 5000
app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgGreen
      .yellow.bold
  )
);
