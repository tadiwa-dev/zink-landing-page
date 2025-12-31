# Zink AI Minutes - Landing Page

A modern, responsive landing page for **Zink AI Minutes**—the AI meeting assistant that transcribes and summarizes mixed English & Shona conversations.

## 🚀 Features

- ✨ **Next.js 14** with App Router
- 🎨 **Tailwind CSS** for responsive design
- 📱 **Mobile-first** layout
- 🎯 **Brand-aligned** design (Orange/Gold primary color)
- 📥 **Direct download links** for Windows & Android
- 🔗 **Firebase Storage integration** for secure file hosting

## 📦 Tech Stack

- [Next.js 14](https://nextjs.org/)
- [React 18](https://react.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Lucide React Icons](https://lucide.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## 🛠️ Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/tadiwa-dev/zink-landing-page.git
cd zink-landing-page

# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 📁 Project Structure

```
zink-landing-page/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Landing page component
│   └── globals.css         # Global styles
├── public/
│   ├── logo.png            # Zink logo (add your file)
│   └── app_icon_512.jpg    # App icon (add your file)
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── postcss.config.js
└── README.md
```

## 🖼️ Assets Required

Add these images to the `public/` folder:

1. **`/public/logo.png`** — Zink logo (32x32px recommended)
2. **`/public/app_icon_512.jpg`** — App icon (512x512px)

## 🔗 Download Links

- **Windows**: Firebase Storage (configured)
  ```
  https://firebasestorage.googleapis.com/v0/b/novo-freedom-app.firebasestorage.app/o/downloads%2FZinkSetup.exe?alt=media&token=...
  ```

- **Android**: Google Play Store
  ```
  https://play.google.com/store/apps/details?id=com.zink.app
  ```

## 🚀 Deployment to Vercel

### Step 1: Connect GitHub Repository

1. Go to [Vercel](https://vercel.com/)
2. Sign in with GitHub
3. Click **"Add New"** → **"Project"**
4. Select the `zink-landing-page` repository

### Step 2: Configure Project

- **Framework Preset**: Next.js
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)

### Step 3: Deploy

1. Click **Deploy**
2. Wait for the build to complete
3. Your site will be live at `https://zink-landing-page.vercel.app`

### Step 4: Custom Domain (Optional)

1. In Vercel Dashboard, go to **Settings** → **Domains**
2. Add your custom domain (e.g., `zink.app`)
3. Update DNS records as instructed

## 📝 Environment Variables

No environment variables required for basic deployment. Firebase Storage links are hardcoded in the component.

**Optional**: If you want to manage URLs dynamically, create an `.env.local` file:

```env
NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL=https://firebasestorage.googleapis.com/...
NEXT_PUBLIC_ANDROID_DOWNLOAD_URL=https://play.google.com/store/apps/details?id=com.zink.app
```

Then update `app/page.tsx` to use these variables.

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to change the primary color:

```js
theme: {
  extend: {
    colors: {
      primary: '#F5A623', // Change this
    },
  },
}
```

### Content

Edit `app/page.tsx` to customize:
- Headline & descriptions
- Feature grid items
- Footer links
- Social media links

## 🔐 Firebase Storage Configuration

Your Firebase Storage rules allow:

- ✅ Public read access to `/downloads/` folder (for installers)
- ✅ Authenticated write access (for admin uploads)
- ✅ Private authenticated access to `/meetings/` folder (user data)

## 📞 Support

For issues or feature requests, open a GitHub issue or contact `support@zink.ai`.

## 📄 License

MIT License. See LICENSE file for details.

---

**Made with ❤️ for Zink AI**
