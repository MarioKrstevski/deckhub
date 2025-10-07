# DeckHub - Technical Specifications

## 🏗️ **Architecture Overview**

_High-level description of your system architecture_

## 🛠️ **Tech Stack**

**Frontend:**

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Shadcn UI + Radix UI
- Zustand (State Management)
- React Hook Form + Zod
- Supabase for Auth

**Backend:** (if applicable)

- Next.js as a backend also
- Supabase for Email sending with React Email templates

**Database:** (if applicable)

- Supabase - POSTGRESQL
- Prisma to control the schema and talk to database

**Deployment:**

- Hosted on Vercel via github link to the repo

## 📁 **Project Structure**

```
src/
├── app/                 # Next.js App Router
├── components/          # React components
│   ├── ui/             # Shadcn UI components
│   └── [feature]/      # Feature-specific components
├── lib/                # Utilities and helpers
├── stores/             # Zustand stores
├── types/              # TypeScript type definitions
└── hooks/              # Custom React hooks
```

## 🔧 **Development Guidelines**

- **Code Style:** Standard.js rules
- **Component Structure:** Functional components with TypeScript
- **State Management:** Zustand for global state
- **Styling:** Tailwind CSS utilities + CSS modules if needed
- **Testing:** [To be defined]

## 📝 **ESLint Configuration**

- **Unescaped Entities:** Use `&apos;` instead of `'` in JSX text content
- **TypeScript:** Avoid `any` type, use proper interfaces
- **Unused Imports:** Remove unused imports to avoid warnings
- **Build Process:** All ESLint errors must be fixed before deployment

## 🚀 **Performance Requirements**

- **Load Time:** < 3 seconds
- **Bundle Size:** [To be defined]
- **Accessibility:** WCAG 2.1 AA compliance

## 🔒 **Security Considerations**

- [To be defined]

## 📱 **Browser Support**

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🌐 **API Specifications** (if applicable)

- [To be defined]
