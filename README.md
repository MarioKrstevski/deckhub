# DeckHub

A modern Next.js project built with TypeScript, featuring a comprehensive tech stack for building scalable web applications.

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI + Radix UI
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **URL State**: nuqs
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL) + Prisma ORM
- **Code Quality**: ESLint + Standard.js rules

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd deckhub
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Database Configuration (for Prisma)
DATABASE_URL=your_supabase_database_url
DIRECT_URL=your_supabase_direct_url
```

4. Set up the database:

```bash
npm run db:generate
npm run db:push
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with design system
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   │   ├── button.tsx
│   │   └── card.tsx
│   ├── counter.tsx       # Example Zustand component
│   ├── example-form.tsx  # Example form with validation
│   └── example-styling/  # Stylus + Tailwind hybrid example
├── lib/                  # Utility functions
│   └── utils.ts         # Common utilities (cn function)
└── stores/              # Zustand stores
    └── use-app-store.ts # Example store
```

## 🎨 Styling Approach

This project uses Tailwind CSS for styling:

- **Tailwind CSS**: For utility classes, spacing, layout, and rapid prototyping
- **Design System**: CSS custom properties for consistent theming
- **Shadcn UI**: Pre-built components with consistent design patterns

### Example Usage

```tsx
// ComponentName.tsx
export function ComponentName() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-lg hover:shadow-lg transition-shadow">
      {/* Tailwind utilities for styling */}
    </div>
  );
}
```

## 🏗️ Key Features

### State Management with Zustand

```tsx
import { create } from "zustand";

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

### Form Handling with React Hook Form + Zod

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

const form = useForm({
  resolver: zodResolver(schema),
});
```

### URL State Management with nuqs

```tsx
import { useQueryState } from "nuqs";

const [search, setSearch] = useQueryState("search");
```

## 📝 Code Style

This project follows Standard.js rules:

- 2 space indentation
- Single quotes for strings
- No semicolons (unless required)
- Functional and declarative programming patterns
- Descriptive variable names with auxiliary verbs
- Early returns and guard clauses for error handling

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

## 🎯 Best Practices

- **Minimize 'use client'**: Favor React Server Components
- **Error Handling**: Use early returns and guard clauses
- **Performance**: Implement proper memoization and code splitting
- **Accessibility**: Use semantic HTML and ARIA attributes
- **Type Safety**: Leverage TypeScript for better development experience

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

## 🤝 Contributing

1. Follow the established code style
2. Write meaningful commit messages
3. Test your changes thoroughly
4. Update documentation as needed

## 📄 License

This project is licensed under the MIT License.
