var express = require('express');
var mysql = require("mysql");
var app = express();
app.set('view engine', 'ejs');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'SYSDBA',
    password: 'masterkey',
    database: 'murdersdb'
});

app.get("/country", function (req, res) {
    /**
     * This endpoint returns all the countries
     */

    var q = `
        SELECT country.id, country.name, continent.name as "continent_name"
        FROM murdersdb.country INNER JOIN murdersdb.continent ON (country.continent_id = continent.id)
    `;

    connection.query(q, function (error, results) {
        res.setHeader('Content-Type', 'application/json');
        if (!error) {
            res.status(200).send(JSON.stringify({
                results: results
            }));
        } else {
            res.status(400).send(JSON.stringify({
                "message": error
            }));
        }
    });
})

app.get("/continent", function (req, res) {
    /**
     * This endpoint returns all the continents
     */

    var q = `
        SELECT continent.id, continent.name
        FROM continent
    `;

    connection.query(q, function (error, results) {
        res.setHeader('Content-Type', 'application/json');
        if (!error) {
            res.status(200).send(JSON.stringify({
                results: results
            }));
        } else {
            res.status(400).send(JSON.stringify({
                "message": error
            }));
        }
    });
})

app.get("/homicides", function (req, res) {
    /**
     * This endpoint returns the homicides.
     * 
     * Available Filters
     * @param {int} age_from - Minimum age
     * @param {int} age_to - Maximum age
     * @param {str} gender - Gender can be 'F' or 'M'
     * @param {int} year_from  - Minimum year
     * @param {int} year_to - Maximum year
     * @param {int} country_id - ID of the country
     * @param {int} years_group - Group of years for average (10 -> decades)
     */

    let qu = `
        SELECT year, deathnums, age_from, age_to, country.name AS country_name
        FROM homicides INNER JOIN country ON (country.id = homicides.country_id)
    `

    if (Object.keys(req.query).length > 0) {
        qu += " WHERE "
    }

    if (req.query.age_from) {
        qu += 'age_from >= ' + req.query.age_from + ' AND '
    }
    if (req.query.age_to) {
        qu += 'age_to <= ' + req.query.age_to + ' AND '
    }
    if (req.query.gender) {
        qu += 'gender = \'' + req.query.gender + '\' AND '
    }
    if (req.query.year_from) {
        qu += 'year >= ' + req.query.year_from + ' AND '
    }
    if (req.query.year_to) {
        qu += 'year <= ' + req.query.year_to + ' AND '
    }
    if (req.query.country_id) {
        qu += 'country_id = ' + req.query.country_id + ' AND '
    }

    if (qu.endsWith('AND ')) {
        qu = qu.substring(0, qu.length - 4)
    }

    if (!req.query.years_group) {
        qu += ' ORDER BY year'
    }

    if (req.query.years_group) {
        qu = qu.replace(
            "year, deathnums, age_from, age_to, country.name AS country_name",
            "`year` DIV " + req.query.years_group + " AS years_group, AVG(deathnums) as avg_deathnums"
        )
        if (Object.keys(req.query).length === 1) {
            qu = qu.replace("WHERE ", "");
        }
        qu += " GROUP BY years_group"

        qu = "SELECT avg_deathnums, years_group*" + req.query.years_group + " as from_year FROM (" + qu + ") a"
    }

    connection.query(qu, function (error, results) {
        res.setHeader('Content-Type', 'application/json');

        if (!error) {
            res.status(200).send(JSON.stringify({
                results: results
            }));
        } else {
            res.status(400).send(JSON.stringify({
                "message": error
            }));
        }
    });
})

app.get("/political-culture", function (req, res) {
    /**
     * This endpoint returns the homicides.
     * 
     * Available Filters
     * @param {int} year_from  - Minimum year
     * @param {int} year_to - Maximum year
     * @param {int} country_id - ID of the country
     */

    let qu = `
        SELECT \`year\`, \`index\` as political_index, country.name AS country_name
        FROM political_culture INNER JOIN country ON (country.id = political_culture.country_id)
    `

    if (Object.keys(req.query).length > 0) {
        qu += " WHERE "
    }

    if (req.query.year_from) {
        qu += '`year` >= ' + req.query.year_from + ' AND '
    }
    if (req.query.year_to) {
        qu += '`year` <= ' + req.query.year_to + ' AND '
    }
    if (req.query.country_id) {
        qu += 'country_id = ' + req.query.country_id + ' AND '
    }

    if (qu.endsWith('AND ')) {
        qu = qu.substring(0, qu.length - 4)
    }

    qu += ' ORDER BY `year`'

    connection.query(qu, function (error, results) {
        res.setHeader('Content-Type', 'application/json');

        if (!error) {
            res.status(200).send(JSON.stringify({
                results: results
            }));
        } else {
            res.status(400).send(JSON.stringify({
                "message": error
            }));
        }
    });
})

app.get("/", function (req, res) {
    var q = 'SELECT * FROM homicides limit 10';

    connection.query(q, function (error, results) {
        res.setHeader('Content-Type', 'application/json');

        if (!error) {
            res.status(200).send(JSON.stringify({
                results: results
            }));
        } else {
            res.status(400).send(JSON.stringify({
                "message": error
            }));
        }
    });
});

app.listen(8080, function () {
    console.log('App listening on port 8080!');
});