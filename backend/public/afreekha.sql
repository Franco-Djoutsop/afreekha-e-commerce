-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mer. 11 juin 2025 à 16:25
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

-- --------------------------------------------------------

--
-- Structure de la table `article_image`
--

CREATE TABLE `article_image` (
  `idArticleImage` int(11) NOT NULL,
  `idArticle` int(11) NOT NULL,
  `idImage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Structure de la table `sous_categories`
--

CREATE TABLE `sous_categories` (
  `idSousCategorie` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `idCategorie` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `idUser` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `date_naissance` datetime DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `tel` varchar(255) NOT NULL,
  `mot_de_passe` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `resetToken` varchar(255) DEFAULT NULL,
  `resetTokenExpires` datetime DEFAULT NULL,
  `country_code` varchar(255) NOT NULL DEFAULT '237',
  `express_adresse` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  ADD UNIQUE KEY `nom_47` (`nom`),
  ADD UNIQUE KEY `nom_48` (`nom`),
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
  ADD UNIQUE KEY `nom_46` (`nom`),
  ADD UNIQUE KEY `nom_47` (`nom`),
  ADD KEY `idCategorie` (`idCategorie`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `tel_13` (`tel`),
  ADD UNIQUE KEY `tel` (`tel`),
  ADD UNIQUE KEY `tel_7` (`tel`),
  ADD UNIQUE KEY `tel_8` (`tel`),
  ADD UNIQUE KEY `tel_9` (`tel`),
  ADD UNIQUE KEY `tel_10` (`tel`),
  ADD UNIQUE KEY `tel_11` (`tel`),
  ADD UNIQUE KEY `tel_12` (`tel`),
  ADD UNIQUE KEY `tel_2` (`tel`),
  ADD UNIQUE KEY `tel_3` (`tel`),
  ADD UNIQUE KEY `tel_4` (`tel`),
  ADD UNIQUE KEY `tel_5` (`tel`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `express_adresse` (`express_adresse`),
  ADD UNIQUE KEY `email_6` (`email`);

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
  MODIFY `idAdresse` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `articles`
--
ALTER TABLE `articles`
  MODIFY `idArticle` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `article_image`
--
ALTER TABLE `article_image`
  MODIFY `idArticleImage` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `idCategorie` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `commandes`
--
ALTER TABLE `commandes`
  MODIFY `idCommande` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `commandes_articles`
--
ALTER TABLE `commandes_articles`
  MODIFY `idCommandArticle` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `images`
--
ALTER TABLE `images`
  MODIFY `idImage` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `idMessage` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `paiements`
--
ALTER TABLE `paiements`
  MODIFY `idPaiement` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `idRole` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `sous_categories`
--
ALTER TABLE `sous_categories`
  MODIFY `idSousCategorie` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users_roles`
--
ALTER TABLE `users_roles`
  MODIFY `idUserRole` int(11) NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `articles_ibfk_7` FOREIGN KEY (`idCategorie`) REFERENCES `categories` (`idCategorie`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `articles_ibfk_8` FOREIGN KEY (`idSousCategorie`) REFERENCES `sous_categories` (`idSousCategorie`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `article_image`
--
ALTER TABLE `article_image`
  ADD CONSTRAINT `article_image_ibfk_85` FOREIGN KEY (`idArticle`) REFERENCES `articles` (`idArticle`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `article_image_ibfk_86` FOREIGN KEY (`idImage`) REFERENCES `images` (`idImage`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `commandes`
--
ALTER TABLE `commandes`
  ADD CONSTRAINT `commandes_ibfk_15` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `commandes_ibfk_16` FOREIGN KEY (`idAdresse`) REFERENCES `Adresse` (`idAdresse`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `commandes_articles`
--
ALTER TABLE `commandes_articles`
  ADD CONSTRAINT `commandes_articles_ibfk_88` FOREIGN KEY (`idCommande`) REFERENCES `commandes` (`idCommande`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `commandes_articles_ibfk_89` FOREIGN KEY (`idArticle`) REFERENCES `articles` (`idArticle`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `users_roles_ibfk_85` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_roles_ibfk_86` FOREIGN KEY (`idRole`) REFERENCES `roles` (`idRole`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
