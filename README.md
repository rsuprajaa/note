# Notely

[View Demo](https://notelyy.vercel.app/)

A collaborative note-taking app

- Written in **React** using functional components with Context API for state management
- Styled with **Tailwind CSS**
- API built with **Express**, **PostgreSQL** and **TypeORM**
- Written entirely in **Typescript** for type-safety and debugging reasons, as well as to speed up the development process
- Linted with **ESLint**, formatted with **Prettier**

![Workspace](/screenshots/1.JPG "Workspace")
![Note](/screenshots/2.JPG "Note")

## Setting up development environment

Make sure you have Node.js and Postgres installed

```bash
git clone git@github.com:suprajaraman/notely.git
cd client
npm install
cd server
npm install
```

Add .env files in client and server folder. Copy the contents in .env.example in the respective folders and fill in your database credentials.

## Usage

```
cd client && npm start
cd server && npm run dev
```
