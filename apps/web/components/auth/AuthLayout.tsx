interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(20,184,166,0.24),transparent_26rem),radial-gradient(circle_at_85%_85%,rgba(79,70,229,0.32),transparent_28rem)]" />
      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-teal-300">EpiGraph AI</p>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            {title}
          </h1>

          <p className="mt-3 text-indigo-100">
            {subtitle}
          </p>
        </div>

        {children}
      </div>
    </main>
  );
}
