## Projet myIRC

Ce projet consiste à développer un système de chat en temps réel similaire à un IRC (Internet Relay Chat) en utilisant TypeScript, ExpressJS, Socket.io et une base de données MongoDB.

L'IRC permettra aux utilisateurs de se connecter, de rejoindre des canaux de discussion, d'échanger des messages en groupe ou en privé.

### Fonctionnalités principales :
- Interface web pour la communication instantanée.
- Création de canaux de discussion et gestion des utilisateurs.
- Envoi et réception de messages en temps réel.
- Stockage des messages dans des fichiers et dans une base de données MongoDB.
- Authentification des utilisateurs et gestion des mots de passe.
- Exportation de l'historique des conversations et des messages.
- Gestion des administrateurs pour la modification des mots de passe et l'exportation des conversations.

### Structure du projet :
- **Serveur ExpressJS** : Gère les routes, l'authentification et la communication avec Socket.io.
- **Socket.io** : Gère la communication bidirectionnelle en temps réel entre le serveur et les clients.
- **Base de données MongoDB** : Stocke les informations sur les utilisateurs, les canaux et les messages.
- **Interface utilisateur HTML/CSS** : Permet aux utilisateurs d'accéder aux fonctionnalités de l'IRC via une interface web conviviale.

### Installation et utilisation :
1. Cloner le dépôt Git : `git clone [lien-du-depot]`.
2. Installer les dépendances : `npm install`.
3. Créer un cluster sur Mongo Atlas et Recuperer l'URI de la base de données.
3. Configurer la base de données MongoDB et lancer le serveur : `yarn dev`.
4. Accéder à l'interface web via un navigateur et commencer à discuter en temps réel.

### Collaborateurs :
- CHUNG Mathurin
- EL HARJANI Tarik
- NAZEER Farhaana

### Technologies utilisées :
- TypeScript
- ExpressJS
- Socket.io
- MongoDB
