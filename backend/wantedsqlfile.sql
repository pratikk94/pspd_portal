-- MySQL dump 10.13  Distrib 5.7.24, for osx10.9 (x86_64)
--
-- Host: localhost    Database: website
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `link` varchar(255) NOT NULL,
  `type_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `type` (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (1,'HRMS BOL','HRMS for BOL','uploads/1708317149928-bg3.png','www.bg3.com',1),(2,'HRMS KOV','HRMS for KOV','uploads/1708317336596-bg3.png','www.kov.com',1),(3,'HRMS BCM','HR management tool','uploads/1708333006352-bg3.png','www.bg3.com',1),(4,'Guest House','Guest house services','uploads/1708332717070-bg3.png','guest_house.com',1),(5,'SAP password unlock or reset','Page to reset unlock SAP login password','uploads/1708332901732-bg3.png','sap_password.com',7),(6,'Holiday list','List of holidays','uploads/1708333059823-bg3.png','holiday_list.com',1),(7,'Secure File Transfer System','Application is used to transfer large files','uploads/1708333221008-bg3.png','sfts.com',7),(8,'IT support','Service desk home page','uploads/1708333275164-bg3.png','service_desk.com',7),(9,'Digi Docs','O365 based sharepoint site for SOP and Policy and department documents','uploads/1708333560820-bg3.png','digidocs.com',2),(10,'HRMS TRB','HR module, time and attendance, medical and Payroll processing','uploads/1708333676649-bg3.png','hrms_trb.com',1),(11,'IMS','Not provided','uploads/1708338937116-images-removebg-preview.png','ims.com',2),(12,'Service Desk','IT help desk tool for logging and monitoring of incidents and service requests across PSPD','uploads/1708333864237-bg3.png','service_desk.com',7),(13,'WebRFQ','An integrated application with SAP for receiving the RFQs a d posting for Quotations from vendors,Receiving quotes, comparative statement','uploads/1708334020986-bg3.png','webrfq.com',5),(14,'ERS','Employee reimbursements','uploads/1708334193546-bg3.png','ers.com',1),(15,'BCM HR helpdesk','Helpdesk','uploads/1708334247636-bg3.png','bcm_hr_helpdesk.com',1),(16,'BG Tracker','An utility to store bank guarantee information and send alerts to respective stakeholders on the expiry','uploads/1708334344899-bg3.png','bg_tracker.com',5),(17,'Business plan','Financial planning data capturing and processing for Bhadrachalam unit','uploads/1708334482033-bg3.png','business_plan.com',5),(18,'Gensuite Benchmark','Not provided ','uploads/1708334522889-bg3.png','gnsuite.com',4),(19,'Agreement Tracker','Not provided','uploads/1708334575526-bg3.png','agreement_tracker.com',5),(20,'ESP req form','An utility to capture the ESP\'s requirement at shopfloor and generate ESP requirements and reports','uploads/1708334784529-bg3.png','esp_req.com',9),(21,'Canteen Management','Cateen coupon booking system for ESP','uploads/1708334853000-bg3.png','canteen_management.com',1),(22,'Canteen Reader','Not provided ','uploads/1708334895870-bg3.png','canteen_reader.com',1),(23,'ADS password reset/unlock','Page to reset/unlock AD login passwords','uploads/1708334956662-bg3.png','ads_password.com',7),(24,'DVC digital initiative','Form to capture new Initiatives-ideas','uploads/1708335021666-bg3.png','DVC.com',7),(25,'Optivision','Optivisio is MES system used in Bhadrachalam and Bollaram. Tool has interfaces with shopfloor systems','uploads/1708335200583-bg3.png','optivision.com',9),(26,'PSPD vidyalaya','Intranet portal for induction training materials','uploads/1708335270089-bg3.png','vidyalaya.com',8),(27,'Bhadranet','knowledge portal','uploads/1708335409173-bg3.png','bhadranet.com',8),(28,'ENCON BCM','Not provided','uploads/1708335456703-images-removebg-preview.png','encon_bcm.com',4),(29,'CCTV DHQ Reception','CCTV capturing videos and storage','uploads/1708335516787-images-removebg-preview.png','cctv_dhq_reception.com',7),(30,'CCTV DHQ Ingate','CCTVcapturing videos and storage','uploads/1708335692576-images-removebg-preview.png','cctv_dhq_ingate.com',7),(31,'Pragati','An application to trigger workflow for various notes based on the committees like DMC scrap special','uploads/1708335792307-images-removebg-preview.png','pragati.com',6),(32,'TDS upload','Utility to send downloaded TDS certificates to respective vendors through e-mail','uploads/1708335875423-images-removebg-preview.png','tds_upload.com',5),(33,'ICoE','Industry 4.0 knowledge repository','uploads/1708335922681-images-removebg-preview.png','icoe.com',7),(34,'Bond Tracker','An application to store bond details and expiry alerts to the stakeholders and MIS reports','uploads/1708336028149-images-removebg-preview.png','bond_tracker.com',5),(35,'PSPD website','Divisional Website','uploads/1708336073223-images-removebg-preview.png','pspd.com',10),(36,'Papyra','Mobile app helps user to choose a right paper/ paperboard for packaging graphic or speciality','uploads/1708336180050-images-removebg-preview.png','papyra.com',10),(37,'App support ','Application support team - Contact Details','uploads/1708336258927-images-removebg-preview.png','app_support.com',7),(38,'OPS support','Operations support team - Contact Details','uploads/1708336318361-images-removebg-preview.png','ops_support.com',7),(39,'SAP  support ','SAP support team - Contact details and escalation','uploads/1708336540647-images-removebg-preview.png','sap_support.com',7),(40,'Audit Repository','Not provided ','uploads/1708336819618-images-removebg-preview.png','audit.com',2),(41,'Stock plus','Not provided ','uploads/1708336857275-images-removebg-preview.png','stock_plus.com',3),(42,'One IT collaboration portal','Not provided ','uploads/1708336972351-images-removebg-preview.png','oneit.com',3),(43,'ITC Store','Not provided ','uploads/1708337027138-images-removebg-preview.png','itcstore',3),(44,'Accrecon','Not provided','uploads/1708337096519-images-removebg-preview.png','accrecon.com',3),(45,'Learning curve','Not provided','uploads/1708337140495-images-removebg-preview.png','learning curve',3),(46,'Finance knowledge center','Not provided','uploads/1708337194207-images-removebg-preview.png','financeknowledgecenter.com',3),(47,'DRISHTI','Not provided','uploads/1708337250695-images-removebg-preview.png','drishti.com',3),(48,'ITC portal','ITC website','uploads/1708337306002-images-removebg-preview.png','itc.com',3),(49,'Corporate Treasury','Not provided','uploads/1708337527092-images-removebg-preview.png','ct.com',3),(50,'Fountain Head','Not provided','uploads/1708337567943-images-removebg-preview.png','fh.com',3),(51,'EHS','Not provided','uploads/1708337681607-images-removebg-preview.png','ehs.com',3),(52,'Tejas','Not provided ','uploads/1708337718437-images-removebg-preview.png','tejas.com',3),(53,'Forex','Not provided','uploads/1708337791004-images-removebg-preview.png','forex.com',3),(54,'Web Mail','Not provided','uploads/1708337851642-images-removebg-preview.png','webmail.com',3),(55,'ITC Infotech','Not provided','uploads/1708337881832-images-removebg-preview.png','itcinfotech.com',7),(56,'Hewitt Excelity','Not provided','uploads/1708338016221-images-removebg-preview.png','hewittexcelity',7),(57,'eClaim','Not provided','uploads/1708338048465-images-removebg-preview.png','eclaim.com',7),(58,'one point','Not provided','uploads/1708338084155-images-removebg-preview.png','onepoint.com',7),(59,'IM Policy Manual','Not provided','uploads/1708338269245-images-removebg-preview.png','impolicymanual.com',2),(60,'IM policy user confirmation','Not provided','uploads/1708338403081-images-removebg-preview.png','impolicyuserconfirmation.com',2),(61,'Annexure User Registration','Not provided','uploads/1708338525015-images-removebg-preview.png','annexureuserregistration.com',2),(62,'Folder Access Form','Not provided','uploads/1708338563754-images-removebg-preview.png','folderaccessform.com',2),(63,'EMP undertakig form','Not provided','uploads/1708338608549-images-removebg-preview.png','emp_undertaking_form.com',2),(64,'Self Service','Not provided','uploads/1708338642101-images-removebg-preview.png','selfservice.com',2),(65,'Perfex','Not provided','uploads/1708338693285-images-removebg-preview.png','perfex.com',2),(66,'SAP DB','Not provided','uploads/1708338722910-images-removebg-preview.png','Manual',2),(67,'Service Desk','Not provided','uploads/1708338770103-images-removebg-preview.png','manualservicedesk.pdf',2);
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `type` (
  `type_id` int NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) NOT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (1,'HR'),(2,'Compliance and Quality'),(3,'Corporate'),(4,'EHS'),(5,'Finance'),(6,'General'),(7,'IT'),(8,'L&D'),(9,'Manufacturing'),(10,'S&M');
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-19 16:28:48
