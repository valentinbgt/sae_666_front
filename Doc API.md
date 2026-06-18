# Documentation du projet — API Crooak (backend Symfony)

> Document destiné à une IA assistante. Il décrit l'architecture, les conventions
> et les points de vigilance du backend pour pouvoir intervenir sans relecture
> complète du code.

## 1. Vue d'ensemble

Backend d'une application **Crooak** : une API REST exposée via **API Platform**
plus un **back-office d'administration** rendu en HTML (Twig). Le frontend public
est une SPA séparée (Vue.js, non incluse dans ce dépôt) qui consomme l'API en JWT.

- **Type** : projet Symfony 8.1 (`symfony/skeleton`), PHP **≥ 8.5.7**.
- **Serveur applicatif** : **FrankenPHP** (Caddy + PHP), conteneurisé.
- **Base de données** : **MySQL 8** (Doctrine ORM).
- **Authentification** : JWT (Lexik) pour l'API, OAuth2 Google (KnpU), et
  form_login session pour le back-office admin.
- **Préfixe API** : toutes les routes API Platform sont sous `/api/crooak_api`.

Domaines fonctionnels :
- **Utilisateurs** (`User`) : inscription, connexion (email/mdp + Google), rôles.
- **Contenus** (`Content`) : entité polymorphe `article` / `event`, CRUD public
  en lecture, réservé admin en écriture.

## 2. Stack & dépendances clés

| Composant | Rôle |
|---|---|
| `symfony/framework-bundle` 8.1 | Cœur framework |
| `api-platform/symfony` + `doctrine-orm` | Exposition REST automatique des entités |
| `doctrine/orm` 3 + `doctrine-migrations-bundle` | Persistance MySQL |
| `lexik/jwt-authentication-bundle` | Génération/validation des JWT |
| `knpuniversity/oauth2-client-bundle` + `league/oauth2-google` | OAuth2 Google |
| `nelmio/cors-bundle` | CORS pour la SPA |
| `symfony/twig-bundle` | Templates du back-office admin |
| `symfony/mailer` + `google-mailer` | Envoi de mails (DSN `null://` par défaut) |

Bundles activés : voir [config/bundles.php](../config/bundles.php).

## 3. Arborescence

```
src/
  Command/CreateAdminCommand.php      # commande CLI app:create-admin
  Controller/
    Admin/                            # back-office Twig (firewall session)
      DashboardController.php
      SecurityController.php          # login/logout admin
      UserController.php              # CRUD users (HTML + CSRF)
      ContentController.php           # CRUD contents (HTML + CSRF)
    Auth/
      GoogleController.php            # start + callback OAuth Google
      RegisterController.php          # POST inscription JSON
  Entity/
    User.php                          # ApiResource + UserInterface
    Content.php                       # ApiResource (article/event)
  Repository/
    UserRepository.php                # + findByRole(), upgradePassword()
    ContentRepository.php
  Security/
    GoogleAuthenticator.php           # OAuth2Authenticator custom
  Kernel.php
config/
  packages/                          # config par bundle (security, jwt, cors, ...)
  routes/                            # api_platform (préfixe), security
migrations/                          # migrations Doctrine
templates/admin/                     # vues Twig du back-office
docs/                                # docs (dont ce fichier)
```

## 4. Modèle de données

### User — table `user`
| Champ | Type | Notes |
|---|---|---|
| id | int auto | PK |
| email | varchar(180) | **unique** (`UNIQ_IDENTIFIER_EMAIL`), identifiant de connexion |
| username | varchar(100) | nom d'affichage |
| roles | JSON | tableau de rôles ; `ROLE_USER` toujours ajouté à la volée par `getRoles()` |
| password | varchar(255) | hashé (`auto`) |
| plainPassword | (non persisté) | groupe `user:write` uniquement, pour l'API |

- Implémente `UserInterface` + `PasswordAuthenticatedUserInterface`.
- `getUserIdentifier()` retourne l'email.
- `__serialize()` remplace le hash complet du mot de passe par un `crc32c`
  (optimisation de stockage du token de session).
- Groupes de sérialisation : `user:read` (id, email, username, roles),
  `user:write` (email, username, plainPassword).

### Content — table `content`
| Champ | Type | Notes |
|---|---|---|
| id | int auto | PK |
| type | varchar(20) | `article` ou `event` (constantes `TYPE_ARTICLE`, `TYPE_EVENT`), défaut `article` |
| titre | varchar(255) nullable | |
| description | TEXT nullable | |
| date | datetime nullable | date de l'événement/article |
| createdAt | datetime immutable | renseigné au `__construct()` |

