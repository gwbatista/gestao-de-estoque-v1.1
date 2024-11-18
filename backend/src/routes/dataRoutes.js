const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.route('/get-data')
  .post(dataController.getData)
  .put(dataController.updateData);

router.route('/get-data-dashboard')
  .post(dataController.getDataDashboard);

module.exports = router;