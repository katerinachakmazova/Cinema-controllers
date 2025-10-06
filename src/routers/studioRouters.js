const { Router } = require('express');
// ==================================
const studioController = require('../controllers/studioController');
const router = new Router();

router
  .route('/')
  .get(studioController.getStudios)
  .post(studioController.createStudio)
  .put(studioController.updateStudio);
router
  .route('/:id')
  .get(studioController.getStudioById)
  .delete(studioController.deleteStudio);

module.exports = router;
