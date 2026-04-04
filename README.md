# 📝 Premium Task Management System

![Task Manager](https://img.shields.io/badge/Status-Live-brightgreen.svg)
![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)

A modern, responsive, and full-stack Task Management Application built with the MERN/PERN stack. Designed with a premium and clean UI aesthetic, it features secure authentication, real-time database updates, and seamless task tracking.

---

## 🚀 Live Demo

- **Frontend Application:** https://your-frontend.vercel.app
- **Backend API Server:** https://taskmangement-production-eb42.up.railway.app
- **Repository:** https://github.com/satya643/taskmangement

---

## ✨ Key Features

- 🔐 **Secure Authentication:** JWT-based login and registration with secure cookie sessions
- ✅ **Full CRUD Functionality:** Create, read, update, and delete tasks
- 🔍 **Search & Filter:** Filter tasks by `PENDING` / `COMPLETED`
- ⚡ **Optimistic UI:** Fast UI updates using React Query
- 🎨 **Premium UI:** Clean modern design with responsive layout
- 📱 **Responsive Design:** Works on mobile, tablet, and desktop

---

## 🛠️ Tech Stack

### Frontend
- Next.js & React
- Tailwind CSS (Premium Line-Style UI)
- React Query (TanStack Query)
- Axios
- React Hook Form
- Lucide Icons
- Sonner

### Backend
- Node.js & Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcryptjs

---

## 📁 Folder Structure

```bash
taskmangement/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── prisma.config.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/
│   ├── images/
│   ├── package.json
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── .env.local
│
└── README.md

💻 How to Run Locally
Follow these steps to run the application on your local machine.

1. Clone the repository
bash
git clone https://github.com/satya643/taskmangement.git
cd taskmangement
2. Setup Database (Backend)
Navigate to the backend folder and install its dependencies.

bash
cd backend
npm install
Create a .env file in the backend folder and add:

env
DATABASE_URL="postgresql://your_db_user:password@localhost:5432/your_database"
JWT_SECRET="your_secure_secret"
PORT=5000
FRONTEND_URL="http://localhost:3000"
Run the migrations and start the backend:

bash
npx prisma db push
npm run dev
3. Setup Frontend
Open a new terminal window, navigate to the frontend folder.

bash
cd frontend
npm install
Create a .env.local file in the frontend folder and add:

env
NEXT_PUBLIC_API_URL="http://localhost:5000"
Start the frontend app:

bash
npm run dev
