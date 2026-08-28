# The Register — Magazine Subscriber Ledger

A web app for tracking magazine subscribers by receipt book: book no., receipt no. (1–50 per book), name, address, phone, subscription start/end date, with filters by book, year, and active/inactive status.

Built with **React + Vite**, **Firebase** (Auth + Firestore), styled with **Tailwind CSS**, deployed on **Vercel**.

---

## 1. Run it locally

```bash
npm install
cp .env.example .env   # then fill in your Firebase values (see step 2)
npm run dev
```

Open the printed localhost URL. You won't see any data until Firebase is connected and you've signed in (step 2–3).

---

## 2. Set up Firebase

1. Go to [console.firebase.google.com](https://console.firebase.google.com) → **Add project** → give it a name (e.g. `magazine-ledger`) → finish the wizard.
2. Inside the project: **Build → Firestore Database → Create database**. Start in **production mode**, pick a region close to your readers.
3. Go to **Build → Authentication → Get started → Sign-in method → Email/Password → Enable**.
4. Still in Authentication, go to the **Users** tab → **Add user** → create a login (email + password) for yourself/your staff. This is who can sign in to the app — there's no public sign-up screen by design.
5. Go to **Project settings** (gear icon) → **General** → scroll to **Your apps** → click the **</> (Web)** icon → register an app (nickname anything) → **skip Firebase Hosting**.
6. Copy the `firebaseConfig` values shown into your `.env` file:

   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```

7. Lock down the database so only signed-in staff can read/write: in **Firestore Database → Rules**, paste the contents of `firestore.rules` (already in this project) and click **Publish**.

That's it — no manual collection setup needed. The first time you add a receipt in the app, Firestore creates the `subscribers` collection automatically.

---

## 3. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: subscriber ledger app"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Your `.env` file is git-ignored on purpose — real keys never get committed. `.env.example` is the template that ships in the repo instead.

---

## 4. Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repo you just pushed.
2. Vercel auto-detects Vite — leave the build command (`npm run build`) and output directory (`dist`) as-is.
3. Before deploying, open **Environment Variables** and add the same six `VITE_FIREBASE_*` keys from your `.env` file.
4. Click **Deploy**. Once it finishes, open the given URL and sign in with the user you created in step 2.4.

Every subsequent `git push` to `main` triggers a new deployment automatically.

---

## How the data is modelled

Each **row** in the ledger is one issued receipt — a book number, a receipt number (1–50), and the subscription it recorded:

| Field | Notes |
|---|---|
| Book No | The physical receipt book this entry was written from |
| Receipt No | 1–50, unique within a book |
| Name / Address / Phone | Subscriber details |
| Subscription start / end | Dates; end defaults to start + 1 year, editable |
| Status | Computed automatically — **Active** if today ≤ end date, otherwise **Inactive** |

The app blocks saving a duplicate Book + Receipt pair, since each physical receipt is only issued once. When a subscriber renews, add a **new** receipt entry with the next receipt number rather than editing the old one — that keeps a full paper trail across years, and is what powers the year filter.

## Features

- Sign-in gated (no public write access) via Firebase Auth
- Add / edit / delete receipts, with duplicate-receipt protection
- Filter by book, year, active/inactive status, and free-text search (name/phone/address)
- Dashboard stat cards: total receipts, active, inactive, books in use
- CSV export of the current filtered view
- Responsive layout; print-friendly table view
