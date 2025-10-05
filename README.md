# DeckHub

A modern Next.js project built with TypeScript, featuring a comprehensive tech stack for building scalable web applications.

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Stylus (hybrid approach)
- **UI Components**: Shadcn UI + Radix UI
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **URL State**: nuqs
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

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

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

This project uses a hybrid approach combining Tailwind CSS and Stylus:

- **Tailwind CSS**: For utility classes, spacing, layout, and rapid prototyping
- **Stylus Modules**: For complex, component-specific styles with variables and mixins
- **Design System**: CSS custom properties for consistent theming

### Example Stylus Usage

```stylus
// ComponentName.module.styl
.container
  primary-color = #3b82f6

  background: linear-gradient(135deg, primary-color 0%, #64748b 100%)
  border-radius: 12px

  &:hover
    transform: translateY(-2px)
```

```tsx
// ComponentName.tsx
import styles from "./ComponentName.module.styl";

export function ComponentName() {
  return (
    <div className={`${styles.container} p-4`}>
      {/* Tailwind utilities + Stylus styles */}
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
