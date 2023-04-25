const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');
const logger = require('./middleware/logger');

connectDB();
const app = express();

//middleware

app.use(logger);

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors middleware
app.use(
  cors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send('Hello world');
});

const quoteRouter = require('./routes/quotes');
app.use('/api/quotes', quoteRouter);

const server = app.listen(port, () =>
  console.log(`Server listening on ${port}`)
);

//handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  //close server (fail) and exit process
  server.close(() => process.exit(1));
});
