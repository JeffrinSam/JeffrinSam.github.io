import { profile } from "../data/profile";

export function Footer() {
  return (
    <footer className="border-theme border-t px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-theme-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React, Tailwind & Framer Motion.
        </p>
        <a href="#top" className="hover:text-brand">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
