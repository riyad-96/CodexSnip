# 💻 CodexSnip

A full-stack web application designed for developers to **store and organize code snippets** efficiently. Built with **React** and **TypeScript** on the frontend, and backed by a **MongoDB** database.

## ✨ Features

- **Code Organization:** Create **folders** to categorize your code snippets.
- **Multiple Snippets:** Store **multiple code snippets** inside each folder.
- **Syntax Highlighting:** Beautiful and accurate syntax highlighting for a **broad range of programming languages** using `react-syntax-highlighter`.
- **Persistent Storage:** Data is securely stored using **MongoDB**.

---

## 🛠️ Tech Stack

### Frontend ⚛️

The frontend is built using **React** and **TypeScript** for a robust and scalable user interface.

| Category                | Key Technologies                                              | Purpose/Use                                                                                   |
| :---------------------- | :------------------------------------------------------------ | :-------------------------------------------------------------------------------------------- |
| **Core**                | **React**, **TypeScript**                                     | Primary library for building the UI.                                                          |
| **Data Fetching**       | **@tanstack/react-query**, **Axios**                          | Managing server state, caching, and making HTTP requests.                                     |
| **Routing**             | **react-router-dom**                                          | Handling navigation and application routing.                                                  |
| **Styling/UI**          | **lucide-react**, **react-select**                            | Icons and enhanced form select fields.                                                        |
| **Custom UI/Utilities** | **[kitzo](https://github.com/riyad-96/kitzo)** (Your Library) | Provides custom UI components, specifically used for **Tooltip** and **Toast Notifications**. |
| **Form Management**     | **react-hook-form**                                           | Efficient and flexible form validation and state management.                                  |
| **Code Display**        | **react-syntax-highlighter**, **prismjs**                     | Providing syntax highlighting for code snippets.                                              |
| **Authentication**      | **firebase**                                                  | Client-side integration for user authentication/services.                                     |
| **Animation**           | **motion**                                                    | Handling smooth and complex UI animations.                                                    |
| **Utilities**           | **date-fns**                                                  | A comprehensive library for date handling.                                                    |

---

## 🌐 Live Demo

Experience CodexSnip live and see how easy it is to manage your code snippets!

- **Application Link:** [CodexSnip](https://codexsnip.vercel.app)
