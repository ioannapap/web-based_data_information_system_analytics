const db = require('./database');
const validators = require('./validators');
const squel = require('squel');

/**
 * Marks a response a json
 * @param {object} response - Express response
 */
function markJson(response) {
  response.setHeader('Content-Type', 'application/json');
}

/**
 * Converts an object to Json
 * @param {object} obj - The target object
 * @return {str} -  A string representation as JSON of the object.
 */
function asJson(obj) {
  return JSON.stringify(obj);
}

module.exports = {
  getRoutes: function(req, res) {
    /** Returns the available API endpoints. */
    markJson(res);
    res.status(200).send(asJson({
      routes: [
        '/country', '/continent', '/homicides', '/culture',
      ],
    }));
  },

  getCountries: function(req, res) {
    /** Returns a list of countries and their continents. */
    markJson(res);
    const q = squel.select().from('country');
    q.field('country.id').field('country.name').field('c.name', 'continent');
    q.join('continent', 'c', 'country.continent_id = c.id');
    q.order('country.name');

    db.query(q.toString(), function(error, results) {
      if (!error) {
        res.status(200).send(asJson({
          results: results,
        }));
      } else {
        res.status(400).send(asJson({
          'message': error,
        }));
      }
    });
  },

  getContinents: function(req, res) {
    /** Returns a list of continents. */
    markJson(res);

    const q = squel.select().from('continent');
    q.field('continent.id').field('continent.name');

    db.query(q.toString(), function(error, results) {
      if (!error) {
        res.status(200).send(asJson({
          results: results,
        }));
      } else {
        res.status(400).send(asJson({
          'message': error,
        }));
      }
    });
  },

  getHomicides: function(req, res) {
    /**
      * This endpoint returns homicides information.
      *
      * GET parameters
      * @param {int} age_from - Minimum age
      * @param {int} age_to - Maximum age
      * @param {str} gender - Gender can be 'F' or 'M'
      * @param {int} year_from  - Minimum year
      * @param {int} year_to - Maximum year
      * @param {str} country_ids - Comma sep IDs of the countries
      * @param {int} years_group - Group of years for average (10 -> decades)
      */
    markJson(res);

    let q = squel.select().from('homicides');
    q.join('country', null, 'country.id = homicides.country_id');

    if (req.query.country_ids && req.query.country_ids.length > 0
      && validators.isListOfInt(req.query.country_ids)) {
      q.where(`country_id IN (${req.query.country_ids})`);
    }
    if (req.query.age_from) {
      q.where('age_from >= ' + req.query.age_from);
    }
    if (req.query.age_to) {
      q.where('age_to <= ' + req.query.age_to);
    }
    if (req.query.gender) {
      q.where(`gender = '${req.query.gender}'`);
    }
    if (req.query.year_from) {
      q.where('year >= ' + req.query.year_from);
    }
    if (req.query.year_to) {
      q.where('year <= ' + req.query.year_to);
    }

    if (!req.query.years_group) {
      q.group('year, country_id');
      q.order('year');
    }

    if (req.query.years_group) {
      q.field(`year DIV ${req.query.years_group} AS years_group`);
      q.field('AVG(deathnums) as avg_deathnums');
      q.group('years_group');
      q = squel.select().from(q, 't');
      q.field('avg_deathnums');
      q.field(`years_group*${req.query.years_group}`, 'from_year');
    } else {
      q.field('year').field('country.name', 'country_name');
      q.field('avg(deathnums)', 'homicides');
    }

    db.query(q.toString(), function(error, results) {
      if (!error) {
        res.status(200).send(asJson({
          results: results,
        }));
      } else {
        res.status(400).send(asJson({
          'message': error,
        }));
      }
    });
  },

  getCulture: function(req, res) {
    /**
     * This endpoint returns the homicides.
     *
     * Available Filters
     * @param {int} year_from  - Minimum year
     * @param {int} year_to - Maximum year
     * @param {str} country_ids - (required) Comma sep IDs of the countries
     */
    markJson(res);

    const q = squel.select().from('political_culture');
    q.field('year');
    q.field('`index`', 'political_index').field('name', 'country_name');
    q.join('country', null, 'country.id = political_culture.country_id');
    q.order('year');

    if (req.query.country_ids && req.query.country_ids.length > 0
      && validators.isListOfInt(req.query.country_ids)) {
      q.where(`country_id IN (${req.query.country_ids})`);
    }
    if (req.query.year_from) {
      q.where('year >= ' + req.query.year_from);
    }
    if (req.query.year_to) {
      q.where('year <= ' + req.query.year_to);
    }

    db.query(q.toString(), function(error, results) {
      if (!error) {
        res.status(200).send(asJson({
          results: results,
        }));
      } else {
        res.status(400).send(asJson({
          'message': error,
        }));
      }
    });
  },
};
