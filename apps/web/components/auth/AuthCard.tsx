interface AuthCardProps {
  children: React.ReactNode;
}

export default function AuthCard({
  children,
}: AuthCardProps) {
  return (
    <div className="rounded-3xl border border-white/15 bg-white/95 p-8 shadow-2xl shadow-black/30 backdrop-blur">
      {children}
    </div>
  );
}
