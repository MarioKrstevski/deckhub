import { Counter } from "@/components/counter";
import { ExampleForm } from "@/components/example-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">DeckHub</h1>
          <p className="text-muted-foreground text-lg">
            A Next.js project with modern tooling and best practices
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Counter />
          <ExampleForm />
        </div>

        <div className="mb-12">
          <div className="p-6 bg-gradient-to-br from-blue-500 to-slate-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-white text-xl font-semibold mb-4">
              Tailwind CSS{" "}
              <span className="text-yellow-300 font-bold">
                Styling
              </span>
            </h3>
            <div className="text-white/90 leading-relaxed">
              This component demonstrates pure Tailwind CSS styling
              with gradients, shadows, and hover effects. The hybrid
              approach with Stylus can be added back once we resolve
              the Turbopack compatibility issues.
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="p-4 border rounded-lg">
              <strong>Next.js 15</strong>
              <p className="text-muted-foreground">App Router</p>
            </div>
            <div className="p-4 border rounded-lg">
              <strong>TypeScript</strong>
              <p className="text-muted-foreground">Type Safety</p>
            </div>
            <div className="p-4 border rounded-lg">
              <strong>Tailwind CSS</strong>
              <p className="text-muted-foreground">Styling</p>
            </div>
            <div className="p-4 border rounded-lg">
              <strong>Shadcn UI</strong>
              <p className="text-muted-foreground">Components</p>
            </div>
            <div className="p-4 border rounded-lg">
              <strong>Zustand</strong>
              <p className="text-muted-foreground">
                State Management
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <strong>React Hook Form</strong>
              <p className="text-muted-foreground">Forms</p>
            </div>
            <div className="p-4 border rounded-lg">
              <strong>Zod</strong>
              <p className="text-muted-foreground">Validation</p>
            </div>
            <div className="p-4 border rounded-lg">
              <strong>nuqs</strong>
              <p className="text-muted-foreground">URL State</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
