"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/admin/actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    {},
  );

  return (
    <main className="flex min-h-screen items-center justify-center bg-navy-deep px-4">
      <div className="w-full max-w-sm">
        <p className="text-center font-display text-lg font-semibold text-white">
          AD Real Estate
        </p>
        <p className="mt-1 text-center text-xs uppercase tracking-[0.18em] text-gold">
          Admin
        </p>

        <form
          action={formAction}
          className="mt-8 rounded-2xl bg-white p-6 shadow-[0_28px_60px_-16px_rgba(6,13,26,0.5)]"
        >
          <label
            htmlFor="password"
            className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            autoFocus
            required
            className="mt-2 w-full rounded-lg border border-hairline bg-sand px-3 py-2.5 text-sm text-navy-deep focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
          />

          {state.error && (
            <p className="mt-3 text-sm text-red-600">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-5 w-full rounded-lg bg-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-mid disabled:opacity-60"
          >
            {pending ? "Checking…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
