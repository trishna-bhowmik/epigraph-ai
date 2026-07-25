"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Save, UserRound } from "lucide-react";
import { AuthAPI } from "@/lib/api/auth";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, refreshUser } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (user) { setFullName(user.full_name); setEmail(user.email); } }, [user]);

  async function saveProfile(event: FormEvent) {
    event.preventDefault();
    setSaving(true); setMessage("");
    try {
      await AuthAPI.updateProfile({ full_name: fullName, email, ...(password ? { password } : {}) });
      setPassword(""); await refreshUser(); setMessage("Profile updated successfully.");
    } catch (error: any) {
      setMessage(error?.response?.data?.detail ?? "Unable to update your profile.");
    } finally { setSaving(false); }
  }

  async function deleteProfile() {
    if (!confirm("Delete your account and all associated projects? This cannot be undone.")) return;
    try { await AuthAPI.deleteProfile(); logout(); router.replace("/register"); }
    catch (error: any) { setMessage(error?.response?.data?.detail ?? "Unable to delete your account."); }
  }

  return <div className="mx-auto max-w-3xl space-y-8 p-2 lg:p-4">
    <section className="rounded-3xl bg-gradient-to-br from-indigo-950 to-teal-800 p-8 text-white shadow-xl"><div className="flex items-center gap-4"><div className="rounded-2xl bg-white/15 p-3"><UserRound size={30} /></div><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-200">Account</p><h1 className="mt-1 text-3xl font-bold">Profile settings</h1></div></div></section>
    <form onSubmit={saveProfile} className="space-y-5 rounded-3xl border border-indigo-100 bg-white/80 p-6 shadow-sm"><h2 className="text-xl font-semibold text-indigo-950">Basic details</h2><label className="grid gap-2 text-sm font-semibold text-indigo-950">Full name<input required value={fullName} onChange={(event) => setFullName(event.target.value)} className="rounded-xl border border-indigo-200 px-4 py-3 font-normal outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100" /></label><label className="grid gap-2 text-sm font-semibold text-indigo-950">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="rounded-xl border border-indigo-200 px-4 py-3 font-normal outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100" /></label><label className="grid gap-2 text-sm font-semibold text-indigo-950">New password <span className="font-normal text-slate-500">(leave blank to keep current)</span><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="rounded-xl border border-indigo-200 px-4 py-3 font-normal outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100" /></label><button disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-blue-800 px-5 py-3 font-semibold text-white hover:bg-teal-700 disabled:opacity-50"><Save size={18} />{saving ? "Saving..." : "Save changes"}</button>{message && <p className="text-sm text-teal-700">{message}</p>}</form>
    <section className="rounded-3xl border border-rose-200 bg-rose-50/70 p-6"><div className="flex gap-3"><AlertTriangle className="shrink-0 text-rose-600" /><div><h2 className="font-semibold text-rose-950">Delete account</h2><p className="mt-1 text-sm text-rose-800">This permanently deletes your account and associated project data.</p><button onClick={deleteProfile} className="mt-4 rounded-xl bg-rose-700 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-800">Delete my account</button></div></div></section>
  </div>;
}
