Admin Panel - Full Stack Application
(React + Node.js + MongoDB)

📌 Overview
A role-based admin dashboard with:

Frontend: React.js (TypeScript), Material-UI

Backend: Node.js, Express, MongoDB (Mongoose)

Features:

JWT authentication (Master/Admin roles)

Product, Category, and Inventory management

CSV bulk data import

Responsive UI

🚀 Quick Start
Prerequisites
Node.js (v18+)

MongoDB Atlas URI (or local MongoDB)

1. Clone & Setup
bash
git clone https://github.com/saswat-53/Debox_assigment.git
cd Debox_assigment
2. Backend Setup
bash
cd backend
npm install
cp .env.example .env  # Fill in your MongoDB URI and JWT secret
npm run dev           # Runs on http://localhost:5000
3. Frontend Setup
bash
cd ../frontend
npm install
npm start             # Runs on http://localhost:3000
🌐 Environment Variables
Backend (.env)
env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/adminpanel
JWT_SECRET=your_secure_jwt_secret
NODE_ENV=development
Frontend (.env)
env
REACT_APP_API_URL=http://localhost:5000  # Must match backend URL
📂 Project Structure
Backend
text
backend/
├── src/
│   ├── controllers/   # Product, Auth, CSV controllers
│   ├── models/        # MongoDB schemas (User, Product, etc.)
│   ├── routes/        # API endpoints
│   ├── middleware/    # Auth & role checks
│   └── server.ts      # Express server
├── uploads/           # CSV uploads (auto-created)
└── sample-data.csv    # Sample import data
Frontend
text
frontend/
├── src/
│   ├── components/    # Reusable UI (Tables, Forms, etc.)
│   ├── pages/         # Routes (Login, Dashboard)
│   ├── services/      # API calls (axios/fetch)
│   ├── App.tsx        # Main app router
│   └── index.tsx      # Entry point
├── public/            # Static assets
└── package.json
🔐 Authentication
Master Role: Full CRUD access

Admin Role: Read-only access

Default Test Credentials:

text
Email: master@example.com  
Password: password123
⚙️ Key API Endpoints
Endpoint	Method	Description	Access
/api/auth/login	POST	Login with JWT token	Public
/api/products	GET	List all products	Admin+Master
/api/csv/upload	POST	Bulk upload via CSV	Master only
🛠️ Development Scripts
Backend
bash
npm run dev    # Start dev server
npm run build  # Compile to dist/
npm start      # Run production build
Frontend
bash
npm start    # Start React dev server
npm build    # Create production build
🚀 Deployment
Backend:

Set NODE_ENV=production in .env.

Deploy with npm start (or PM2).

Frontend:

Run npm run build and deploy the build/ folder.

