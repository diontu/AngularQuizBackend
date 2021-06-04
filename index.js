const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

//cors
const whitelist = ['http://localhost:4200']
app.use(cors({
   credentials: true,
   origin: process.env.NODE_ENV === "development"
      ? process.env.LOCAL
      : function (origin, callback) {
         if (whitelist.indexOf(origin) !== -1) {
           callback(null, true)
         } else {
           callback(new Error('Not allowed by CORS'))
         }
       }
}));

//body-parser
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

//routers
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const quizRouter = require('./routes/quiz');

//use routers
app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);
app.use('/api/quiz', quizRouter);

//mongoose
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ifgx5.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  {useNewUrlParser: true, useUnifiedTopology: true}
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('mongodb connection opened.');
});

//listen on port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});