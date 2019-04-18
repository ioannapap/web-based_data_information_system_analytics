const express = require('express');
const controllers = require('./controllers');

const router = new express.Router();

router.route('/').get(controllers.getRoutes);
router.route('/country').get(controllers.getCountries);
router.route('/continent').get(controllers.getContinents);
router.route('/homicides').get(controllers.getHomicides);
router.route('/culture').get(controllers.getCulture);

module.exports = router;