- Filtres API Platform : `SearchFilter` sur `type` (exact), `OrderFilter` sur
  `date` et `createdAt` (param `order`).
- Groupes : `content:read`, `content:write` (titre, type, description, date en write).

> Note migrations : d'anciennes migrations créent des tables `article` et `event`
> qui ont été fusionnées dans `content`. Voir [migrations/](../migrations/).
> Modèle actuel = entité unique `Content` discriminée par le champ `type`.

## 5. API REST (API Platform)

Base : `/api/crooak_api`. Doc interactive : `/api/crooak_api/docs`.

### Endpoints d'authentification (hors API Platform)
| Méthode | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/crooak_api/login` | publique | json_login email/password → renvoie un JWT (handler Lexik) |
| POST | `/api/crooak_api/register` | publique | inscription (JSON `{email, username, password}`), validations manuelles |
| GET | `/api/crooak_api/auth/google` | publique | redirige vers Google (scopes `email`, `profile`) |
| GET | `/api/crooak_api/auth/google/callback` | publique | géré par `GoogleAuthenticator` |

`register` : valide email/format/unicité, username ≥ 2 car., password ≥ 6 car.
Renvoie `422` avec `{errors: {...}}` si invalide, sinon `201`.

### Ressources API Platform
**User** (`/api/crooak_api/users`)
| Opération | Sécurité |
|---|---|
| GET collection | `ROLE_ADMIN` |
| GET item | `ROLE_ADMIN` ou propriétaire (`object == user`) |
| POST | `ROLE_ADMIN` |
| PUT | `ROLE_ADMIN` ou propriétaire |
| DELETE | `ROLE_ADMIN` |

**Content** (`/api/crooak_api/contents`)
| Opération | Sécurité |
|---|---|
| GET collection / GET item | **public** |
| POST / PUT / DELETE | `ROLE_ADMIN` |

## 6. Sécurité & authentification

Config : [config/packages/security.yaml](../config/packages/security.yaml).

Trois firewalls :
1. **dev** : profiler/assets, sécurité désactivée.
2. **admin** (`^/(login|logout|dashboard)`) : `form_login` session, provider
   entité User par email. Login `admin_login`, cible par défaut `admin_dashboard`.
3. **api** (`^/api/crooak_api`) : **stateless**, `json_login` (check
   `/api/crooak_api/login`, champs `email`/`password`), `jwt: ~`, authenticator
   custom `GoogleAuthenticator`, entry point `jwt`.

Access control : `/login`, `/logout` publics ; `/dashboard` → `ROLE_ADMIN` ;
routes API publiques explicites (`login`, `docs`, `contexts`, `auth/google`,
`register`) ; reste de l'API → `IS_AUTHENTICATED_FULLY`.

### Flux OAuth Google ([GoogleAuthenticator](../src/Security/GoogleAuthenticator.php))
1. SPA → `/api/crooak_api/auth/google` → redirection Google.
2. Callback → `authenticate()` récupère le `GoogleUser`.
3. Si l'email n'existe pas en base, création auto d'un `User` (rôle `ROLE_USER`,
   mot de passe aléatoire hashé).
4. `onAuthenticationSuccess()` génère un JWT et **redirige vers le frontend** :
   `FRONTEND_OAUTH_CALLBACK_URL` + `?token=<jwt>` (ou `&token=` si l'URL contient
   déjà un `?`).
5. Échec → JSON `401`.

### JWT (Lexik)
Clés RSA dans `config/jwt/private.pem` / `public.pem` (non versionnées). Variables :
`JWT_SECRET_KEY`, `JWT_PUBLIC_KEY`, `JWT_PASSPHRASE`. Génération :
`php bin/console lexik:jwt:generate-keypair`.

## 7. Back-office admin (Twig)

Préfixe `/dashboard`, protégé `ROLE_ADMIN`, firewall session.
- [DashboardController](../src/Controller/Admin/DashboardController.php) : stats (nb users, nb admins).
- [UserController](../src/Controller/Admin/UserController.php) : CRUD users, **protection CSRF** (`user_form`, `delete<id>`).
- [ContentController](../src/Controller/Admin/ContentController.php) : CRUD contents, filtre par `type`, CSRF (`content_form`).
- Login/logout : [SecurityController](../src/Controller/Admin/SecurityController.php).

Templates dans [templates/admin/](../templates/admin/).

## 8. Commande CLI

```bash
php bin/console app:create-admin <email> <password> [username]
```
Crée **ou met à jour** un compte avec `ROLE_ADMIN`. Username par défaut = partie
avant `@`. Voir [CreateAdminCommand](../src/Command/CreateAdminCommand.php).

## 9. CORS

[config/packages/nelmio_cors.yaml](../config/packages/nelmio_cors.yaml) — appliqué à `^/api/`.
Origines autorisées (regex) : localhost/127.0.0.1 (tout port) et
`*.crooak.beauget.fr` (dev/preprod/api). Méthodes GET/POST/PUT/PATCH/DELETE/OPTIONS,
headers `Content-Type`/`Authorization`.

## 10. Configuration & environnement

Variables principales ([.env](../.env)) :
| Variable | Rôle |
|---|---|
| `APP_ENV` / `APP_SECRET` | environnement Symfony |
| `DATABASE_URL` | DSN MySQL (host `database`, base/utilisateur via `MYSQL_*`) |
| `JWT_SECRET_KEY` / `JWT_PUBLIC_KEY` / `JWT_PASSPHRASE` | clés JWT |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | OAuth Google |
| `FRONTEND_OAUTH_CALLBACK_URL` | URL SPA où rediriger avec le token après OAuth |
| `FRONT_URL` | URL du frontend |
| `TRUSTED_PROXIES` | défaut `private_ranges` — **critique derrière le proxy TLS** |
| `MAILER_DSN` | défaut `null://null` |

