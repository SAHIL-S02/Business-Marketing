# 🚀 Digital Marketing Agency - MERN Stack

A modern, full-stack digital marketing agency platform built from the ground up using the **MERN** logic layer (MongoDB, Express, React, Node.js). 

This repository boasts a dynamic public-facing portfolio, distinct service request forms, and a fully secured internal RBAC (Role-Based Access Control) Admin Dashboard. It is heavily styled with **Tailwind CSS** and architected specifically to support modular deployment via Render or Vercel edge networks.

![Platform Overview](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## ✨ Key Features
- **Public Portfolio & Services**: Highly dynamic service pages showcasing completed business campaigns (SEO, UI/UX, Web Dev).
- **Client Order Pipeline**: Secure submission flows directly mapping customer budgets and specifications to the connected MongoDB database.
- **Hardcoded Admin Architecture**: Fully offline-bypassed administrator authentication logic ensuring bullet-proof backend validation that protects all client data.
- **Isolated JWT Signatures**: End-to-end tokenization explicitly barring unauthorized users from querying active dashboards.
- **Edge Deployment Ready**: Features exact runtime `vercel.json` and monolithic Static Site Express mappings for flexible hosting on **Render**.

---

## 🛠️ Technology Stack
### Frontend
* **React 18** (Vite Compiler)
* **Tailwind CSS v3** (Utility-first interactive styling)
* **Axios** (Interceptor-managed HTTP queries)
* **React Router DOM v6**
* **Lucide React** (Dynamic iconography)

### Backend
* **Node.js + Express.js**
* **MongoDB** (Mongoose ORM + `mongodb-memory-server` for local sandboxes)
* **JWT** (`jsonwebtoken` encryption schema)
* **Bcrypt** (Salted password hashing)

---

## 💻 Local Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/Business-Marketing.git
cd Business-Marketing
```

### 2. Configure Environment Variables
You will need to establish `.env` variables in both directories!
**`frontend/.env`**
```env
VITE_API_URL=http://localhost:5000/api
```
**`backend/.env` (Optional if using default Memory Server)**
```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster/agency
JWT_SECRET=super_secret_jwt_signature_key_here
PORT=5000
```

### 3. Install & Run the Backend API
The backend intercepts port `5000` via internal Express scripts.
```bash
cd backend
npm install
npm run dev
```

### 4. Install & Run the React Frontend
Open a new terminal session and launch Vite.
```bash
cd frontend
npm install
npm run dev
```
Navigate to `http://localhost:5173`.

---

## 🔐 Administrator Walkthrough
By design, new users registering on the site are strictly sandboxed into the `"user"` role. The system prevents dynamic admin promotion explicitly.

**To access the Admin Panel:**
1. Navigate to `/login`.
2. Input the hardcoded bypass credentials:
   - **Email**: `admin@gmail.com`
   - **Password**: `admin@1234`
3. Enjoy full backend access monitoring all active user accounts and service requests securely!

---

## 🌍 Production Deployment Commands (Render)
If you decide to deploy on **Render.com**, map the application dynamically using these settings:

**Static Frontend Hook**:
- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

**Node Backend Server**:
- Root Directory: `backend`
- Build Command: `npm install && npm install mongodb-memory-server`
- Start Command: `node index.js`

> Add `FRONTEND_URL` and `MONGO_URI` strictly to your Render Environment configs to link the two pipelines securely bypassing CORS!