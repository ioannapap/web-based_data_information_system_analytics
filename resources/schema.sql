-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: murdersdb
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `continent`
--

DROP TABLE IF EXISTS `continent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `continent` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT 'name of the continent',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `continent_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `country_continent_FK` (`continent_id`),
  CONSTRAINT `country_continent_FK` FOREIGN KEY (`continent_id`) REFERENCES `continent` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=210 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `homicides`
--

DROP TABLE IF EXISTS `homicides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `homicides` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gender` varchar(1) DEFAULT NULL COMMENT '''f'' or ''m'' for females and males',
  `age_from` int(10) unsigned DEFAULT NULL COMMENT 'age range from',
  `age_to` int(10) unsigned DEFAULT NULL COMMENT 'age range to',
  `deathnums` decimal(6,4) DEFAULT NULL COMMENT 'deathnums is homicides over 100k deaths',
  `country_id` int(10) unsigned NOT NULL,
  `year` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `homicides_country_FK` (`country_id`),
  KEY `homicides_age_from_IDX` (`age_from`) USING BTREE,
  KEY `homicides_age_to_IDX` (`age_to`) USING BTREE,
  KEY `homicides_gender_IDX` (`gender`) USING BTREE,
  KEY `homicides_year_IDX` (`year`) USING BTREE,
  CONSTRAINT `homicides_country_FK` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17855 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `political_culture`
--

DROP TABLE IF EXISTS `political_culture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `political_culture` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `index` decimal(6,4) NOT NULL COMMENT 'deathnums - value of political culture',
  `country_id` int(10) unsigned NOT NULL,
  `year` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `political_culture_country_FK` (`country_id`),
  KEY `political_culture_year_IDX` (`year`) USING BTREE,
  CONSTRAINT `political_culture_country_FK` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1981 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-07 13:15:42