**Reverse proxy** ([framework.yaml](../config/packages/framework.yaml)) : `trusted_proxies` +
`trusted_headers` sont configurés pour que Symfony reconstruise les URLs en HTTPS
derrière le proxy qui termine le TLS. Sans cela → `redirect_uri_mismatch` OAuth
en preprod/prod. Point de vigilance majeur.

## 11. Déploiement (Docker / FrankenPHP)

- [Dockerfile](../Dockerfile) : cibles `frankenphp_dev` et `frankenphp_prod`.
- [compose.yaml](../compose.yaml) : services `php` (FrankenPHP/Caddy, ports 80/443,
  HTTP/3) et `database` (MySQL 8). Mercure est intégré comme module Caddy.
- [compose.prod.yaml](../compose.prod.yaml) : override prod (image, `APP_SECRET`).
- `compose.override.yaml` : surcharge dev.
- Doctrine en prod : caches `query`/`result`/`system` activés (pool cache.app/system).

Documentation Docker/infra détaillée dans [docs/](.) (production, tls, mysql,
extra-services, troubleshooting, etc.).

## 12. Commandes utiles

```bash
# Dépendances
composer install

# Base de données / migrations
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
php bin/console make:migration

# JWT
php bin/console lexik:jwt:generate-keypair

# Admin
php bin/console app:create-admin admin@example.com motdepasse

# Routes / debug
php bin/console debug:router
php bin/console cache:clear

# Docker
docker compose up -d            # dev
docker compose -f compose.yaml -f compose.prod.yaml up -d   # prod
```

## 13. Conventions & points de vigilance

- **Préfixe API figé** : `/api/crooak_api` (config dans
  [config/routes/api_platform.yaml](../config/routes/api_platform.yaml)). Toute
  nouvelle route API ou règle d'access_control doit respecter ce préfixe.
- **Sérialisation par groupes** : exposer un champ via l'API = l'annoter avec le
  bon `#[Groups]` (`xxx:read` / `xxx:write`). Le `password` n'est jamais exposé.
- **Sécurité au niveau opération** : les règles sont déclarées dans les attributs
  `#[ApiResource]` des entités, pas seulement dans `security.yaml`.
- **CSRF côté admin** uniquement (formulaires HTML) ; l'API est stateless (pas de CSRF).
- **Création auto d'utilisateur** lors du premier login Google.
- **Commentaires et messages** : en français (langue du projet).
- Branche courante : `prod` ; branche principale pour les PR : `main`.

## 14. Domaine Jeu — Parties (`Game` / `GamePlayer`) — À IMPLÉMENTER

