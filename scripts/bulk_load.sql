delete from murdersdb.continent;
delete from murdersdb.country;
delete from murdersdb.homicides;
delete from murdersdb.political_culture;


LOAD DATA LOCAL INFILE '/home/ken/Documents/murders_analytics/fixed_data/continent.csv'
INTO TABLE murdersdb.continent
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id,name);


LOAD DATA LOCAL INFILE '/home/ken/Documents/murders_analytics/fixed_data/country.csv'
INTO TABLE murdersdb.country
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id,continent_id,name);


LOAD DATA LOCAL INFILE '/home/ken/Documents/murders_analytics/fixed_data/homicides.csv'
INTO TABLE murdersdb.homicides
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id,@vage_from,@vage_to,country_id,deathnums,@vgender,`year`)
SET
age_from = nullif(@vage_from,''),
age_to = nullif(@vage_to,''),
gender = nullif(@vgender,'');

LOAD DATA LOCAL INFILE '/home/ken/Documents/murders_analytics/fixed_data/political_culture.csv'
INTO TABLE murdersdb.political_culture
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id,country_id,`index`,`year`);
