# 🚀 MERN Todo App with Categories & Priorities

A beautiful, full-stack todo application built with the MERN stack (MongoDB, Express.js, React, Node.js). Organize your tasks with categories and priority levels for better productivity management.

## ✨ Features

- 📝 **Create, Read, Update, Delete** todos with full CRUD operations
- 🏷️ **Categories**: Organize todos into Work, Personal, Shopping, Health, or Other
- 🚩 **Priority Levels**: Set tasks as Low, Medium, or High priority with color coding
- 🔍 **Smart Filtering**: Filter todos by category and/or priority
- 📊 **Statistics**: View completion stats and category breakdowns
- 🎨 **Beautiful UI**: Modern gradient design with Tailwind CSS
- 📱 **Responsive**: Works seamlessly on desktop and mobile devices
- ⚡ **Real-time Updates**: Instant UI updates without page refresh
- 🗑️ **Bulk Operations**: Delete all completed todos at once

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **ESLint** - Code linting

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Either local installation or MongoDB Atlas account
- **npm** or **yarn** package manager

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mern-todo-app.git
cd mern-todo-app
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit the `.env` file and add your MongoDB connection string:

```env
MONGODB_URI=your_mongodb_connection_string_here
PORT=5000
```

**For MongoDB Atlas:**
1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Get your connection string
3. Replace `<username>`, `<password>`, and `<database>` in the URI

**For local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/todo-app
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend/todo

# Install dependencies
npm install
```

### 4. Start the Application

You'll need to run both backend and frontend servers:

#### Terminal 1 - Backend Server
```bash
cd backend
npm run dev  # For development with nodemon
# or
npm start    # For production
```

#### Terminal 2 - Frontend Server
```bash
cd frontend/todo
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 📖 Usage

### Adding a Todo
1. Enter your task in the input field
2. Select a category (optional - defaults to "Other")
3. Choose priority level (defaults to "Medium")
4. Click the "Add" button or press Enter

### Managing Todos
- **Complete**: Click the circle next to any todo to mark it as complete
- **Delete**: Hover over a todo and click the trash icon to delete it
- **Filter**: Use the filter dropdowns to view todos by category or priority

### Filtering Options
- Filter by **Category**: Work, Personal, Shopping, Health, Other, or All
- Filter by **Priority**: Low, Medium, High, or All
- Combine filters for precise todo management

## 🔌 API Endpoints

The backend provides a RESTful API with the following endpoints:

### Todos
- `GET /api/todos` - Get all todos (with optional filtering)
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `DELETE /api/todos/completed/all` - Delete all completed todos

### Statistics
- `GET /api/todos/stats` - Get todo statistics
- `GET /` - Health check

### Query Parameters for Filtering
- `?category=Work` - Filter by category
- `?priority=high` - Filter by priority
- `?completed=true` - Filter by completion status

## 🎨 UI Preview

The application features a modern, gradient-based design with:

- **Purple to Pink gradient** background
- **White card** container with shadow effects
- **Color-coded priorities**: Green (Low), Yellow (Medium), Red (High)
- **Category badges** with purple styling
- **Responsive layout** that works on all screen sizes
- **Smooth animations** and hover effects

## 📁 Project Structure

```
mern-todo-app/
├── backend/
│   ├── server.js          # Express server setup
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
├── frontend/
│   └── todo/
│       ├── src/
│       │   ├── App.jsx    # Main React component
│       │   ├── main.jsx   # React entry point
│       │   └── index.css  # Global styles
│       ├── package.json   # Frontend dependencies
│       ├── vite.config.js # Vite configuration
│       └── index.html     # HTML template
└── README.md              # Project documentation
```




## 🙏 Acknowledgments

- **Lucide React** for beautiful icons
- **Tailwind CSS** for the utility-first CSS framework
- **MongoDB** for the robust NoSQL database
- **Express.js** for the minimalist web framework

---

**Built with ❤️ using the MERN Stack**
