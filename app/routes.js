var express = require('express');
var controllers = require('./controllers');

var router = express.Router();

router.route('/').get(controllers.getRoutes);
router.route('/country').get(controllers.getCountries);
router.route('/continent').post(controllers.getContinents);
router.route('/homicides').get(controllers.getHomicides);
router.route('/culture').get(controllers.getCulture);

module.exports = router;
