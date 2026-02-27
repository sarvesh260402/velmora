# Deploying Velmora to Render

Your project is structured as a **monorepo** with separate `client/` and `server/` folders. To deploy successfully on Render, you should create two separate services.

## 1. Deploying the Backend (Web Service)

1.  **Create a New Web Service**: Connect your GitHub repository.
2.  **Root Directory**: Set this to `server`.
3.  **Build Command**: `npm install`
4.  **Start Command**: `npm start`
5.  **Environment Variables**: Add all variables from your `server/.env` (e.g., `MONGO_URI`, `JWT_SECRET`, etc.).

## 2. Deploying the Frontend (Static Site or Web Service)

1.  **Create a New Static Site** (Recommended for Next.js): Connect your GitHub repository.
2.  **Root Directory**: Set this to `client`.
3.  **Build Command**: `npm run build`
4.  **Publish Directory**: `.next` (or `out` if you use static export).
5.  **Environment Variables**: Add `NEXT_PUBLIC_API_URL` pointing to your backend service.

## 3. Alternative: Monorepo Build (Using root package.json)

If you prefer to keep one build but delegate, you can use the newly added root `package.json`.
-   **Build Command**: `npm run install:all && npm run build:client`
-   **Start Command**: `npm run start:server`

> [!IMPORTANT]
> Setting the **Root Directory** in Render settings is the cleanest way to fix the "package.json not found" error.
