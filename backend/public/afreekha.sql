-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mer. 28 mai 2025 à 15:17
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `afreekha`
--

-- --------------------------------------------------------

--
-- Structure de la table `Adresse`
--

CREATE TABLE `Adresse` (
  `idAdresse` int(11) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `pays` varchar(255) NOT NULL DEFAULT '120',
  `etat` varchar(255) NOT NULL,
  `ville` varchar(255) NOT NULL,
  `numero_telephone` varchar(255) NOT NULL,
  `idUser` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `titre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Adresse`
--

INSERT INTO `Adresse` (`idAdresse`, `adresse`, `pays`, `etat`, `ville`, `numero_telephone`, `idUser`, `createdAt`, `updatedAt`, `titre`) VALUES
(1, 'Dakar-Mont-febe, college les delices', '120', '4000', 'Douala', '698403201', 1, '2025-04-03 21:54:56', '2025-04-16 08:18:55', 'Nouvelle Maison'),
(4, 'New Bell Camp', '120', '4000', 'Douala', '698403201', 1, '2025-04-16 07:41:08', '2025-04-16 07:41:08', 'New Home'),
(5, 'live', '120', '649', 'Ngaoundere', '698403201', 3, '2025-04-20 09:58:02', '2025-04-20 09:58:02', 'Malibu'),
(6, 'Gare', '120', '653', 'Ebolowa', '698403201', 3, '2025-04-20 10:03:44', '2025-04-20 10:03:44', 'CJ Home'),
(7, 'Mfou', '120', '647', 'yaounde', '698403201', 3, '2025-04-20 10:22:59', '2025-04-20 10:22:59', 'Opera'),
(8, 'Kasac', '616', '2738', 'Varsovic', '654229770', 5, '2025-04-22 01:19:36', '2025-04-22 01:19:36', 'Me Hme'),
(9, 'KEIS SOUTH', '120', '654', 'Bamenda', '683094700', 9, '2025-04-22 11:45:40', '2025-04-22 11:45:40', 'Old Home');

-- --------------------------------------------------------

--
-- Structure de la table `articles`
--

CREATE TABLE `articles` (
  `idArticle` int(11) NOT NULL,
  `nom_article` varchar(255) NOT NULL,
  `prix` float NOT NULL,
  `promo` tinyint(1) NOT NULL DEFAULT 0,
  `quantite` float NOT NULL DEFAULT 1,
  `caracteristiques` varchar(255) NOT NULL,
  `pourcentage_promo` float DEFAULT NULL,
  `marque` varchar(255) DEFAULT NULL,
  `garantie` varchar(255) DEFAULT NULL,
  `idCategorie` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `couleur` varchar(255) DEFAULT NULL,
  `taille` varchar(255) DEFAULT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `inTrend` tinyint(1) NOT NULL DEFAULT 0,
  `statut` varchar(255) NOT NULL DEFAULT 'En stock',
  `quantite_critique` int(11) NOT NULL DEFAULT 5,
  `idSousCategorie` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `articles`
--

INSERT INTO `articles` (`idArticle`, `nom_article`, `prix`, `promo`, `quantite`, `caracteristiques`, `pourcentage_promo`, `marque`, `garantie`, `idCategorie`, `createdAt`, `updatedAt`, `couleur`, `taille`, `featured`, `inTrend`, `statut`, `quantite_critique`, `idSousCategorie`) VALUES
(2, 'Pentalon', 3000, 0, 16, 'Elancé de couleur noir', 20, NULL, ' 3 mois', 1, '2025-03-06 13:46:44', '2025-04-29 22:39:44', NULL, NULL, 0, 0, 'En stock', 5, NULL),
(3, 'Pentalon', 3000, 0, 14, 'Elancé de couleur noir', 20, NULL, ' 3 mois', 1, '2025-03-06 13:49:02', '2025-04-20 10:49:38', NULL, NULL, 0, 0, 'En stock', 5, NULL),
(4, 'Pentalon', 3000, 0, 16, 'Elancé de couleur noir', 20, NULL, ' 3 mois', 1, '2025-03-06 13:50:14', '2025-03-26 12:39:34', NULL, NULL, 0, 0, 'En stock', 5, NULL),
(5, 'Chemise', 3000, 0, 10, 'Elancé de couleur rose', 15, NULL, ' 3 mois', 1, '2025-03-06 13:52:30', '2025-04-21 23:42:46', NULL, NULL, 0, 0, 'En stock', 5, NULL),
(6, 'Jeans', 7000, 0, 20, 'Elancé de couleur rose', 15, NULL, ' 3 mois', 1, '2025-03-06 13:55:31', '2025-03-06 13:55:31', NULL, NULL, 0, 0, 'En stock', 5, NULL),
(7, 'Debardeur', 3400, 0, 18, 'Elancé de couleur rose', 15, NULL, ' 3 mois', 1, '2025-03-06 13:57:33', '2025-04-20 08:45:55', NULL, NULL, 0, 0, 'En stock', 5, NULL),
(8, 'T-shirt', 3400, 0, 20, 'Elancé de couleur rose', 15, NULL, ' 3 mois', 1, '2025-03-06 13:59:05', '2025-03-06 13:59:05', NULL, NULL, 0, 0, 'En stock', 5, NULL),
(9, 'Jaket', 3400, 0, 20, 'Elancé de couleur rose', 15, NULL, ' 3 mois', 1, '2025-03-06 14:00:08', '2025-03-06 14:00:08', NULL, NULL, 0, 0, 'En stock', 5, NULL),
(10, 'Jaket', 3400, 0, 20, 'Elancé de couleur rose', 15, NULL, ' 3 mois', 1, '2025-03-06 14:02:02', '2025-03-06 14:02:02', NULL, NULL, 0, 0, 'En stock', 5, NULL),
(11, 'Chapeux', 3400, 0, 20, 'Elancé de couleur rose', 15, NULL, ' 3 mois', 1, '2025-03-06 14:02:18', '2025-03-06 14:02:18', NULL, NULL, 0, 0, 'En stock', 5, NULL),
(12, 'Short', 700, 0, 20, 'Elancé de couleur rose', 15, NULL, ' 3 mois', 1, '2025-03-06 14:10:29', '2025-03-06 14:10:29', NULL, NULL, 0, 0, 'En stock', 5, NULL),
(13, 'Mailoot', 700, 0, 12, 'Elancé de couleur rose', 15, NULL, ' 3 mois', 1, '2025-03-06 14:12:53', '2025-03-27 06:59:50', NULL, NULL, 0, 0, 'En stock', 5, NULL),
(14, 'Mailoot', 700, 0, 20, 'Elancé de couleur rose', 15, NULL, ' 3 mois', 1, '2025-03-06 14:15:36', '2025-03-06 14:15:36', NULL, NULL, 0, 0, 'En stock', 5, NULL),
(15, 'Mailoot', 700, 1, 20, 'Elancé de couleur rose', 15, NULL, ' 3 mois', 1, '2025-03-06 14:16:20', '2025-03-06 14:16:20', NULL, NULL, 0, 0, 'En stock', 5, NULL),
(16, 'Blousson', 7000, 0, 17, 'Elancé de couleur rose', 15, NULL, ' 3 mois', 1, '2025-03-06 14:18:08', '2025-04-21 23:42:46', NULL, NULL, 0, 0, 'En stock', 5, NULL),
(17, 'Blousson', 7000, 1, 16, 'Elancé de couleur rose', 15, NULL, ' 3 mois', 1, '2025-03-06 14:21:08', '2025-04-29 22:02:22', NULL, NULL, 0, 0, 'En stock', 5, NULL),
(18, 'Chemise', 7000, 0, 20, 'Elancé de couleur rose', 15, NULL, ' 3 mois', 1, '2025-03-07 08:37:08', '2025-04-29 21:57:59', NULL, NULL, 0, 0, 'En stock', 5, NULL),
(22, 'Redmi', 65000, 1, 1, 'Ram 8GO, 10\' Couleur = Blanc', 10, NULL, '1 an', 2, '2025-03-28 08:02:57', '2025-04-29 22:06:35', NULL, NULL, 0, 0, 'En stock', 5, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `article_image`
--

CREATE TABLE `article_image` (
  `idArticleImage` int(11) NOT NULL,
  `idArticle` int(11) NOT NULL,
  `idImage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `article_image`
--

INSERT INTO `article_image` (`idArticleImage`, `idArticle`, `idImage`) VALUES
(13, 2, 14),
(1, 3, 5),
(9, 5, 5),
(11, 7, 5),
(12, 9, 5),
(8, 11, 6),
(6, 16, 6),
(7, 17, 6),
(10, 18, 6),
(2, 22, 4),
(3, 22, 5),
(4, 22, 6),
(5, 22, 7);

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `idCategorie` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `idUser` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `urlLogo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`idCategorie`, `nom`, `idUser`, `createdAt`, `updatedAt`, `urlLogo`) VALUES
(1, 'Vetements', 1, '2025-03-06 14:45:35', '2025-03-06 14:45:35', NULL),
(2, 'Appareil Electronique', 1, '2025-03-28 07:43:50', '2025-03-28 07:43:50', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `commandes`
--

CREATE TABLE `commandes` (
  `idCommande` int(11) NOT NULL,
  `Montant_total` float NOT NULL,
  `quantite_articles` float NOT NULL,
  `statut` varchar(255) NOT NULL DEFAULT 'En attente',
  `idUser` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `idAdresse` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commandes`
--

INSERT INTO `commandes` (`idCommande`, `Montant_total`, `quantite_articles`, `statut`, `idUser`, `createdAt`, `updatedAt`, `idAdresse`) VALUES
(1, 34000, 1, 'payé', 1, '2025-03-07 10:14:50', '2025-04-29 22:06:18', 4),
(2, 36000, 3, 'payé', 1, '2025-03-26 12:39:34', '2025-03-26 12:39:34', 4),
(5, 371800, 6, 'payé', 1, '2025-04-19 19:38:45', '2025-04-29 22:07:59', 1),
(6, 371800, 6, 'payé', 1, '2025-04-20 08:45:55', '2025-04-20 08:45:55', 1),
(7, 3000, 1, 'payé', 3, '2025-04-20 10:49:38', '2025-04-20 10:49:38', 6),
(8, 58500, 1, 'payé', 3, '2025-04-20 10:59:11', '2025-04-20 10:59:11', 6),
(9, 13000, 2, 'payé', 1, '2025-04-21 23:42:46', '2025-04-21 23:42:46', 4),
(10, 1053000, 1, 'payé', 5, '2025-04-22 01:19:44', '2025-04-22 01:19:44', 8);

-- --------------------------------------------------------

--
-- Structure de la table `commandes_articles`
--

CREATE TABLE `commandes_articles` (
  `idCommandArticle` int(11) NOT NULL,
  `idCommande` int(11) NOT NULL,
  `idArticle` int(11) NOT NULL,
  `quantite` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `prix_achat` int(11) NOT NULL,
  `prix_total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commandes_articles`
--

INSERT INTO `commandes_articles` (`idCommandArticle`, `idCommande`, `idArticle`, `quantite`, `createdAt`, `updatedAt`, `prix_achat`, `prix_total`) VALUES
(1, 1, 10, 10, '2025-03-07 10:16:30', '2025-03-07 10:16:30', 0, 0),
(2, 2, 2, 4, '2025-03-26 12:39:34', '2025-03-26 12:39:34', 0, 0),
(3, 2, 3, 4, '2025-03-26 12:39:34', '2025-03-26 12:39:34', 0, 0),
(4, 2, 4, 4, '2025-03-26 12:39:34', '2025-03-26 12:39:34', 0, 0),
(7, 5, 22, 5, '2025-04-19 19:38:45', '2025-04-19 19:38:45', 0, 0),
(8, 5, 17, 2, '2025-04-19 19:38:45', '2025-04-19 19:38:45', 0, 0),
(9, 5, 5, 4, '2025-04-19 19:38:45', '2025-04-19 19:38:45', 0, 0),
(10, 5, 3, 15, '2025-04-19 19:38:45', '2025-04-19 19:38:45', 0, 0),
(11, 5, 7, 1, '2025-04-19 19:38:45', '2025-04-19 19:38:45', 0, 0),
(12, 5, 16, 1, '2025-04-19 19:38:45', '2025-04-19 19:38:45', 0, 0),
(13, 6, 22, 5, '2025-04-20 08:45:55', '2025-04-20 08:45:55', 0, 0),
(14, 6, 17, 2, '2025-04-20 08:45:55', '2025-04-20 08:45:55', 0, 0),
(15, 6, 5, 4, '2025-04-20 08:45:55', '2025-04-20 08:45:55', 0, 0),
(16, 6, 3, 15, '2025-04-20 08:45:55', '2025-04-20 08:45:55', 0, 0),
(17, 6, 7, 1, '2025-04-20 08:45:55', '2025-04-20 08:45:55', 0, 0),
(18, 6, 16, 1, '2025-04-20 08:45:55', '2025-04-20 08:45:55', 0, 0),
(19, 7, 3, 1, '2025-04-20 10:49:38', '2025-04-20 10:49:38', 0, 0),
(20, 8, 22, 1, '2025-04-20 10:59:11', '2025-04-20 10:59:11', 0, 0),
(21, 9, 5, 2, '2025-04-21 23:42:46', '2025-04-21 23:42:46', 0, 0),
(22, 9, 16, 1, '2025-04-21 23:42:46', '2025-04-21 23:42:46', 0, 0),
(23, 10, 22, 18, '2025-04-22 01:19:44', '2025-04-22 01:19:44', 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `images`
--

CREATE TABLE `images` (
  `idImage` int(11) NOT NULL,
  `lien` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `inTrend` tinyint(1) NOT NULL DEFAULT 0,
  `collection` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `images`
--

INSERT INTO `images` (`idImage`, `lien`, `createdAt`, `updatedAt`, `featured`, `inTrend`, `collection`, `position`) VALUES
(2, 'http://localhost:3001/imgs/772b3013-048c-4b2a-aa05-0d535d61d939.jpg', '2025-03-26 05:46:50', '2025-04-20 22:04:58', 0, 0, 'Appareil Electronique', NULL),
(4, 'http://localhost:3001/imgs/9dd07808-95ba-4d44-a972-995dd9a09655.jpg', '2025-03-28 07:30:25', '2025-03-28 07:30:25', 1, 0, 'Appareil Electronique', 'MAIN_TWO_PIC'),
(5, 'http://localhost:3001/imgs/00a60cca-1cee-468d-8f52-54924ee9bc53.jpg', '2025-03-28 07:31:19', '2025-03-28 07:31:19', 1, 1, 'Appareil Electronique', 'MAIN_TWO_PIC'),
(6, 'http://localhost:3001/imgs/eb82c2d5-2439-4762-a4aa-4af8b413f98a.jpg', '2025-03-28 07:32:04', '2025-03-28 07:32:04', 1, 1, 'Appareil Electronique', 'SLIDER'),
(7, 'http://localhost:3001/imgs/ed8d82f8-7e45-43eb-b2db-652f0cfea662.jpg', '2025-03-28 07:32:39', '2025-03-28 07:32:39', 1, 0, 'Appareil Electronique', 'SLIDER'),
(8, 'http://localhost:3001/imgs/333c5886-a0cc-47ea-9900-1649c837bc56.jpg', '2025-04-20 22:04:58', '2025-04-20 22:04:58', 1, 0, 'Appareil Electronique', 'MAIN_BANNER'),
(9, 'http://localhost:3001/imgs/c3870996-0053-466d-9e17-59a95d7b2b4d.jpg', '2025-04-20 22:14:58', '2025-04-20 22:14:58', 1, 0, 'Appareil Electronique', 'SIDE'),
(10, 'http://localhost:3001/imgs/25581762-8ea5-494c-a003-13cb7536c314.jpg', '2025-04-20 22:16:00', '2025-04-20 22:16:00', 1, 0, 'Appareil Electronique', 'SIDE'),
(11, 'http://localhost:3001/imgs/7b8255bb-cb78-41f4-ad47-b1f040a620c6.jpg', '2025-04-20 22:17:06', '2025-04-20 22:17:06', 1, 0, 'Appareil Electronique', 'SLIDER'),
(12, 'http://localhost:3001/imgs/76099c6d-dee3-4194-81d9-7c944d9ea198.jpg', '2025-04-20 22:19:30', '2025-04-20 22:19:30', 1, 0, 'Appareil Electronique', 'SLIDER'),
(13, 'http://localhost:3001/imgs/bd65e77b-e585-459e-84b6-229346afb3ff.jpg', '2025-04-20 22:20:12', '2025-04-20 22:20:12', 1, 0, 'Appareil Electronique', 'SLIDER'),
(14, 'http://localhost:3001/imgs/c1de7b20-2990-488e-924c-a63877616204.jpg', '2025-04-23 11:55:48', '2025-04-23 11:55:48', 0, 0, NULL, NULL),
(18, 'http://localhost:3001/imgs/347b9209-29ed-48f5-bdc9-1bdaa0f13322.jpg', '2025-04-28 11:41:00', '2025-04-28 11:41:00', 0, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `idMessage` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `contenus` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `paiements`
--

CREATE TABLE `paiements` (
  `idPaiement` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `montant` float NOT NULL,
  `methodePaiement` varchar(255) NOT NULL,
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `idRole` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `nom` varchar(255) NOT NULL DEFAULT 'client'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`idRole`, `createdAt`, `updatedAt`, `nom`) VALUES
(1, '2025-04-28 10:50:46', '2025-04-28 10:50:46', 'admin'),
(2, '2025-04-28 22:40:34', '2025-04-28 22:40:34', 'client');

-- --------------------------------------------------------

--
-- Structure de la table `sous_categories`
--

CREATE TABLE `sous_categories` (
  `idSousCategorie` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `idCategorie` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `sous_categories`
--

INSERT INTO `sous_categories` (`idSousCategorie`, `nom`, `idCategorie`) VALUES
(1, 'Veste', 1);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `idUser` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `date_naissance` datetime DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `tel` varchar(255) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `resetToken` varchar(255) DEFAULT NULL,
  `resetTokenExpires` datetime DEFAULT NULL,
  `country_code` varchar(255) NOT NULL DEFAULT '237'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`idUser`, `nom`, `prenom`, `date_naissance`, `email`, `tel`, `mot_de_passe`, `createdAt`, `updatedAt`, `resetToken`, `resetTokenExpires`, `country_code`) VALUES
(1, 'Delice Ng', 'Cleam', '2015-03-11 14:44:22', 'franzdeussom111@gmail.com', '698059286', '$2b$10$jjQrGA36H.qDiHQ1yvqR0OQo1Z10YRlbnB9KkiWhTZrM1mc2mXzMS', '2025-03-06 14:44:22', '2025-05-26 01:52:14', NULL, NULL, '237'),
(3, 'Dems New', 'Krils', '2025-04-16 00:00:00', 'dems@gmail.com', '698403201', '$2b$10$mMmssTx3dwLOkGX2LKmni.eioPdAcN9.rKZvb7S5B5npc5NNoLeJO', '2025-04-19 09:48:51', '2025-04-19 09:48:51', NULL, NULL, '237'),
(5, 'Bastia', 'Anecy', '2025-04-22 00:00:00', 'bastia@gmail.com', '698403202', '$2b$10$h3tZu6PvsfOuUMHMs5fzx.u4bZtXwH./kzDS8TJ6EA.vpUypmVG/m', '2025-04-22 01:12:12', '2025-04-22 01:12:12', NULL, NULL, '237'),
(9, 'Kraf', 'Nested', '2025-04-03 00:00:00', 'kraf@gmail.com', '6878898830', '$2b$10$47hAh6OUD4DvPNofJCBmPenfH/Zyl0m8Pg.09vUfh4ruh5/qxCPwq', '2025-04-22 11:15:53', '2025-04-22 11:15:53', NULL, NULL, '237'),
(16, 'Last', 'test', '2025-04-16 00:00:00', 'test@gmail.com', '667890889', '$2b$10$/WSWEsxC9qTKAZp5unt7D.FbwlYKoyPrdGVrYirQMUiEu58S8cZYq', '2025-04-28 23:43:32', '2025-04-29 10:09:52', NULL, NULL, '237');

-- --------------------------------------------------------

--
-- Structure de la table `users_roles`
--

CREATE TABLE `users_roles` (
  `idUserRole` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idRole` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users_roles`
--

INSERT INTO `users_roles` (`idUserRole`, `idUser`, `idRole`) VALUES
(1, 1, 1),
(14, 16, 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Adresse`
--
ALTER TABLE `Adresse`
  ADD PRIMARY KEY (`idAdresse`),
  ADD KEY `idx_user` (`idUser`);

--
-- Index pour la table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`idArticle`),
  ADD KEY `idCategorie` (`idCategorie`),
  ADD KEY `idSousCategorie` (`idSousCategorie`);

--
-- Index pour la table `article_image`
--
ALTER TABLE `article_image`
  ADD PRIMARY KEY (`idArticleImage`),
  ADD UNIQUE KEY `article_image_idImage_idArticle_unique` (`idArticle`,`idImage`),
  ADD KEY `idImage` (`idImage`);

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`idCategorie`),
  ADD UNIQUE KEY `nom` (`nom`),
  ADD UNIQUE KEY `nom_2` (`nom`),
  ADD UNIQUE KEY `nom_3` (`nom`),
  ADD UNIQUE KEY `nom_4` (`nom`),
  ADD UNIQUE KEY `nom_5` (`nom`),
  ADD UNIQUE KEY `nom_6` (`nom`),
  ADD UNIQUE KEY `nom_7` (`nom`),
  ADD UNIQUE KEY `nom_8` (`nom`),
  ADD UNIQUE KEY `nom_9` (`nom`),
  ADD UNIQUE KEY `nom_10` (`nom`),
  ADD UNIQUE KEY `nom_11` (`nom`),
  ADD UNIQUE KEY `nom_12` (`nom`),
  ADD UNIQUE KEY `nom_13` (`nom`),
  ADD UNIQUE KEY `nom_14` (`nom`),
  ADD UNIQUE KEY `nom_15` (`nom`),
  ADD UNIQUE KEY `nom_16` (`nom`),
  ADD UNIQUE KEY `nom_17` (`nom`),
  ADD UNIQUE KEY `nom_18` (`nom`),
  ADD UNIQUE KEY `nom_19` (`nom`),
  ADD UNIQUE KEY `nom_20` (`nom`),
  ADD UNIQUE KEY `nom_21` (`nom`),
  ADD UNIQUE KEY `nom_22` (`nom`),
  ADD UNIQUE KEY `nom_23` (`nom`),
  ADD UNIQUE KEY `nom_24` (`nom`),
  ADD UNIQUE KEY `nom_25` (`nom`),
  ADD UNIQUE KEY `nom_26` (`nom`),
  ADD UNIQUE KEY `nom_27` (`nom`),
  ADD UNIQUE KEY `nom_28` (`nom`),
  ADD UNIQUE KEY `nom_29` (`nom`),
  ADD UNIQUE KEY `nom_30` (`nom`),
  ADD UNIQUE KEY `nom_31` (`nom`),
  ADD UNIQUE KEY `nom_32` (`nom`),
  ADD UNIQUE KEY `nom_33` (`nom`),
  ADD UNIQUE KEY `nom_34` (`nom`),
  ADD UNIQUE KEY `nom_35` (`nom`),
  ADD UNIQUE KEY `nom_36` (`nom`),
  ADD UNIQUE KEY `nom_37` (`nom`),
  ADD UNIQUE KEY `nom_38` (`nom`),
  ADD UNIQUE KEY `nom_39` (`nom`),
  ADD UNIQUE KEY `nom_40` (`nom`),
  ADD UNIQUE KEY `nom_41` (`nom`),
  ADD UNIQUE KEY `nom_42` (`nom`),
  ADD UNIQUE KEY `nom_43` (`nom`),
  ADD UNIQUE KEY `nom_44` (`nom`),
  ADD UNIQUE KEY `nom_45` (`nom`),
  ADD UNIQUE KEY `nom_46` (`nom`),
  ADD KEY `idUser` (`idUser`);

--
-- Index pour la table `commandes`
--
ALTER TABLE `commandes`
  ADD PRIMARY KEY (`idCommande`),
  ADD KEY `idx_user` (`idUser`),
  ADD KEY `idAdresse` (`idAdresse`);

--
-- Index pour la table `commandes_articles`
--
ALTER TABLE `commandes_articles`
  ADD PRIMARY KEY (`idCommandArticle`),
  ADD UNIQUE KEY `commandes_articles_idArticle_idCommande_unique` (`idCommande`,`idArticle`),
  ADD KEY `idx_commande_article` (`idCommande`,`idArticle`),
  ADD KEY `idArticle` (`idArticle`);

--
-- Index pour la table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`idImage`);

--
-- Index pour la table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`idMessage`),
  ADD KEY `idUser` (`idUser`);

--
-- Index pour la table `paiements`
--
ALTER TABLE `paiements`
  ADD PRIMARY KEY (`idPaiement`),
  ADD KEY `idUser` (`idUser`);

--
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idRole`);

--
-- Index pour la table `sous_categories`
--
ALTER TABLE `sous_categories`
  ADD PRIMARY KEY (`idSousCategorie`),
  ADD UNIQUE KEY `nom` (`nom`),
  ADD UNIQUE KEY `nom_2` (`nom`),
  ADD UNIQUE KEY `nom_3` (`nom`),
  ADD UNIQUE KEY `nom_4` (`nom`),
  ADD UNIQUE KEY `nom_5` (`nom`),
  ADD UNIQUE KEY `nom_6` (`nom`),
  ADD UNIQUE KEY `nom_7` (`nom`),
  ADD UNIQUE KEY `nom_8` (`nom`),
  ADD UNIQUE KEY `nom_9` (`nom`),
  ADD UNIQUE KEY `nom_10` (`nom`),
  ADD UNIQUE KEY `nom_11` (`nom`),
  ADD UNIQUE KEY `nom_12` (`nom`),
  ADD UNIQUE KEY `nom_13` (`nom`),
  ADD UNIQUE KEY `nom_14` (`nom`),
  ADD UNIQUE KEY `nom_15` (`nom`),
  ADD UNIQUE KEY `nom_16` (`nom`),
  ADD UNIQUE KEY `nom_17` (`nom`),
  ADD UNIQUE KEY `nom_18` (`nom`),
  ADD UNIQUE KEY `nom_19` (`nom`),
  ADD UNIQUE KEY `nom_20` (`nom`),
  ADD UNIQUE KEY `nom_21` (`nom`),
  ADD UNIQUE KEY `nom_22` (`nom`),
  ADD UNIQUE KEY `nom_23` (`nom`),
  ADD UNIQUE KEY `nom_24` (`nom`),
  ADD UNIQUE KEY `nom_25` (`nom`),
  ADD UNIQUE KEY `nom_26` (`nom`),
  ADD UNIQUE KEY `nom_27` (`nom`),
  ADD UNIQUE KEY `nom_28` (`nom`),
  ADD UNIQUE KEY `nom_29` (`nom`),
  ADD UNIQUE KEY `nom_30` (`nom`),
  ADD UNIQUE KEY `nom_31` (`nom`),
  ADD UNIQUE KEY `nom_32` (`nom`),
  ADD UNIQUE KEY `nom_33` (`nom`),
  ADD UNIQUE KEY `nom_34` (`nom`),
  ADD UNIQUE KEY `nom_35` (`nom`),
  ADD UNIQUE KEY `nom_36` (`nom`),
  ADD UNIQUE KEY `nom_37` (`nom`),
  ADD UNIQUE KEY `nom_38` (`nom`),
  ADD UNIQUE KEY `nom_39` (`nom`),
  ADD UNIQUE KEY `nom_40` (`nom`),
  ADD UNIQUE KEY `nom_41` (`nom`),
  ADD UNIQUE KEY `nom_42` (`nom`),
  ADD UNIQUE KEY `nom_43` (`nom`),
  ADD UNIQUE KEY `nom_44` (`nom`),
  ADD UNIQUE KEY `nom_45` (`nom`),
  ADD KEY `idCategorie` (`idCategorie`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `tel_13` (`tel`),
  ADD UNIQUE KEY `tel` (`tel`),
  ADD UNIQUE KEY `tel_7` (`tel`),
  ADD UNIQUE KEY `tel_8` (`tel`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `tel_9` (`tel`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `tel_10` (`tel`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `tel_11` (`tel`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `tel_12` (`tel`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `tel_2` (`tel`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `tel_3` (`tel`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `tel_4` (`tel`);

--
-- Index pour la table `users_roles`
--
ALTER TABLE `users_roles`
  ADD PRIMARY KEY (`idUserRole`),
  ADD UNIQUE KEY `users_roles_idRole_idUser_unique` (`idUser`,`idRole`),
  ADD KEY `idx_user_role` (`idUser`,`idRole`),
  ADD KEY `idRole` (`idRole`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Adresse`
--
ALTER TABLE `Adresse`
  MODIFY `idAdresse` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `articles`
--
ALTER TABLE `articles`
  MODIFY `idArticle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `article_image`
--
ALTER TABLE `article_image`
  MODIFY `idArticleImage` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `idCategorie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `commandes`
--
ALTER TABLE `commandes`
  MODIFY `idCommande` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `commandes_articles`
--
ALTER TABLE `commandes_articles`
  MODIFY `idCommandArticle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `images`
--
ALTER TABLE `images`
  MODIFY `idImage` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `idMessage` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `paiements`
--
ALTER TABLE `paiements`
  MODIFY `idPaiement` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `idRole` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `sous_categories`
--
ALTER TABLE `sous_categories`
  MODIFY `idSousCategorie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `users_roles`
--
ALTER TABLE `users_roles`
  MODIFY `idUserRole` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Adresse`
--
ALTER TABLE `Adresse`
  ADD CONSTRAINT `Adresse_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_ibfk_3` FOREIGN KEY (`idCategorie`) REFERENCES `categories` (`idCategorie`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `articles_ibfk_4` FOREIGN KEY (`idSousCategorie`) REFERENCES `sous_categories` (`idSousCategorie`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `article_image`
--
ALTER TABLE `article_image`
  ADD CONSTRAINT `article_image_ibfk_81` FOREIGN KEY (`idArticle`) REFERENCES `articles` (`idArticle`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `article_image_ibfk_82` FOREIGN KEY (`idImage`) REFERENCES `images` (`idImage`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `commandes`
--
ALTER TABLE `commandes`
  ADD CONSTRAINT `commandes_ibfk_11` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `commandes_ibfk_12` FOREIGN KEY (`idAdresse`) REFERENCES `Adresse` (`idAdresse`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `commandes_articles`
--
ALTER TABLE `commandes_articles`
  ADD CONSTRAINT `commandes_articles_ibfk_84` FOREIGN KEY (`idCommande`) REFERENCES `commandes` (`idCommande`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `commandes_articles_ibfk_85` FOREIGN KEY (`idArticle`) REFERENCES `articles` (`idArticle`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `paiements`
--
ALTER TABLE `paiements`
  ADD CONSTRAINT `paiements_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `sous_categories`
--
ALTER TABLE `sous_categories`
  ADD CONSTRAINT `sous_categories_ibfk_1` FOREIGN KEY (`idCategorie`) REFERENCES `categories` (`idCategorie`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `users_roles`
--
ALTER TABLE `users_roles`
  ADD CONSTRAINT `users_roles_ibfk_81` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_roles_ibfk_82` FOREIGN KEY (`idRole`) REFERENCES `roles` (`idRole`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
