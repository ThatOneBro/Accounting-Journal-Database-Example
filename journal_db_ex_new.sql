CREATE DATABASE  IF NOT EXISTS `journal_db_ex` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `journal_db_ex`;
-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: journal_db_ex
-- ------------------------------------------------------
-- Server version	5.7.11-log

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
-- Table structure for table `account_types`
--

DROP TABLE IF EXISTS `account_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_types` (
  `account_type_ID` int(11) NOT NULL AUTO_INCREMENT,
  `account_type` varchar(45) NOT NULL,
  `normal_balance` varchar(45) NOT NULL,
  PRIMARY KEY (`account_type_ID`),
  UNIQUE KEY `account_name_UNIQUE` (`account_type`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_types`
--

LOCK TABLES `account_types` WRITE;
/*!40000 ALTER TABLE `account_types` DISABLE KEYS */;
INSERT INTO `account_types` VALUES (1,'Asset','debit'),(2,'Liability','credit'),(3,'Stockholders\' Equity','credit');
/*!40000 ALTER TABLE `account_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `account_name` varchar(45) NOT NULL,
  `account_type` int(11) NOT NULL,
  PRIMARY KEY (`account_name`),
  KEY `account_type_idx` (`account_type`),
  CONSTRAINT `account_type` FOREIGN KEY (`account_type`) REFERENCES `account_types` (`account_type_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES ('Accounts Receivable',1),('Cash',1),('Equipment',1),('Inventory',1),('Land',1),('Prepaid Insurance',1),('Supplies',1),('Accounts Payable',2),('Notes Payable',2),('Unearned Revenue',2),('Common Stock',3),('Paid-in Capital',3);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `journal`
--

DROP TABLE IF EXISTS `journal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `journal` (
  `line_ID` int(4) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `entry_date` date NOT NULL,
  `account` varchar(45) NOT NULL,
  `debit` varchar(15) NOT NULL,
  `amount` int(11) NOT NULL,
  PRIMARY KEY (`line_ID`),
  KEY `account_idx` (`account`),
  CONSTRAINT `account` FOREIGN KEY (`account`) REFERENCES `accounts` (`account_name`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `journal`
--

LOCK TABLES `journal` WRITE;
/*!40000 ALTER TABLE `journal` DISABLE KEYS */;
INSERT INTO `journal` VALUES (0001,'2013-11-12','Inventory','debit',1500),(0002,'2013-11-12','Cash','credit',1500),(0003,'2013-09-15','Supplies','debit',1500),(0004,'2013-09-15','Cash','credit',1500),(0005,'2015-10-19','Accounts Payable','debit',2000),(0006,'2015-10-19','Cash','credit',2000),(0007,'2014-04-15','Land','debit',1000),(0008,'2014-04-15','Cash','credit',1000),(0009,'2015-10-21','Prepaid Insurance','debit',1200),(0010,'2015-10-21','Cash','credit',1200),(0011,'2015-12-15','Equipment','debit',12000),(0012,'2015-12-15','Cash','credit',12000),(0013,'2013-10-19','Land','debit',1800),(0014,'2013-10-19','Cash','credit',1800),(0015,'2016-03-16','Inventory','debit',15000),(0016,'2016-03-16','Cash','credit',15000),(0017,'2016-03-17','Equipment','debit',12000),(0018,'2016-03-17','Cash','credit',2000),(0019,'2016-03-17','Accounts Payable','credit',10000),(0020,'2015-04-18','Cash','credit',30),(0021,'2015-04-18','Supplies','debit',30),(0022,'2016-02-04','Land','debit',1500),(0023,'2016-02-04','Cash','credit',1500),(0024,'2016-03-19','Equipment','debit',1500),(0025,'2016-03-19','Cash','credit',1500),(0026,'2015-10-21','Cash','debit',500000),(0027,'2015-10-21','Inventory','credit',500000),(0028,'2015-10-19','Cash','debit',1500),(0029,'2015-10-19','Inventory','credit',1500);
/*!40000 ALTER TABLE `journal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `username` varchar(45) NOT NULL,
  `pass` char(60) NOT NULL,
  `admin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('admin','$2a$10$NeB15hK3LFCZmc1gF49uu.etXmjsYMedT8SXQbbV8COyFqX.RW2ti',1),('default','$2a$10$XMYhsfMppIYwyOlcwdjkh.E3L9IZsb9RMnHkAZzm2ygbChFKVVjUC',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'journal_db_ex'
--
/*!50003 DROP PROCEDURE IF EXISTS `get_balance` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_balance`(IN selected_account VARCHAR(45), OUT debits int(11), OUT credits int(11), OUT acct_normal_balance VARCHAR(45))
BEGIN
SELECT SUM(amount) 
INTO debits 
FROM 
(SELECT journal.debit, journal.amount, accounts.account_name, account_types.normal_balance
FROM journal 
LEFT JOIN accounts 
ON journal.account = accounts.account_name 
LEFT JOIN account_types 
ON accounts.account_type = account_types.account_type_ID
WHERE journal.account = selected_account 
ORDER BY journal.entry_date) account_totals
WHERE debit = 'debit';

SELECT SUM(amount) 
INTO credits 
FROM
(SELECT journal.debit, journal.amount, accounts.account_name, account_types.normal_balance
FROM journal 
LEFT JOIN accounts 
ON journal.account = accounts.account_name 
LEFT JOIN account_types 
ON accounts.account_type = account_types.account_type_ID
WHERE journal.account = selected_account 
ORDER BY journal.entry_date) account_totals
WHERE debit = 'credit';

SELECT normal_balance 
INTO acct_normal_balance 
FROM
(SELECT journal.debit, journal.amount, accounts.account_name, account_types.normal_balance
FROM journal 
LEFT JOIN accounts 
ON journal.account = accounts.account_name 
LEFT JOIN account_types 
ON accounts.account_type = account_types.account_type_ID
WHERE journal.account = selected_account 
ORDER BY journal.entry_date) account_totals
ORDER BY normal_balance ASC
LIMIT 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-04-23 10:47:28
