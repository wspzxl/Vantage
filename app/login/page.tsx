import Link from "next/link";
import { signInAction, signUpAction } from "./actions";
import { siteConfig } from "@/lib/config/siteConfig";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: PageProps<"/login">) {
  const params = await searchParams;
  const mode = params.mode === "signup" ? "signup" : "signin";
  const error = typeof params.error === "string" ? params.error : null;
  const checkEmail = params.checkEmail === "1";
  const next = typeof params.next === "string" ? params.next : "/dashboard";

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 dark:bg-black">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-lg font-semibold">{siteConfig.name.zh}</h1>
          <p className="mt-1 text-sm text-zinc-500">{siteConfig.tagline.zh}</p>
        </div>

        {checkEmail ? (
          <p className="rounded border border-zinc-200 bg-white p-4 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
            Check your email to confirm your account, then sign in.
          </p>
        ) : (
          <form
            action={mode === "signup" ? signUpAction : signInAction}
            className="space-y-3 rounded border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <input type="hidden" name="next" value={next} />
            <div>
              <label className="block text-sm font-medium" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                className="mt-1 w-full rounded border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              className="w-full rounded bg-zinc-950 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              {mode === "signup" ? "Create account" : "Sign in"}
            </button>
          </form>
        )}

        <p className="text-center text-sm text-zinc-500">
          {mode === "signup" ? (
            <>
              Already have an account?{" "}
              <Link href="/login" className="font-medium underline">
                Sign in
              </Link>
            </>
          ) : (
            <>
              No account yet?{" "}
              <Link href="/login?mode=signup" className="font-medium underline">
                Sign up
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
