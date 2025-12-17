# 🎓 Education Result Portal

A comprehensive Education Result Portal built with **Next.js 16**, designed to provide secure result searching and robust administrative management.

## 🚀 Features

### 🔍 Public Result Search

- **Secure Result Access**: Students can search for results using Board, Exam, Year, Roll, and Registration numbers.
- **Real-time Validation**: Form validation using **Zod** ensures accurate data entry.
- **Captcha Protection**: Integrated captcha to prevent automated spam.
- **Privacy Focused**: Sensitive parameters are hidden using secure API proxy routes.
- **Detailed Result View**: Displays student info, subject-wise grades, and overall GPA with a print-friendly interface.

### 🛡️ Admin Dashboard

- **Overview Analytics**: Visualizes platform growth, user activity, and pending moderation tasks using charts.
- **User Management**: Full CRUD operations for platform users with role-based access control.
- **Alumni Management**: Database for managing alumni records.
- **Moderation Queue**: Efficient workflow for reviewing and approving pending requests.
- **Settings**: Profile management and security settings.

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, Shadcn/UI, Lucide Icons, React Icons
- **State & Data:** TanStack Query v5, Axios
- **Forms:** React Hook Form, Zod
- **Authentication:** NextAuth.js
- **Security:** Crypto-js for payload encryption
- **Notifications:** Sonner Toast

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/RashedulHaqueRasel1/edu_result.git
cd edu_result
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://your-api-url.com/api/v1
NEXT_PUBLIC_SOCKET_URL=https://your-socket-url.com

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_super_secret_key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📂 Project Structure

```bash
src/
├── app/              # Next.js App Router pages and API routes
├── components/       # Reusable UI components (Shadcn, Custom)
├── hooks/            # Custom React hooks
├── lib/              # Utility functions, API clients, schema definitions
├── types/            # TypeScript type definitions
└── providers/        # Context providers (QueryClient, Auth)
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🧑‍💻 Author

**Rashedul Haque Rasel**

📧 Email: [rashedulhaquerasel1@gmail.com](mailto:rashedulhaquerasel1@gmail.com)

🌐 Portfolio: [https://rashedul-haque-rasel.vercel.app](https://rashedul-haque-rasel.vercel.app)

💼 LinkedIn: [https://www.linkedin.com/in/rashedul-haque-rasel](https://www.linkedin.com/in/rashedul-haque-rasel)
