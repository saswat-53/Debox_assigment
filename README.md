```markdown
# Debox Assignment - Admin Panel

A complete admin panel with role-based authentication, built with Next.js (frontend) and Node.js/Express (backend).

## Features

- **Role-based access control** (Master & Admin roles)
- **JWT authentication** with secure cookie storage
- **Dashboard** with statistics and quick actions
- **CRUD operations** for Products, Categories, and Inventory
- **CSV bulk upload** functionality (Master only)
- **Responsive design** with Tailwind CSS
- **TypeScript** for type safety
- **MongoDB** database

## Tech Stack

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Axios for API calls
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JWT for authentication
- Multer for file uploads
- CSV parser for bulk imports

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB instance
- Git

### Frontend Setup
1. Clone the repository
2. Navigate to frontend directory: `cd admin-panel-frontend`
3. Install dependencies: `npm install`
4. Create `.env.local` file from `.env.local.example`
5. Start development server: `npm run dev`

### Backend Setup
1. Navigate to backend directory: `cd admin-panel-backend`
2. Install dependencies: `npm install`
3. Create `.env` file from `.env.example` and configure MongoDB URI
4. Start development server: `npm run dev`

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/adminpanel
JWT_SECRET=your-secret-key
NODE_ENV=development
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (Master only)
- `PUT /api/products/:id` - Update product (Master only)
- `DELETE /api/products/:id` - Delete product (Master only)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Master only)
- `PUT /api/categories/:id` - Update category (Master only)
- `DELETE /api/categories/:id` - Delete category (Master only)

### Inventory
- `GET /api/inventory` - Get all inventory
- `POST /api/inventory` - Create inventory (Master only)
- `PUT /api/inventory/:id` - Update inventory (Master only)
- `DELETE /api/inventory/:id` - Delete inventory (Master only)

### CSV Upload (Master only)
- `POST /api/csv/upload` - Upload CSV file

## Demo Credentials

The login page includes demo accounts:
- **Master**: master@example.com / password (Full access)
- **Admin**: admin@example.com / password (Read-only access)

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server

## Deployment

### Frontend
1. Build the project: `npm run build`
2. Deploy the `out` directory to your hosting provider (Vercel recommended)

### Backend
1. Set environment variables in production
2. Build the project: `npm run build`
3. Start the server: `npm start`
4. Use PM2 or similar process manager for production

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC License - see [LICENSE](LICENSE) file for details
```
