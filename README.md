# Code Reserve

**Code Reserve** is a lightweight web application that lets developers **store, update, and manage their personal code snippets** securely. It provides a simple and intuitive interface to create, edit, or delete reusable code blocks — perfect for building a personal snippet manager.

---

## Features

- 📝 Add new code snippets with title and description
- 📋 View all saved snippets on the homepage
- ✏️ Update code and details at any time
- 🗑️ Delete snippets you no longer need
- 🔐 MySQL-based storage for reliability and speed

---

## How It Works

Code Reserve is built using **Node.js**, **Express.js**, **EJS**, and **MySQL**. The backend performs CRUD (Create, Read, Update, Delete) operations on a MySQL database to store code snippets.

Each snippet consists of:
- A unique ID
- A title
- The actual code content
- (Optional) A short description

---

## Technologies Used

- Node.js
- Express.js
- MySQL (use PlanetScale or local)
- EJS for frontend rendering
- dotenv for environment configuration
- body-parser (or Express built-in parsers)

---

## Database Schema

> This schema is required for Code Reserve to function properly.

```sql
CREATE TABLE codes (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  code TEXT NOT NULL,
);

## 📸 Screenshots

### 🏠 Homepage
Displays all saved snippets with options to update or delete.

![Homepage](homepage.png)

### ➕ Add Snippet Page
Simple form to add new code snippets.

![Add Snippet](adding.png)

### ✏️ Update Snippet Page
Edit your existing code snippet.

![Update Snippet](updatecode.png)

