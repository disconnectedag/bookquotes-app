const Idea = require('../models/Idea');
// @desc  Get all ideas
//@route GET /api/ideas
//@access Public

exports.getIdeas = async (req, res, next) => {
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (error) {
    res.status(500).json({ success: false, error: 'something went wrong' });
    console.log(error);
  }
};

// @desc  Get single idea
//@route GET /api/ideas/:id
//@access Public

exports.getIdea = async (req, res, next) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({ success: true, data: idea });
  } catch (error) {
    res.status(500).json({ success: false, error: 'something went wrong' });
    console.log(error);
  }
};

// @desc  Create new idea
//@route POST /api/ideas
//@access Private

exports.createIdea = async (req, res, next) => {
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
};

// @desc  Update idea
//@route GET /api/ideas/:id
//@access Private

exports.updateIdea = async (req, res, next) => {
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
};

// @desc  Delete idea
//@route DELETE /api/ideas
//@access Private

exports.deleteIdea = async (req, res, next) => {
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
};
