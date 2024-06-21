-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: authentication
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `consulta`
--

DROP TABLE IF EXISTS consulta;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE consulta (
  id int NOT NULL AUTO_INCREMENT,
  id_paciente varchar(45) NOT NULL,
  `data` date NOT NULL,
  id_medicos varchar(45) NOT NULL,
  farmacos_cons varchar(45) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY id_UNIQUE (id),
  KEY id_consulta_med_idx (id_medicos),
  KEY id_consulta_pac_idx (id_paciente),
  KEY far_cons_idx (farmacos_cons),
  CONSTRAINT id_consulta_med FOREIGN KEY (id_medicos) REFERENCES users (username),
  CONSTRAINT id_consulta_pac FOREIGN KEY (id_paciente) REFERENCES users (username)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consulta`
--

LOCK TABLES consulta WRITE;
/*!40000 ALTER TABLE consulta DISABLE KEYS */;
INSERT INTO consulta VALUES (28,'Rui','2024-11-18','maria',NULL);
/*!40000 ALTER TABLE consulta ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empregados`
--

DROP TABLE IF EXISTS empregados;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE empregados (
  id int NOT NULL AUTO_INCREMENT,
  empregadosname varchar(45) NOT NULL,
  data_de_nascimento date DEFAULT NULL,
  Contacto varchar(45) DEFAULT NULL,
  Email varchar(45) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY id_employees_UNIQUE (id),
  KEY id_empregados_idx (empregadosname),
  CONSTRAINT id_empregados FOREIGN KEY (empregadosname) REFERENCES users (username)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empregados`
--

LOCK TABLES empregados WRITE;
/*!40000 ALTER TABLE empregados DISABLE KEYS */;
INSERT INTO empregados VALUES (1,'Maria','2000-12-18','956 783 676','mariamedica@gmail.com');
/*!40000 ALTER TABLE empregados ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `farmacos`
--

DROP TABLE IF EXISTS farmacos;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE farmacos (
  id int NOT NULL,
  nome varchar(45) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY id_UNIQUE (id),
  UNIQUE KEY nome_UNIQUE (nome)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farmacos`
--

LOCK TABLES farmacos WRITE;
/*!40000 ALTER TABLE farmacos DISABLE KEYS */;
INSERT INTO farmacos VALUES (1,'Algimate'),(2,'Avodart'),(3,'Carzap AM'),(4,'Casenlax'),(5,'CitraFleet'),(6,'Cloxam'),(7,'Colchicine'),(8,'Combodart'),(9,'Duagen'),(10,'Egostar'),(11,'Eligard'),(12,'Enerzair'),(13,'Jaba'),(14,'Livazo'),(15,'Phospho-soda'),(16,'Reagila'),(17,'Salazopirina EN'),(18,'Seractil'),(19,'Ulcermin'),(20,'Urispás'),(21,'Urorec'),(22,'Utrogestan'),(23,'Vitaros'),(24,'Zanidip'),(25,'Zanipress');
/*!40000 ALTER TABLE farmacos ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pacientes`
--

DROP TABLE IF EXISTS pacientes;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE pacientes (
  id int NOT NULL AUTO_INCREMENT,
  pacientename varchar(45) NOT NULL,
  genero varchar(45) DEFAULT NULL,
  Nome_Completo varchar(45) DEFAULT NULL,
  Contacto varchar(45) DEFAULT NULL,
  Morada varchar(45) DEFAULT NULL,
  data_de_nascimento date DEFAULT NULL,
  email varchar(45) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY idPacientes_UNIQUE (id),
  UNIQUE KEY pacientename_UNIQUE (pacientename),
  KEY id_idx (pacientename),
  CONSTRAINT id_pac_user FOREIGN KEY (pacientename) REFERENCES users (username)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pacientes`
--

LOCK TABLES pacientes WRITE;
/*!40000 ALTER TABLE pacientes DISABLE KEYS */;
INSERT INTO pacientes VALUES (115,'Suzana','Feminino','Suzana Raposo','999999999','Ruas das Baleias,Macau','1990-06-17','suzanaraposo@gmail.com'),(117,'Rui','Masculino','Rui Tavares','975 784 736','Rua dos Camelos,Sintra','1975-10-18','ruitavares@gmail.com');
/*!40000 ALTER TABLE pacientes ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS users;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(20) NOT NULL,
  `password` varchar(500) NOT NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY id_UNIQUE (id),
  UNIQUE KEY username_UNIQUE (username)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES users WRITE;
/*!40000 ALTER TABLE users DISABLE KEYS */;
INSERT INTO users VALUES (11,'admin','$2b$10$fbR.Igtcpzd7dRCX9qZR6.QMvBJ/Xp8MqMx4PIC.XNCZeTPqsAZLW','admin'),(89,'Suzana','$2b$10$4QWk88XnjYPIDcASAf/IY.sebpCG8CZXVmIBoYLdvDUyncZRB5lHC','paciente'),(96,'Maria','$2b$10$uK/SW3DeUb6TKd3hE3ZgWeL1nKQ6TXSROoBeCwy0G6iF6qDblE5em','medico'),(97,'Rui','$2b$10$LzN.U7qsOXAzpOTafjeCS.EoGPuHvpHbGoYsEs4t/dJK3UMc5V836','paciente');
/*!40000 ALTER TABLE users ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-21 15:16:27
