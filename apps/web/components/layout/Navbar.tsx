"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-indigo-100/70 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight text-indigo-950"
        >
          EpiGraph AI
        </Link>

        <nav className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
          <Link href="/">Home</Link>
          <Link href="#features">Features</Link>
          <Link href="#workflow">Workflow</Link>
          <Link href="#docs">Docs</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-semibold text-slate-700 transition hover:text-teal-700">
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-full bg-indigo-950 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-950/15 transition hover:-translate-y-0.5 hover:bg-teal-700"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
