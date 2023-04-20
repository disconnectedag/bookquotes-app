const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

//get all ideas
router.get('', async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (error) {
    res.status(500).json({ success: false, error: 'something went wrong' });
    console.log(error);
  }
});

//get single idea
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({ success: true, data: idea });
  } catch (error) {
    res.status(500).json({ success: false, error: 'something went wrong' });
    console.log(error);
  }
});

// add an idea
router.post('/', async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });
  try {
    const savedIdea = await idea.save();
    res.json({ success: true, data: savedIdea });
  } catch (error) {
    res.status(500).json({ success: false, error: 'something went wrong' });
    console.log(error);
  }
});

//update idea
router.put('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    //match the usernames
    if (idea.username === req.body.username) {
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
          },
        },
        {
          new: true,
        }
      );
      return res.json({ success: true, data: updatedIdea });
    }

    //usernames don't match
    res.status(403).json({
      success: false,
      error: "You aren't authorized to access this resource",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'something went wrong' });
  }
});

//delete an idea
router.delete('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    //match the usernames
    if (idea.username === req.body.username) {
      await Idea.findByIdAndDelete(req.params.id);
      res.json({ success: true, data: {} });
    } else {
      //usernames don't match
      res.status(403).json({
        success: false,
        error: "You're not authorized to access this resource",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'something went wrong' });
  }
});

module.exports = router;
