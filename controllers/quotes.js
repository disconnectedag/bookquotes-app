const Quote = require('../models/Quote');
// @desc  Get all quotes
//@route GET /api/quotes
//@access Public

exports.getQuotes = async (req, res, next) => {
  try {
    const quotes = await Quote.find();
    res.json({ success: true, data: quotes });
  } catch (error) {
    res.status(500).json({ success: false, error: 'something went wrong' });
    console.log(error);
  }
};

// @desc  Get single quote
//@route GET /api/ideas/:id
//@access Public

exports.getQuote = async (req, res, next) => {
  try {
    const quote = await Quote.findById(req.params.id);
    res.json({ success: true, data: quote });
  } catch (error) {
    res.status(500).json({ success: false, error: 'something went wrong' });
    console.log(error);
  }
};

// @desc  Create new quote
//@route POST /api/quotes
//@access Private

exports.createQuote = async (req, res, next) => {
  const quote = new Quote({
    quote: req.body.quote,
    book: req.body.book,
    author: req.body.author,
    genre: req.body.genre,
  });
  try {
    const savedQuote = await quote.save();
    res.json({ success: true, data: savedQuote });
  } catch (error) {
    res.status(500).json({ success: false, error: 'something went wrong' });
    console.log(error);
  }
};

// @desc  Update idea
//@route GET /api/ideas/:id
//@access Private

exports.updateQuote = async (req, res, next) => {
  try {
    const updatedQuote = await Quote.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          author: req.body.author,
          quote: req.body.quote,
          book: req.body.book,
          genre: req.body.genre,
        },
      },
      {
        new: true,
      }
    );
    return res.json({ success: true, data: updatedQuote });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'something went wrong' });
  }
};

// @desc  Delete idea
//@route DELETE /api/ideas
//@access Private

exports.deleteQuote = async (req, res, next) => {
  try {
    const deletedQuote = await Quote.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: { deletedQuote } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'something went wrong' });
  }
};
