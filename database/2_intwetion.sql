-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: intwetion
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.19.04.1

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

DROP DATABASE IF EXISTS `intwetion`;

CREATE DATABASE `intwetion`;

USE `intwetion`;
--
-- Table structure for table `card`
--

DROP TABLE IF EXISTS `card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `card` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `bg_color` varchar(25) DEFAULT NULL,
  `description` text,
  `online` tinyint(1) DEFAULT NULL,
  `payment` tinyint(1) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card`
--

LOCK TABLES `card` WRITE;
/*!40000 ALTER TABLE `card` DISABLE KEYS */;
INSERT INTO `card` VALUES (1,'Mes points forts','./assets/Images/Force.jpg','#ff0000','Ce test propose de vous auto-évaluer sur vos principales forces. Vous êtes invité(e) à regarder une vidéo d\'introduction, puis à faire le test. Après une vidéo de conclusion, vous aurez accés à un programme de travail personnalisé afin de développer vos forces.',1,0,'2019-07-23 11:51:28'),(2,'Mes points forts - demo','./assets/Images/Force.jpg','#ff0000','Ce test propose de vous auto-évaluer sur vos principales forces. Vous êtes invité(e) à regarder une vidéo d\'introduction, puis à faire le test. Après une vidéo de conclusion, vous aurez accés à un programme de travail personnalisé afin de développer vos forces.',1,0,'2019-07-23 11:51:59');
/*!40000 ALTER TABLE `card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_card` int(11) DEFAULT NULL,
  `number_question` float DEFAULT NULL,
  `text_question` text,
  `image_question` varchar(255) DEFAULT NULL,
  `type_response` int(11) DEFAULT NULL,
  `has_comment` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_card` (`id_card`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`id_card`) REFERENCES `card` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,1,1.1,'Quel est mon niveau d\'estime de moi ?','./assets/images_questions/1.1.png',1,0),(2,1,1.21,'Quelle est ma confiance en ma vie ?','./assets/images_questions/1.21.png',1,0),(3,1,1.22,'Quelle est ma confiance en moi-même ?','./assets/images_questions/1.22.png',1,0),(4,1,1.23,'Quelle est ma confiance en mon avenir ?','./assets/images_questions/1.23.png',1,0),(5,1,1.24,'Quelle est ma confiance en les autres ?','./assets/images_questions/1.24.png',1,0),(6,1,1.3,'Quelles sont mes principales réussites ?','./assets/images_questions/1.3.png',2,0),(7,1,2.21,'Quel est mon état de joie ?','./assets/images_questions/2.21.png',1,0),(8,1,2.22,'Quelle est mon niveau de bonheur ?','./assets/images_questions/2.22.png',1,0),(9,1,2.23,'Quel est mon niveau de paix en moi?','./assets/images_questions/2.23.png',1,0),(10,1,2.4,'Quel est mon niveau d\'authenticité ?','./assets/images_questions/2.4.png',1,0),(11,1,2.6,'Quel est mon niveau de franchise ?','./assets/images_questions/2.6.png',1,0),(12,1,3.1,'Quelle est ma force de volonté ?','./assets/images_questions/3.1.png',1,0),(13,1,3.2,'Quel est mon niveau de courage ?','./assets/images_questions/3.2.png',1,0),(14,1,3.3,'Quel est mon niveau d\'engagement ?','./assets/images_questions/3.3.png',1,0),(15,1,3.5,'Quel est mon niveau d\'audace ?','./assets/images_questions/3.5.png',1,0),(16,1,4.3,'Quelle est ma motivation ?','./assets/images_questions/4.3.png',1,0),(17,1,4.4,'Quelle est ma joie de vivre ?','./assets/images_questions/4.4.png',1,0),(18,1,6.14,'Quelle est ma sensibilité ?','./assets/images_questions/6.14.png',1,0),(19,1,6.4,'Quel est le niveau de mes intuitions ?','./assets/images_questions/6.4.png',1,0),(20,1,7.3,'Quel est mon niveau d\'attention ?','./assets/images_questions/7.3.png',1,0),(21,1,4.11,'Quel est mon amour de moi-même ?','./assets/images_questions/4.11.png',1,0),(22,1,4.12,'Quel est mon amour de ma famille ?','./assets/images_questions/4.12.png',1,0),(23,1,4.13,'Quel est mon amour des autres ?','./assets/images_questions/4.13.png',1,0),(24,1,4.14,'Quel est mon niveau d\'humanité ?','./assets/images_questions/4.14.png',1,0),(25,1,4.51,'Quelle est ma force intellectuelle ?','./assets/images_questions/4.51.png',1,0),(26,1,4.52,'Quelle est ma force émotionnelle ?','./assets/images_questions/4.52.png',1,0),(27,1,4.53,'Quelle est ma force instinctive ?','./assets/images_questions/4.53.png',1,0),(28,1,4.6,'Quelles sont mes passions ?','./assets/images_questions/4.6.png',2,0),(29,1,4.101,'Quel est mon besoin de liberté ?','./assets/images_questions/4.101.png',1,0),(30,1,4.102,'Quel est mon besoin d\'autonomie ?','./assets/images_questions/4.102.png',1,0),(31,1,4.103,'Quel est mon besoin d\'être valorisé ?','./assets/images_questions/4.103.png',1,0),(32,1,4.104,'Quel est mon besoin d\'amour de moi-même ?','./assets/images_questions/4.104.png',1,0),(33,1,4.105,'Quel est mon besoin d\'amour des autres ?','./assets/images_questions/4.105.png',1,0),(34,1,4.106,'Quel est mon besoin d\'estime des autres ?','./assets/images_questions/4.106.png',1,0),(35,1,4.107,'Quel est mon besoin d\'estime de moi ?','./assets/images_questions/4.107.png',1,0),(36,1,6.2,'Quelles sont mes compétences ?','./assets/images_questions/6.2.png',2,0),(37,1,6.11,'Quels sont mes talents ?','./assets/images_questions/6.11.png',2,0),(38,1,7.13,'Quels sont mes rêves ?','./assets/images_questions/7.13.png',2,0),(39,1,7.41,'Quel est mon niveau d\'habileté avec l\'invisible ?','./assets/images_questions/7.41.png',1,0),(40,1,7.42,'Quel est mon niveau d\'habileté avec les autres ?','./assets/images_questions/7.42.png',1,0),(41,1,7.43,'Quel est mon niveau d\'habileté avec la musique ?','./assets/images_questions/7.43.png',1,0),(42,1,7.44,'Quel est mon niveau d\'habileté avec mon corps ?','./assets/images_questions/7.44.png',1,0),(43,1,7.45,'Quel est mon niveau d\'habileté avec les images ?','./assets/images_questions/7.45.png',1,0),(44,1,7.46,'Quel est mon niveau d\'habileté avec les mots ?','./assets/images_questions/7.46.png',1,0),(45,1,7.47,'Quel est mon niveau d\'habileté avec la nature ?','./assets/images_questions/7.47.png',1,0),(46,1,7.48,'Quel est mon niveau d\'habileté avec les nombres ?','./assets/images_questions/7.48.png',1,0),(47,1,7.49,'Quel est mon niveau d\'habileté avec moi ?','./assets/images_questions/7.49.png',1,0),(48,2,1.1,'Quel est mon niveau d\'estime de moi ?','./assets/images_questions/1.1.png',1,0),(49,2,1.21,'Quelle est ma confiance en ma vie ?','./assets/images_questions/1.21.png',1,0),(50,2,1.22,'Quelle est ma confiance en moi-même ?','./assets/images_questions/1.22.png',1,0),(51,2,1.23,'Quelle est ma confiance en mon avenir ?','./assets/images_questions/1.23.png',1,0),(52,2,1.24,'Quelle est ma confiance en les autres ?','./assets/images_questions/1.24.png',1,0),(53,2,1.3,'Quelles sont mes principales réussites ?','./assets/images_questions/1.3.png',2,0),(54,2,2.21,'Quel est mon état de joie ?','./assets/images_questions/2.21.png',1,0),(55,2,2.22,'Quelle est mon niveau de bonheur ?','./assets/images_questions/2.22.png',1,0);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resources`
--

DROP TABLE IF EXISTS `resources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `resources` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_question` int(11) DEFAULT NULL,
  `url_resource` text,
  `type_resource` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_question` (`id_question`),
  CONSTRAINT `resources_ibfk_1` FOREIGN KEY (`id_question`) REFERENCES `questions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resources`
--

LOCK TABLES `resources` WRITE;
/*!40000 ALTER TABLE `resources` DISABLE KEYS */;
INSERT INTO `resources` VALUES (1,1,'https://www.youtube.com/watch?v=XkOpbLBzPsY&t=471s',3),(2,1,'https://www.youtube.com/watch?v=G8rZf5wxbos',2),(3,1,'https://www.amazon.fr/LAventure-int%C3%A9rieure-lib%C3%A9rer-souffrance-r%C3%A9aliser/dp/2839906562',1),(4,2,'https://s3.amazonaws.com/alchymed/PointdeBascule-EBOOK_Tome_1.pdf',1),(5,2,'https://www.youtube.com/watch?v=QACfVMSNKdE',2),(6,2,'https://www.youtube.com/watch?v=G8rZf5wxbos',3),(7,2,'https://www.youtube.com/watch?v=j00wp1ZIVTQ',3),(8,2,'https://www.youtube.com/watch?v=QcwQYlwLVUo',3),(9,2,'https://www.youtube.com/watch?v=z4_yBm54Ai4',3),(10,2,'https://www.youtube.com/watch?v=-CVN2qAfBes',3),(11,3,'',1),(12,3,'',1),(13,4,'blabla',1),(14,4,'blabla2',2),(15,5,'',1),(16,5,'',1),(17,6,'',1),(18,6,'',1),(19,7,'',1),(20,7,'',1),(21,8,'',1),(22,8,'',1),(23,9,'',1),(24,9,'',1),(25,10,'',1),(26,10,'',1),(27,11,'',1),(28,11,'',1),(29,12,'',1),(30,12,'',1),(31,13,'',1),(32,13,'',1),(33,14,'',1),(34,14,'',1),(35,15,'',1),(36,15,'',1),(37,16,'',1),(38,16,'',1),(39,17,'',1),(40,17,'',1),(41,18,'',1),(42,18,'',1),(43,19,'',1),(44,19,'',1),(45,20,'',1),(46,20,'',1),(47,21,'',1),(48,21,'',1),(49,22,'',1),(50,22,'',1),(51,23,'',1),(52,23,'',1),(53,24,'',1),(54,24,'',1),(55,25,'',1),(56,25,'',1),(57,26,'',1),(58,26,'',1),(59,27,'',1),(60,27,'',1),(61,28,'',1),(62,28,'',1),(63,29,'',1),(64,30,'https://s3.amazonaws.com/alchymed/PointdeBascule-EBOOK_Tome_1.pdf',2),(65,30,'https://www.youtube.com/watch?v=QACfVMSNKdE',3),(66,30,'https://www.youtube.com/watch?v=G8rZf5wxbos',2),(67,30,'https://www.youtube.com/watch?v=j00wp1ZIVTQ',2),(68,30,'https://www.youtube.com/watch?v=QcwQYlwLVUo',2),(69,30,'https://www.youtube.com/watch?v=z4_yBm54Ai4',2),(70,30,'https://www.youtube.com/watch?v=-CVN2qAfBes',2),(71,31,'',1),(72,32,'',1),(73,33,'',1),(74,34,'',1),(75,35,'',1),(76,35,'',1),(77,36,'',1),(78,36,'',1),(79,37,'',1),(80,37,'',1),(81,38,'',1),(82,38,'',1),(83,39,'',1),(84,39,'',1),(85,40,'',1),(86,40,'',1),(87,41,'',1),(88,41,'',1),(89,42,'',1),(90,42,'',1),(91,43,'',1),(92,43,'',1),(93,44,'',1),(94,44,'',1),(95,45,'',1),(96,45,'',1),(97,46,'',1),(98,46,'',1),(99,47,'',1),(100,47,'',1),(101,48,'https://www.youtube.com/watch?v=XkOpbLBzPsY&t=471s',3),(102,48,'https://www.youtube.com/watch?v=G8rZf5wxbos',2),(103,48,'https://www.amazon.fr/LAventure-int%C3%A9rieure-lib%C3%A9rer-souffrance-r%C3%A9aliser/dp/2839906562',1),(104,49,'https://s3.amazonaws.com/alchymed/PointdeBascule-EBOOK_Tome_1.pdf',1),(105,49,'https://www.youtube.com/watch?v=QACfVMSNKdE',2),(106,49,'https://www.youtube.com/watch?v=G8rZf5wxbos',3),(107,49,'https://www.youtube.com/watch?v=j00wp1ZIVTQ',3),(108,49,'https://www.youtube.com/watch?v=QcwQYlwLVUo',3),(109,49,'https://www.youtube.com/watch?v=z4_yBm54Ai4',3),(110,49,'https://www.youtube.com/watch?v=-CVN2qAfBes',3),(111,50,'',1),(112,50,'',1),(113,51,'blabla',1),(114,51,'blabla2',2),(115,52,'',1),(116,52,'',1),(117,53,'',1),(118,53,'',1),(119,54,'',1),(120,54,'',1),(121,55,'',1),(122,55,'',1);
/*!40000 ALTER TABLE `resources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videos`
--

DROP TABLE IF EXISTS `videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `videos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_card` int(11) DEFAULT NULL,
  `url_video` varchar(255) DEFAULT NULL,
  `type_video` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_card` (`id_card`),
  CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`id_card`) REFERENCES `card` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videos`
--

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;
INSERT INTO `videos` VALUES (1,1,'https://www.youtube.com/watch?v=gN7U0ycbWCM',1),(2,1,'https://www.youtube.com/watch?v=keHnIZ9rmFA',3),(3,1,'https://www.youtube.com/watch?v=k3_tw44QsZQ',2),(4,2,'https://www.youtube.com/watch?v=gN7U0ycbWCM',1),(5,2,'https://www.youtube.com/watch?v=keHnIZ9rmFA',3),(6,2,'https://www.youtube.com/watch?v=k3_tw44QsZQ',2);
/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-23 11:55:10
