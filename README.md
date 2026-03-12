# 💍 BandhanConnect — Free Matrimonial Website

A full-featured, free matrimonial web application built with **Next.js 14** (App Router), inspired by Shaadi.com. No paid plans, no hidden charges.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🧾 Profile Creation | 4-step form: personal, background, career, family + partner prefs |
| 🔍 Smart Matching | Algorithm scores by religion, caste, age, city, diet, education |
| 🎛️ Advanced Filters | Filter by religion, caste, city, marital status, education, diet, profession, age range |
| 📤 Share Profiles | WhatsApp, Email, Twitter, copy link |
| 💌 Send Interest | Mark interest in profiles you like |
| 👤 My Profile | View, edit, and manage your own profile |
| 🔒 Persistence | Profiles saved in localStorage (or Supabase if configured) |
| 📱 Responsive | Works on mobile, tablet, and desktop |
| 🌙 Luxury Dark Theme | Warm gold-on-black design |

---

## 🚀 Quick Start (5 minutes)

### 1. Prerequisites
- **Node.js 18+** installed → [nodejs.org](https://nodejs.org)
- A terminal / command prompt

### 2. Create the project

```bash
# Navigate to the folder containing bandhan-connect/
cd bandhan-connect

# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Open in browser
```
http://localhost:3000
```

That's it! 🎉 The app runs with localStorage by default — no database needed.

---

## 📁 Project Structure

```
bandhan-connect/
├── app/                        # Next.js App Router pages
│   ├── layout.jsx              # Root layout (fonts, metadata)
│   ├── globals.css             # Global styles + animations
│   ├── page.jsx                # 🏠 Home page
│   ├── matches/
│   │   └── page.jsx            # 🔍 Browse & filter profiles
│   ├── register/
│   │   └── page.jsx            # 📝 Create profile (4 steps)
│   ├── profile/[id]/
│   │   └── page.jsx            # 👤 Individual profile detail
│   └── my-profile/
│       └── page.jsx            # ✏️ View/edit own profile
│
├── components/
│   ├── Navbar.jsx              # Sticky navigation bar
│   ├── ProfileCard.jsx         # Profile grid card
│   ├── RegisterForm.jsx        # 4-step registration form
│   ├── FilterPanel.jsx         # Collapsible filter panel
│   ├── ShareModal.jsx          # Share via WA/Email/Twitter/link
│   ├── Toast.jsx               # Toast notifications
│   └── Icon.jsx                # SVG icon component
│
├── lib/
│   ├── constants.js            # All dropdowns: religions, castes, cities…
│   ├── matching.js             # Compatibility algorithm + filters
│   ├── store.js                # localStorage CRUD (profiles, interests)
│   └── supabase.js             # Supabase client (optional)
│
├── .env.local.example          # Environment variable template
├── next.config.js              # Next.js config (image domains)
└── package.json
```

---

## 🗄️ Adding a Real Database (Supabase — Free)

Supabase is a free PostgreSQL database that makes profiles persist across devices/sessions.

### Step 1 — Create free Supabase project
1. Go to [supabase.com](https://supabase.com) → Sign up (free)
2. Create a new project
3. Go to **Settings → API** and copy:
   - `Project URL`
   - `anon public` key

### Step 2 — Create the profiles table
In Supabase Dashboard → **SQL Editor**, run:

```sql
create table public.profiles (
  id                text primary key,
  name              text not null,
  gender            text,
  dob               text,
  religion          text,
  caste             text,
  education         text,
  profession        text,
  city              text,
  height            text,
  marital_status    text,
  diet              text,
  complexion        text,
  body_type         text,
  income            text,
  about             text,
  hobbies           text,
  languages         text,
  father_profession text,
  mother_profession text,
  siblings          text,
  partner_religion  text,
  partner_min_age   text,
  partner_max_age   text,
  partner_city      text,
  photo             text,
  verified          boolean default false,
  created_at        timestamptz default now()
);

-- Allow public read/write (for demo; tighten for production)
alter table public.profiles enable row level security;
create policy "Public read"   on public.profiles for select using (true);
create policy "Anyone insert" on public.profiles for insert with check (true);
create policy "Owner update"  on public.profiles for update using (true);
```

### Step 3 — Add environment variables
```bash
# Create .env.local from template
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJ...
```

### Step 4 — Restart dev server
```bash
npm run dev
```

The app will now read/write profiles from Supabase automatically.

---

## 🌐 Deploy to Vercel (Free Hosting)

```bash
# 1. Push code to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/bandhan-connect.git
git push -u origin main

# 2. Go to vercel.com → New Project → Import from GitHub
# 3. Add environment variables in Vercel dashboard (same as .env.local)
# 4. Click Deploy → Done! 🚀
```

Your site will be live at `https://bandhan-connect.vercel.app`

---

## 🎨 Customisation Guide

### Change brand name
Search for `BandhanConnect` in all files and replace with your brand name.

### Add/remove religions or castes
Edit `lib/constants.js` — `RELIGIONS` and `CASTES_BY_RELIGION`.

### Change matching algorithm
Edit `lib/matching.js` → `calcMatchScore()` function. Adjust point values for each factor.

### Change colors
Edit `app/globals.css` — update the `:root` CSS variables:
```css
:root {
  --gold:       #c9873a;  /* Primary accent */
  --gold-light: #f5c87a;  /* Headings */
  --bg:         #0d0500;  /* Page background */
}
```

---

## 🔒 Production Checklist

Before going live, consider:

- [ ] Add user authentication (NextAuth.js or Supabase Auth)
- [ ] Restrict Supabase RLS policies so users can only edit their own profiles
- [ ] Add image upload (Cloudinary or Supabase Storage) instead of photo URLs
- [ ] Add email notifications for "Send Interest"
- [ ] Add rate limiting to prevent spam
- [ ] Add CAPTCHA on registration form
- [ ] Set up custom domain on Vercel

---

## 📞 Support

If you run into issues:
1. Make sure Node.js 18+ is installed: `node --version`
2. Delete `node_modules` and run `npm install` again
3. Check the browser console for errors

---

Made with ♥ · Free forever
