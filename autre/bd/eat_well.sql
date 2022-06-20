-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 15 juin 2022 à 12:35
-- Version du serveur :  8.0.26
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

DROP DATABASE IF EXISTS eat_well;
CREATE DATABASE IF NOT EXISTS eat_well;
USE eat_well;
--
-- Base de données : `eat_well`
--

#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: utilisateur
#------------------------------------------------------------

CREATE TABLE utilisateur(
        id     Int  Auto_increment  NOT NULL ,
        surnom Varchar (50) NOT NULL ,
        email  Varchar (100) NOT NULL ,
        mdp    Varchar (100) NOT NULL
	,CONSTRAINT utilisateur_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: ingredient
#------------------------------------------------------------

CREATE TABLE ingredient(
        id               Int  Auto_increment  NOT NULL ,
        nom              Varchar (100) NOT NULL ,
        categorie        Varchar (150) NOT NULL ,
        energie          Int NOT NULL ,
        lipide           Int NOT NULL ,
        sel              Float NOT NULL ,
        production_CO2   Float NOT NULL ,
        consommation_eau Int NOT NULL
	,CONSTRAINT ingredient_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: recette
#------------------------------------------------------------

CREATE TABLE recette(
        id          Int  Auto_increment  NOT NULL ,
        nom         Varchar (100) NOT NULL ,
        auteur      Varchar (100) NOT NULL ,
        tags        Longtext NOT NULL ,
        etapes      Longtext NOT NULL ,
        nrbPersonne Int NOT NULL ,
        temps_total Int NOT NULL ,
        temps_prepa Int NOT NULL
	,CONSTRAINT recette_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: ingredient_recette
#------------------------------------------------------------

CREATE TABLE ingredient_recette(
        id_recette            Int NOT NULL ,
        id_ingredient Int NOT NULL ,
        quantite      Float NOT NULL
	,CONSTRAINT ingredient_recette_PK PRIMARY KEY (id_recette,id_ingredient)

	,CONSTRAINT ingredient_recette_recette_FK FOREIGN KEY (id_recette) REFERENCES recette(id)
	,CONSTRAINT ingredient_recette_ingredient0_FK FOREIGN KEY (id_ingredient) REFERENCES ingredient(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: utilisateur_recette
#------------------------------------------------------------

CREATE TABLE utilisateur_recette(
        id_utilisateur         Int NOT NULL ,
        id_recette Int NOT NULL ,
        clique     Bool NOT NULL ,
        iteration  Int NOT NULL
	,CONSTRAINT utilisateur_recette_PK PRIMARY KEY (id_utilisateur,id_recette)

	,CONSTRAINT utilisateur_recette_utilisateur_FK FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id)
	,CONSTRAINT utilisateur_recette_recette0_FK FOREIGN KEY (id_recette) REFERENCES recette(id)
)ENGINE=InnoDB;

