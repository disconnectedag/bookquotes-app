const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
  quote: {
    type: String,
    required: [true, 'Please include a quote'],
    trim: true,
  },
  book: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
  },
});

module.exports = mongoose.model('Quote', QuoteSchema);
