# 📘 MCD - Rayan Immobilier

Rayan Immobilier

1.2 Objectifs du site
Présenter les biens immobiliers à vendre ou à louer.

Permettre aux utilisateurs d’effectuer des recherches multicritères (localisation, type de bien, prix, etc.).

Offrir la possibilité de contacter l’agence pour une visite ou une question.

Renforcer l’image professionnelle de l’agence Rayan Immobilier.

2. Cibles du Site
Acheteurs ou locataires potentiels (particuliers ou professionnels).

Propriétaires souhaitant mettre un bien en vente ou en location.

Partenaires ou investisseurs immobiliers.

3. Fonctionnalités Principales
3.1 Interface Utilisateur (Front-end)
Page d’accueil dynamique avec une sélection de biens en vedette.

Fiche détaillée de chaque bien :

Galerie photos.

Description complète.

Caractéristiques (surface, pièces, prix, localisation, etc.).

Intégration de Google Maps.

Moteur de recherche multicritère :

Localisation, type, prix, surface, nombre de chambres, etc.

Formulaire de contact / demande de rendez-vous.

Formulaire de dépôt de bien (pour les propriétaires).

Section "À propos de nous" et présentation de l’équipe.

Blog ou section actualités immobilières.

Responsive design : adapté à tous les écrans (mobile, tablette, desktop).

3.2 Interface Administrateur (Back-office)
Gestion complète des annonces :

Ajouter / modifier / supprimer un bien.

Gestion des galeries photos.

Gestion des demandes de contact.

Statistiques de fréquentation du site (facultatif).

Accès administrateur sécurisé (authentification, rôles, etc.).

4. Contenus Fournis par Rayan Immobilier
Logo et charte graphique.

Photos des biens à publier.

Descriptions des biens.

Présentation de l’agence (textes et visuels).

Coordonnées de contact (adresse, email, téléphone, etc.).

Mentions légales et politique de confidentialité.

🔐 1. Rôles Utilisateurs
1. Administrateur
Responsable principal du site.

Permissions :

Gérer les annonces (ajouter, modifier, supprimer).

Gérer les photos des biens.

Gérer les utilisateurs (propriétaires, agents).

Gérer les demandes de contact.

Gérer les rendez-vous.

Gérer les articles du blog.

Accéder aux statistiques de visite.

Gérer les paramètres du site (logo, textes, etc.).

2. Agent Immobilier
Employé de l’agence chargé de publier les biens.

Permissions :

Ajouter/modifier/supprimer ses propres annonces.

Gérer les photos de ses biens.

Consulter les demandes de contact liées à ses biens.

Planifier et gérer des rendez-vous avec les clients.

3. Propriétaire
Personne souhaitant proposer un bien via le site.

Permissions :

Soumettre un bien à publier via un formulaire.

Voir le statut de son bien (en attente, publié, refusé).

Recevoir des messages ou demandes de visite liés à son bien (via l’admin ou agents).

4. Client (Utilisateur non connecté)
Toute personne consultant le site.

Permissions :

Rechercher des biens.

Consulter les fiches détaillées.

Voir la galerie photo et la carte.

Envoyer un message via le formulaire de contact.

Prendre un rendez-vous.

Lire le blog.


🔹 1. Administrateur
Le cahier des charges demande une interface d’administration avec la gestion complète des annonces, demandes, photos, etc.

Ce rôle doit avoir tous les droits pour assurer le bon fonctionnement du site.

🔹 2. Agent Immobilier
Ce rôle permet à l’agence de déléguer la gestion des biens à des employés.

Ils peuvent ajouter ou gérer leurs propres biens sans toucher à tout le système.

🔹 3. Propriétaire
Le cahier mentionne un formulaire de dépôt de biens par des propriétaires.

Ils n’ont pas accès au back-office, mais doivent pouvoir soumettre un bien et suivre son statut.

🔹 4. Client
Le Client peut consulter les biens, utiliser les filtres de recherche, voir les détails, contacter l’agence ou prendre un rendez-vous.

Il n’a pas besoin d’un compte pour cela, donc pas de permissions critiques.



Ce Modèle Conceptuel de Données représente les principales entités et relations du site web **Rayan Immobilier**.

## 🧱 Entités principales

### 🔹 Utilisateur
- `id_user` (PK)
- `nom`
- `prénom`
- `email`
- `mot_de_passe`
- `téléphone`
- `rôle` (admin, agent, propriétaire, client)
- `date_inscription`

### 🔹 Bien
- `id_bien` (PK)
- `titre`
- `description`
- `surface`
- `nombre_pieces`
- `nombre_chambres`
- `prix`
- `adresse`
- `ville`
- `type` (enum : appartement, maison, etc.)
- `statut` (enum : disponible, loué, vendu)
- `date_publication`
- `user_id` (FK vers Utilisateur)
- `category_id` (FK vers Catégorie)

### 🔹 Catégorie
- `id_categorie` (PK)
- `nom`
- `description`

### 🔹 Photo
- `id_photo` (PK)
- `url`
- `property_id` (FK vers Bien)

### 🔹 DemandeContact
- `id_contact` (PK)
- `nom`
- `email`
- `message`
- `date_envoi`
- `property_id` (FK vers Bien)
- `user_id` (nullable FK vers Utilisateur)

### 🔹 RendezVous
- `id_rdv` (PK)
- `nom`
- `email`
- `téléphone`
- `date`
- `heure`
- `property_id` (FK vers Bien)
- `user_id` (nullable FK vers Utilisateur)

### 🔹 BienFavori
- `user_id` (PK, FK vers Utilisateur)
- `property_id` (PK, FK vers Bien)

### 🔹 SoumissionBien
- `id_soumission` (PK)
- `nom_proprietaire`
- `email_proprietaire`
- `détails_bien`
- `statut` (enum : pending, validé, refusé)
- `date_soumission`
- `property_id` (nullable FK vers Bien)

### 🔹 ArticleBlog
- `id_article` (PK)
- `titre`
- `contenu`
- `date_publication`
- `user_id` (FK vers Utilisateur)

## 🔗 Relations clés

- **Utilisateur** `1,N` ⟶ `0,N` **Bien**
- **Utilisateur** `1,N` ⟶ `0,N` **ArticleBlog**
- **Utilisateur** `1,N` ⟶ `0,N` **DemandeContact**
- **Utilisateur** `1,N` ⟶ `0,N` **RendezVous**
- **Utilisateur** `1,N` ⟶ `0,N` **BienFavori**
- **Bien** `1,N` ⟶ `1` **Catégorie**
- **Bien** `1,N` ⟶ `1,N` **Photo**
- **Bien** `1,N` ⟶ `0,N` **DemandeContact**
- **Bien** `1,N` ⟶ `0,N` **RendezVous**
- **SoumissionBien** `0,1` ⟶ `1` **Bien**

---

> 📌 Ce MCD sert de base pour la création du MLD et de la base de données relationnelle du site immobilier.
