import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../hooks/useTheme";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#publications", label: "Publications" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-theme border-b bg-surface/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-[var(--font-display)] text-lg font-semibold text-ink">
          Jeffrin<span className="text-gradient">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm text-theme-muted transition-colors hover:text-brand">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            aria-label="Toggle color theme"
            onClick={toggleTheme}
            className="border-theme flex h-9 w-9 items-center justify-center rounded-full border text-ink transition-colors hover:text-brand"
          >
            {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>

          <a
            href="#contact"
            className="border-theme hidden rounded-full border px-4 py-2 text-sm text-ink transition-colors hover:border-brand hover:text-brand md:inline-block"
          >
            Get in touch
          </a>

          <button
            aria-label="Toggle menu"
            className="text-2xl text-ink md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-theme overflow-hidden border-b bg-surface md:hidden"
          >
            {links.map((link) => (
              <li key={link.href} className="border-theme border-t">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-6 py-3 text-sm text-theme-muted hover:text-brand"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
