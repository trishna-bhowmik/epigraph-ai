import Link from "next/link";

export default function HeroButtons() {
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Link
        href="/register"
        className="rounded-xl bg-blue-800 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
      >
        Get Started
      </Link>

      <button className="rounded-xl border border-slate-300 px-8 py-4 font-semibold transition hover:bg-slate-100">
        Watch Demo
      </button>
    </div>
  );
}