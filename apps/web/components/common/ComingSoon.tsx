interface ComingSoonProps {
  title: string;
  description?: string;
}

export default function ComingSoon({
  title,
  description,
}: ComingSoonProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-12 shadow-sm">
      <div className="mx-auto max-w-xl text-center">
        <div className="mb-6 text-6xl">🚧</div>

        <h1 className="text-3xl font-bold text-slate-800">
          {title}
        </h1>

        <p className="mt-4 text-slate-500">
          {description ??
            "This module is currently under development and will be available soon."}
        </p>
      </div>
    </div>
  );
}