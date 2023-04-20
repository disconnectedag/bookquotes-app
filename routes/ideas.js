const express = require('express');

const {
  getIdeas,
  getIdea,
  createIdea,
  updateIdea,
  deleteIdea,
} = require('../controllers/ideas');

const router = express.Router();

router.route('/').get(getIdeas).post(createIdea);

router.route('/:id').get(getIdea).put(updateIdea).delete(deleteIdea);

module.exports = router;
