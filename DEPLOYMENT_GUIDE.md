# 🚀 Hosting your MERN Monorepo to Vercel

Everything in this repository is 100% structured natively for Vercel's Cloud Engine! The `vercel.json` file dictates the rules, the `frontend/` handles standard Vite builds, and the `/api` directory natively exposes your Node.js components.

Here is exactly how to put it onto the internet for free right now:

## Step 1: Push Code to GitHub
Vercel's entire CI/CD methodology relies strictly on Github repositories.
1. Open up a terminal in your project root: `/home/shinda/Code/Business-Marketing/`
2. Run standard git commands to initialize a full backup:
   ```bash
   git add .
   git commit -m "Production Vercel Ready"
   git branch -M main
   ```
3. Go to [github.com](https://github.com/), create a new repository called `Business-Marketing` (or whatever you prefer).
4. Paste the 2 commands GitHub gives you at the bottom to connect your local folder to the new GitHub server, and push!

---

## Step 2: Import into Vercel
1. Go to [Vercel.com](https://vercel.com/) and create a free account (log in directly using your GitHub).
2. Click **Add New** at the top right -> **Project**.
3. It will list your GitHub repositories. Click **Import** directly next to the `Business-Marketing` repo you just pushed!

---

## Step 3: Configure Settings (CRITICAL)
Vercel will ask you if you want to modify Build settings. **Do not change any Build commands!** Our Custom `vercel.json` file dynamically handles all of this automatically behind the scenes.

However, you *must* expand the **Environment Variables** tab and paste these identical keys so that your Node App functions identically to your `.env` layout:

| Name | Value | Description |
| :--- | :--- | :--- |
| `MONGO_URI` | `mongodb+srv://...` | *Your actual MongoDB Atlas Connection String* ⚠️ |
| `JWT_SECRET` | `your_secret_string` | *Whatever secure string you used locally for JWT signing* |
| `VITE_API_URL`| `https://my-vercel-app.vercel.app/api` | *The exact URL Vercel gives you (with `/api` at the end!)* |
| `FRONTEND_URL`| `https://my-vercel-app.vercel.app` | *The exact URL Vercel gives you (used strictly for CORS whitelists)* |

> [!WARNING]
> Because you configured `backend/index.js` essentially to use `mongodb-memory-server` as a local sandbox fallback, Vercel will temporarily boot that sandbox up upon launch. But if you want a true production database that saves permanently between serverless cold-starts, you MUST paste an authentic Atlas `MONGO_URI` directly into Vercel!

---

## Step 4: Deploy and Test
1. Press **Deploy**.
2. Give Vercel about 2 minutes to compile the Vite Assets and hook the API Edge networks up.
3. Test your `https://your-app.vercel.app/` directly!
4. Hit `/api` in your browser. You should see `Vercel Serverless Backend Active` printed dynamically!
