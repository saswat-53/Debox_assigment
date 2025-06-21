# Admin Panel - Full Stack Application

## 📌 Overview

This is a complete full-stack admin panel application with:
- **Frontend**: React.js with TypeScript, Material-UI, and Redux
- **Backend**: Node.js with Express, TypeScript, and MongoDB
- Features: Role-based authentication, product/category management, inventory tracking, and CSV import

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB instance
- Git

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/your-repo/admin-panel-fullstack.git
cd admin-panel-fullstack
```

#### 2. Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm install
npm run dev
```

#### 3. Frontend Setup
```bash
cd ../frontend
cp .env.example .env
npm install
npm start
```

## 🌐 Environment Variables

### Backend (`.env` in backend folder)
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/adminpanel
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

### Frontend (`.env` in frontend folder)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_NAME=Admin Panel
```

## 🏗️ Project Structure

```
admin-panel-fullstack/
├── backend/               # Node.js backend
│   ├── src/               # Source files
│   ├── package.json       # Backend dependencies
│   └── .env               # Backend environment variables
│
└── frontend/              # React frontend
    ├── public/            # Static files
    ├── src/               # Source files
    │   ├── components/    # Reusable components
    │   ├── pages/         # Page components
    │   ├── store/         # Redux store
    │   └── utils/         # Utility functions
    ├── package.json       # Frontend dependencies
    └── .env               # Frontend environment variables
```

## 🔐 Authentication

Two user roles:
- **Master**: Full access (create/edit/delete)
- **Admin**: Read-only access

Default credentials (for development):
```
Email: master@example.com
Password: password123
```

## 📚 API Endpoints

| Endpoint               | Method | Description                     | Access       |
|------------------------|--------|---------------------------------|--------------|
| `/api/auth/login`      | POST   | User login                      | Public       |
| `/api/auth/register`   | POST   | User registration               | Master only  |
| `/api/products`        | GET    | Get all products                | Admin+Master |
| `/api/products`        | POST   | Create product                  | Master only  |
| `/api/categories`      | GET    | Get all categories              | Admin+Master |
| `/api/inventory`       | GET    | Get inventory data              | Admin+Master |
| `/api/csv/upload`      | POST   | Upload CSV data                 | Master only  |

## 🛠️ Development Scripts

### Backend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run test     # Run tests
```

### Frontend
```bash
npm start        # Start development server
npm run build    # Build for production
npm test         # Run tests
npm run lint     # Run linter
```

## 🚀 Deployment

### Backend
1. Set `NODE_ENV=production` in `.env`
2. Run `npm run build`
3. Start with `npm start` or use PM2

### Frontend
1. Build with `npm run build`
2. Deploy the `build` folder to your hosting provider

## 📊 Sample Data

A `sample-data.csv` file is included in the backend folder for testing CSV import functionality.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For issues or questions:
- Check server logs for errors
- Verify your MongoDB connection
- Ensure all environment variables are set

Happy coding! 🎉