> Besoin du frontend pour la page `/play` (compagnon numérique du jeu de cartes
> physique). L'app est un **facilitateur de tour** : lobby (rejoindre via QR),
> ordre des tours, tirage de la roue. Les positions sur le plateau, les scores et
> la victoire restent **physiques** → le backend n'a PAS à les suivre. Une fois la
> partie démarrée, le front ne fait plus aucun appel (jeu 100 % local sur l'hôte).
> Pas de WebSocket : l'hôte **poll** `GET /games/{code}` (~2 s) pendant le lobby.

### 14.0 `GET /me` (manquant aujourd'hui)
Renvoie l'utilisateur courant (groupe `user:read`). Utilisé par l'hôte et les
téléphones pour afficher le pseudo **sans saisie manuelle**.
```
GET /api/crooak_api/me        (JWT)
200 → { id, email, username, roles }
```
Implémentable en 1 contrôleur custom (`$this->getUser()` sérialisé `user:read`)
ou via un `Get` API Platform `uriTemplate: /me` + provider.

### 14.1 Entités

**Game** (table `game`)
| Champ | Type | Notes |
|---|---|---|
| id | int | PK |
| code | string(6) unique, indexé | code de jointure (QR/URL), ex. `A1B2C3` |
| status | string(10) | `lobby` \| `active` \| `finished` (défaut `lobby`) |
| host | ManyToOne User (non null) | créateur |
| turnOrder | json nullable | liste d'ids `GamePlayer`, figée au démarrage |
| currentTurn | int nullable | index dans `turnOrder` (optionnel, pour reprise) |
| createdAt | datetime immutable | |

**GamePlayer** (table `game_player`)
| Champ | Type | Notes |
|---|---|---|
| id | int | PK |
| game | ManyToOne Game (non null) | cascade delete |
| user | ManyToOne User **nullable** | `null` = joueur manuel (sans compte) |
| name | string(20) | pseudo (username au join, ou saisi par l'hôte) |
| color | string(7) | hex `#RRGGBB`, assignée depuis une palette fixe |
| kind | string(10) | `account` \| `manual` |
| seat | int | ordre d'arrivée dans le lobby |
| joinedAt | datetime | |

Groupes suggérés : `game:read` (id, code, status, hostUserId, players, turnOrder,
currentTurn) ; `player:read` (id, name, color, kind, isHost, userId, seat).
`isHost` = booléen calculé (`player.user === game.host`).

### 14.2 Endpoints (préfixe `/api/crooak_api`, JWT requis sauf mention)

| Méthode | Route | Auth | Description |
|---|---|---|---|
| POST | `/games` | user | Crée une partie (`lobby`) + le `GamePlayer` hôte (kind=account, name=username). |
| GET | `/games/{code}` | user connaissant le code | État complet + players. L'hôte poll ici pendant le lobby. |
| POST | `/games/{code}/join` | user | Rejoint (status=`lobby`). **Idempotent** : si le user a déjà un `GamePlayer`, le renvoyer. name résolu via le JWT. |
| POST | `/games/{code}/players` | hôte | Ajoute un joueur **manuel** `{name, color?}` (user=null, kind=manual). |
| DELETE | `/games/{code}/players/{playerId}` | hôte | Retire un joueur (manuel ou kick). |
| POST | `/games/{code}/start` | hôte | `status=active`, calcule `turnOrder`. Refuse si < 2 joueurs. |
| POST | `/games/{code}/end` *(opt.)* | hôte | `status=finished`. |
| PATCH | `/games/{code}` *(opt.)* | hôte | Persiste `currentTurn` (reprise). |

**Formes de réponse**
```
POST   /games                      201 → Game (game:read), players:[hôte]
GET    /games/{code}               200 → Game (game:read)
POST   /games/{code}/join          200/201 → { player: GamePlayer, game: { code, status } }
POST   /games/{code}/players       201 → { player: GamePlayer }
DELETE /games/{code}/players/{id}  204
POST   /games/{code}/start         200 → Game (game:read)
```

**Codes d'erreur attendus par le front** : `404` (code inconnu), `409` (join sur
partie déjà `active`/pleine), `403` (action hôte par un non-hôte), `422`
(start < 2 joueurs, name manquant).

### 14.3 Autorisations
- **Hôte uniquement** : add/remove player, start, end, patch.
- **Tout user authentifié connaissant le `code`** : join + read (le `code` fait
  office de capability ; pas besoin d'être déjà participant).
- Joueurs **manuels** : jamais authentifiés, simples lignes `GamePlayer`.
- Couleur : assignée serveur depuis une palette fixe (cycle sur l'ordre d'arrivée),
  ex. `#BD652E, #109849, #2E6FBD, #C32C2C` (≥ 4 couleurs).

### 14.4 Notes
- CORS déjà OK (`^/api/`) pour localhost + `*.crooak.beauget.fr`.
- `code` généré côté serveur (court, non séquentiel de préférence), unique parmi
  les parties non terminées.
- Le front ignore sans casse tout champ supplémentaire renvoyé.
