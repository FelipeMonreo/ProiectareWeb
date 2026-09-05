# ProiectareWeb

Acest branch conține o aplicație web realizată cu **React** și **Vite**, împărțită într-o parte de frontend și un backend simplu.

## Ce conține proiectul

### Frontend
Frontend-ul este realizat în React și include mai multe pagini și componente reutilizabile:

- **Home** – pagina principală;
- **About** – informații despre proiect;
- **Projects** – afișarea și gestionarea proiectelor;
- **Contact** – formular de contact;
- **NotFound** – pagină pentru rutele inexistente;
- componente precum **Navbar**, **Footer**, **Card**, **Clock**, **TodoList**, **QuickNote**, **UsersList** și **ContactForm**.

Navigarea între pagini este realizată cu **React Router**.

### Backend
În folderul `server` se află un server realizat cu **Node.js + Express**.

Backend-ul folosește **MongoDB** prin **Mongoose** și oferă endpoint-uri pentru:

- afișarea proiectelor;
- adăugarea unui proiect;
- modificarea unui proiect;
- ștergerea unui proiect;
- afișarea statisticilor despre proiecte finalizate și în lucru.

## Tehnologii folosite

- React
- Vite
- React Router
- Node.js
- Express
- MongoDB
- Mongoose
- CSS

## Rulare proiect

Pentru frontend:

```bash
npm install
npm run dev
```

Pentru backend:

```bash
node server/index.cjs
```

MongoDB trebuie să ruleze local pentru ca partea de backend să funcționeze corect.
