-- MySQL dump 10.13  Distrib 5.5.47, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: pms
-- ------------------------------------------------------
-- Server version	5.5.47-0ubuntu0.14.04.1

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
-- Table structure for table `board_sprint`
--

DROP TABLE IF EXISTS `board_sprint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `board_sprint` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `sprint_id` int(10) unsigned NOT NULL,
  `board_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `board_sprint_sprint_id_foreign` (`sprint_id`),
  KEY `board_sprint_board_id_foreign` (`board_id`),
  CONSTRAINT `board_sprint_board_id_foreign` FOREIGN KEY (`board_id`) REFERENCES `boards` (`id`) ON DELETE CASCADE,
  CONSTRAINT `board_sprint_sprint_id_foreign` FOREIGN KEY (`sprint_id`) REFERENCES `sprints` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board_sprint`
--

LOCK TABLES `board_sprint` WRITE;
/*!40000 ALTER TABLE `board_sprint` DISABLE KEYS */;
INSERT INTO `board_sprint` VALUES (1,'0000-00-00 00:00:00','0000-00-00 00:00:00',2,1),(2,'0000-00-00 00:00:00','0000-00-00 00:00:00',2,2),(3,'0000-00-00 00:00:00','0000-00-00 00:00:00',2,3);
/*!40000 ALTER TABLE `board_sprint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boards`
--

DROP TABLE IF EXISTS `boards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boards` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `sprint_default` tinyint(1) NOT NULL DEFAULT '0',
  `task_default` tinyint(1) NOT NULL DEFAULT '0',
  `order` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boards`
--

