# GraphQL Project Dashboard

A full-stack project management dashboard built with **React**, **Apollo Client**, **GraphQL**, **Node.js**, and **MongoDB**. This app allows users to manage clients and their associated projects using a modern GraphQL API and a responsive frontend powered by React and Bootstrap.

> 🛠️ Built during a GraphQL deep-dive to reinforce end-to-end data modeling, API design, and client-side state management with Apollo.

---

## 🔍 Features

- 📁 View, add, and delete **clients**
- 📋 View, add, update, and delete **projects**
- 🔄 **Cascade deletion** of projects when a client is deleted
- 🚀 Full CRUD functionality via **GraphQL mutations and queries**
- ⚛️ Apollo Client for efficient data fetching and local cache updates
- 🧩 MongoDB schema models for Clients and Projects
- 🎨 Simple and functional Bootstrap UI

---

## 🧱 Tech Stack

| Layer       | Tech                         |
|-------------|------------------------------|
| Frontend    | React, Bootstrap             |
| State Mgmt  | Apollo Client                |
| Backend     | Node.js, Express, GraphQL    |
| Database    | MongoDB (via Mongoose)       |
| Tooling     | GraphQL Playground (via `express-graphql`) |

---

## 🧠 Purpose

This project was built as part of a GraphQL practice exercise to reinforce:

- Designing a GraphQL schema with nested types and relationships
- Writing queries and mutations from both the client and server side
- Handling real-world data flows (e.g., cascading deletes, joins)
- Deploying a full-stack GraphQL project (local or cloud)

---


## 🚧 Known Limitations

- UI is built quickly using Bootstrap, not fully polished
- Async/await isn't used consistently — some logic is written for speed over style
- No authentication/authorization implemented
- No persistent deployment included in this version

---

## 📌 Future Improvements (if extended)

- Convert backend resolvers to full `async/await` with try/catch handling
- Add form validation and error messages
- Build user authentication layer with JWT or sessions
- Add pagination, filtering, and sorting
- Replace Bootstrap with a custom or Tailwind UI
- Write unit tests for resolvers and React components

---

## 📸 Demo GIF

[GIF Demo](../project_mgmt_gif.mp4)

---

## 🧑‍💻 Author

**Taylor Graham**  
[Your GitHub Profile](https://github.com/isaidspaghetti)

---

> 💬 Questions, feedback, or suggestions? Open an issue or reach out via GitHub.
