const { Router } = require('express');
// ==================================
const movieController = require('../controllers/movieController');
const router = new Router();

router
  .route('/')
  .get(movieController.getMovies)
  .post(movieController.createMovie)
  .put( movieController.updateMovie)
router
  .route('/:id')
  .get(movieController.getMovieById)
  .delete(movieController.deleteMovie);

module.exports = router;
