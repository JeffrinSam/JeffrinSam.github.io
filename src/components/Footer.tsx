import { profile } from "../data/profile";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-zinc-500 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React, Tailwind & Framer Motion.
        </p>
        <a href="#top" className="hover:text-cyan-300">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