LOCK TABLES `boards` WRITE;
/*!40000 ALTER TABLE `boards` DISABLE KEYS */;
INSERT INTO `boards` VALUES (1,'0000-00-00 00:00:00','0000-00-00 00:00:00','To Do',1,'',1,1,0),(2,'0000-00-00 00:00:00','0000-00-00 00:00:00','In Progress',1,'',1,0,0),(3,'0000-00-00 00:00:00','0000-00-00 00:00:00','Done',1,'',1,0,0);
/*!40000 ALTER TABLE `boards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `issues`
--

DROP TABLE IF EXISTS `issues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `issues` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `order` int(11) NOT NULL,
  `priority` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'High',
  `task_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Task',
  `story_point` int(11) NOT NULL,
  `board_id` int(10) unsigned DEFAULT NULL,
  `author_id` int(10) unsigned DEFAULT NULL,
  `reporter_id` int(10) unsigned DEFAULT NULL,
  `assigne_id` int(10) unsigned DEFAULT NULL,
  `project_id` int(10) unsigned NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `lft` int(11) DEFAULT NULL,
  `rgt` int(11) DEFAULT NULL,
  `depth` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `issues_board_id_foreign` (`board_id`),
  KEY `issues_author_id_foreign` (`author_id`),
  KEY `issues_reporter_id_foreign` (`reporter_id`),
  KEY `issues_assigne_id_foreign` (`assigne_id`),
  KEY `issues_project_id_foreign` (`project_id`),
  CONSTRAINT `issues_assigne_id_foreign` FOREIGN KEY (`assigne_id`) REFERENCES `users` (`id`),
  CONSTRAINT `issues_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`),
  CONSTRAINT `issues_board_id_foreign` FOREIGN KEY (`board_id`) REFERENCES `boards` (`id`),
  CONSTRAINT `issues_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `issues_reporter_id_foreign` FOREIGN KEY (`reporter_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issues`
--

LOCK TABLES `issues` WRITE;
/*!40000 ALTER TABLE `issues` DISABLE KEYS */;
/*!40000 ALTER TABLE `issues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES ('2014_10_12_000000_create_users_table',1),('2014_10_12_100000_create_password_resets_table',1),('2016_01_13_103319_create_table_projects',1),('2016_01_13_134516_create_board_table',1),('2016_01_13_134516_create_sprints_table',1),('2016_01_26_073550_create_board_sprint_table',1),('2016_01_26_090315_create_tasks_table',1),('2016_01_28_053234_crate_table_project_user',1),('2016_04_11_122957_create_issues_table',1),('2016_04_18_082517_add_columns_to_tasks_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_user`
--

DROP TABLE IF EXISTS `project_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `project_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_user_project_id_foreign` (`project_id`),
  KEY `project_user_user_id_foreign` (`user_id`),
  CONSTRAINT `project_user_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `project_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_user`
--

LOCK TABLES `project_user` WRITE;
/*!40000 ALTER TABLE `project_user` DISABLE KEYS */;
INSERT INTO `project_user` VALUES (1,'0000-00-00 00:00:00','0000-00-00 00:00:00',1,1);
/*!40000 ALTER TABLE `project_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projects` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `priority` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'High',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'2016-04-18 03:16:44','2016-04-18 03:16:44','pms','','0000-00-00','0000-00-00','High'),(2,'2016-04-19 00:32:19','2016-04-19 00:32:19','1040 Federal Return ','','0000-00-00','0000-00-00','High');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sprints`
--

DROP TABLE IF EXISTS `sprints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sprints` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `duration` int(11) NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `project_id` int(10) unsigned NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `sprints_project_id_foreign` (`project_id`),
  CONSTRAINT `sprints_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sprints`
--

LOCK TABLES `sprints` WRITE;
/*!40000 ALTER TABLE `sprints` DISABLE KEYS */;
INSERT INTO `sprints` VALUES (1,'2016-04-18 03:16:44','2016-04-18 03:56:18','Backlog',NULL,NULL,0,'',1,1),(2,'2016-04-18 03:55:59','2016-04-18 03:56:18','First Sprint','2016-04-18 09:41:17','2016-05-02 09:41:17',14,'',1,5),(3,'2016-04-19 00:32:19','2016-04-19 00:32:19','Backlog',NULL,NULL,0,'',2,1);
/*!40000 ALTER TABLE `sprints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `order` int(11) NOT NULL,
  `priority` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'High',
  `task_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Task',
  `story_point` int(11) NOT NULL,
  `sprint_id` int(10) unsigned NOT NULL,
  `board_id` int(10) unsigned NOT NULL,
  `author_id` int(10) unsigned DEFAULT NULL,
  `reporter_id` int(10) unsigned DEFAULT NULL,
  `assigne_id` int(10) unsigned DEFAULT NULL,
  `project_id` int(10) unsigned NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `lft` int(11) DEFAULT NULL,
  `rgt` int(11) DEFAULT NULL,
  `depth` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tasks_sprint_id_foreign` (`sprint_id`),
  KEY `tasks_board_id_foreign` (`board_id`),
  KEY `tasks_author_id_foreign` (`author_id`),
  KEY `tasks_reporter_id_foreign` (`reporter_id`),
  KEY `tasks_assigne_id_foreign` (`assigne_id`),
  KEY `tasks_project_id_foreign` (`project_id`),
  CONSTRAINT `tasks_assigne_id_foreign` FOREIGN KEY (`assigne_id`) REFERENCES `users` (`id`),
  CONSTRAINT `tasks_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`),
  CONSTRAINT `tasks_board_id_foreign` FOREIGN KEY (`board_id`) REFERENCES `boards` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tasks_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `tasks_reporter_id_foreign` FOREIGN KEY (`reporter_id`) REFERENCES `users` (`id`),
  CONSTRAINT `tasks_sprint_id_foreign` FOREIGN KEY (`sprint_id`) REFERENCES `sprints` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (18,'2016-04-19 02:59:22','2016-04-19 03:30:22','Epic in 1040nr ','',0,'High','User Story',0,3,1,2,NULL,NULL,2,NULL,1,2,0),(19,'2016-04-19 03:31:13','2016-04-19 03:37:56','Story Board','',0,'High','Epic',0,1,1,2,NULL,NULL,1,NULL,3,14,0),(20,'2016-04-19 03:33:02','2016-04-19 03:33:02','Make hierarchical numbering of stories , epic , task etc.','',0,'High','User Story',0,1,1,2,NULL,NULL,1,19,4,5,1),(21,'2016-04-19 03:33:52','2016-04-19 03:33:52',' Change structure to WBS Story Board in sidebar.','',0,'High','Task',0,1,1,2,NULL,NULL,1,19,6,7,1),(22,'2016-04-19 03:34:46','2016-04-19 03:34:54','As a user i want to filter in story board based in types.','',0,'High','Task',0,1,1,2,NULL,NULL,1,19,8,9,1),(23,'2016-04-19 03:35:28','2016-04-19 03:37:56','Add tooltip in story board and other part.','',0,'High','Task',0,1,1,2,NULL,NULL,1,NULL,15,16,0),(24,'2016-04-19 03:36:08','2016-04-19 03:37:56','Image upload bug.','',0,'High','Task',0,1,1,2,NULL,NULL,1,NULL,17,18,0),(25,'2016-04-19 03:36:48','2016-04-19 03:37:56','Implemente log system (future implement)','',0,'High','User Story',0,1,1,2,NULL,NULL,1,NULL,19,20,0),(26,'2016-04-19 03:37:33','2016-04-19 03:37:33','Make menu show and hide by default','',0,'High','Task',0,1,1,2,NULL,NULL,1,19,10,11,1),(27,'2016-04-19 03:37:56','2016-04-19 03:37:56','Show story board only associated with project.','',0,'High','Task',0,1,1,2,NULL,NULL,1,19,12,13,1),(28,'2016-04-19 03:38:38','2016-04-19 03:38:38','Change backlog title to planning board.','',0,'High','Task',0,1,1,2,NULL,NULL,1,NULL,21,22,0),(29,'2016-04-19 03:39:25','2016-04-19 03:39:25','Active Board ','',0,'High','Epic',0,1,1,2,NULL,NULL,1,NULL,23,24,0),(30,'2016-04-19 03:39:54','2016-04-19 03:39:54','Change to do to active backlog','',0,'High','Task',0,1,1,2,NULL,NULL,1,NULL,25,26,0),(31,'2016-04-19 03:40:19','2016-04-19 03:40:19','Change the title of modal box to item','',0,'High','Task',0,1,1,2,NULL,NULL,1,NULL,27,28,0),(32,'2016-04-19 03:41:11','2016-04-19 03:42:42','Testing Board','',0,'High','Epic',0,1,1,2,NULL,NULL,1,NULL,29,34,0),(33,'2016-04-19 03:42:05','2016-04-19 03:42:14','Duplicte active board and rename to testing board.','',0,'High','Task',0,1,1,2,NULL,NULL,1,32,30,31,1),(34,'2016-04-19 03:42:42','2016-04-19 03:42:42','Rename to do to testing backlog','',0,'High','Task',0,1,1,2,NULL,NULL,1,32,32,33,1);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `image_url` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Janak','janakrajbhatta@gmail.com','$2y$10$1JLxKD4ongjBRthdF3FR2u88BXcu7lR/xXCvQMufn85U0qN2h2IoG',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',''),(2,'admin','admin@admin.com','$2y$10$UilE/eR0c10y1xRKpENkA.U/ufGNtWoeVhgJhMoonfLvyGd9GkHfO',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00','');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-04-19 15:15:41
