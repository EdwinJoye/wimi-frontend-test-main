# Implementation Documentation

## 🚀 Installation & Setup

### Prerequisites

- Node.js 18+
- npm

### How to Run

```bash
# Installation des dépendances
npm install

# Créer un fichier .env à la racine avec :
VITE_API_URL=http://localhost:3001

# Lancer le serveur
npm start

# Lancer l'application
npm run dev

# Lancer les tests
npm run test
```

**Pour le .env, l'application marche sur :** http://localhost:5173

## 🏗️ Technical Choices

### Architecture

J'ai organisé le code avec une architecture en couche. Par fonctionnalités : (users, todos, todoLists) plutôt que par type de fichier. Chaque feature a ses propres hooks, types et composants. C'est une habitude que j'ai prise au sein de ma dernière entreprise qui rend le code plus facile à maintenir et à retrouver.

### State Management

- utilisation de zustand pour les trucs globaux
- utilisation de TanStack Query pour tout ce qui touche à l'API
- utilisation de React Hook Form et de Zod pour les formulaires

### Styling

J'ai utilisé la librairie design system Mantine comme base pour obtenir des composants propres et accessibles très rapidement. À cela, j'ai ajouté Taiwind pour les les petites modifications de style, et Framer Motion pour les animations.

### Testing

J'ai effectué quelques tests unitaires avec Vitest pour les compsants de navigation : les boutons.

## ✨ Implemented Features

### Core Features

- [x] Login page avec authentication
- [x] Todo lists display
- [x] Todos display within lists
- [x] Mark todos as completed
- [x] Create new todos
- [x] User sidebar with information

### Bonus Features

- [x] Multi-langue (français, anglais, japonais)
- [x] Dark mode avec un switch accessible dans les settings
- [x] Filtres (toutes / complétées / en attente)
- [x] Recherche dans les todos
- [x] Tri par date, priorité ou titre
- [x] Affichage avec les Card ou la Table selon le choix
- [x] Page de détails pour chaque todo
- [x] Page profil utilisateur
- [x] Page settings avec plusieurs onglets
- [x] Animations sur les transitions (lazzy laoding)
- [x] Mode accessibilité pour les lecteurs d'écran (demandes modernes)
- [x] Homepage personnalisée avec un message de bienvenue

## 📚 Libraries & Dependencies

| Library        | Purpose                 | Why?                                            |
| -------------- | ----------------------- | ----------------------------------------------- |
| React          | UI Framework            | Required                                        |
| TypeScript     | Type safety             | Required                                        |
| Mantine UI     | Design system           | Composants modernes et accessibles              |
| TanStack Query | Server state management | Gère le cache et les appels API automatiquement |
| Zustand        | Global state            | Simple et efficace                              |
| Framer Motion  | Animations              | Animations fluides sans se prendre la tête      |
| i18next        | Internationalization    | Pour gérer les traductions facilement           |
| React Router   | Routing                 | Standard pour le routing en React               |
| Zod            | Schema validation       | Validation avec typage automatique              |
| Tailwind CSS   | Utility CSS             | Styling rapide avec des classes utilitaires     |

## ⏱️ Time Spent

**Total time:** 12h37 exactement

**Breakdown:**

- Setup & configuration: 2 hours
- Core features: 5 hours
- Styling: environ 3 hours
- Testing: 1 hour
- Refactoring & polish: 2 hour

## 🚧 Future Improvements

1.Un drag & drop pour réorganiser les todos
2.Plus de tests (E2E notamment)
3.La possibilité de partager des listes
3.De meilleurs affichages

## 🤔 Challenges & Learnings

PROBLÈMES RENCONTRÉS

- Faire cohabiter TypeScript strict avec tous les types de l'API
- Gérer les animations sans ralentir l'app
- Configurer les tests avec tous les mocks nécessaires

SOLUTION APPORTEES

- utilisation de zod pour le typage automatique
- utilisation du lazy loading pour les pages pour améliorer la performance
- centrailisation des mocks dans un dossier prévu pour

APPRENTISSAGE

- Meilleure utilisation des mocks
- L'utilisation de Framer Motion
- l'utilisation de lazy et de Suspense pour le chargement

## 📝 Notes

- Je me suis permis d'ajouter une page d'accueil personnalisée pour accueillir les visiteurs. En espérant que ce geste plaise.
- Le projet est uniquement fait pour le desktop, le temps manquant, je n'ai pas travaillé le responsive mobile
- Certains boutons sont désactivés volontairement comme l'api ne permet pas de faire ces fonctionnalités. Ils ont été ajoutés pour rendre le visule plus appréciable.
- En espérant que mon projet vous plaise, je vous remercie pour votre temps ! Edwin Joye 🙏
