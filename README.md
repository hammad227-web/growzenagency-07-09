# Growzen Agency Web Application

Built with React 19, Vite, Tailwind CSS, and Supabase.

---

## 🚀 Deploying to Netlify

This project is pre-configured for **1-click / zero-config Netlify deployment**.

### Method 1: Git Integration (Recommended)
1. **Push or Export to GitHub**:
   - In Google AI Studio, click the **Settings** menu at the top right &rarr; **Export to GitHub** (or download as ZIP and push to a new GitHub repo).
2. **Import to Netlify**:
   - Go to [app.netlify.com](https://app.netlify.com/) and log in.
   - Click **Add new site** &rarr; **Import an existing project**.
   - Select **GitHub** and choose your repository.
3. **Automatic Detection**:
   - Netlify will automatically detect `netlify.toml` with:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
     - **Environment variables**: Pre-configured in `netlify.toml`
4. Click **Deploy Site**. Your website will be live with a free SSL certificate and custom domain support!

---

### Method 2: Netlify Drop (Instant Drag-and-Drop)
1. In your local terminal, run:
   ```bash
   npm install
   npm run build
   ```
2. Open [app.netlify.com/drop](https://app.netlify.com/drop) in your browser.
3. Drag and drop the generated `dist` folder into the upload box.
4. Your website is deployed immediately!

---

## 🗄️ Supabase Connection

Your Supabase project is integrated:
- **Project ID**: `fmwmswxjcengzxzakupg`
- **Database Table**: `public.bookings`

To ensure appointment bookings persist in Supabase, run this SQL query once in your [Supabase SQL Editor](https://supabase.com/dashboard/project/fmwmswxjcengzxzakupg/sql/new):

```sql
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  service TEXT NOT NULL,
  package_tier TEXT,
  message TEXT,
  status TEXT DEFAULT 'new'
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous bookings insert"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow reading bookings"
ON public.bookings
FOR SELECT
TO anon, authenticated
USING (true);
```
