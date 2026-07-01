import { useEffect, useState } from "react";

export function useTypewriter(words: string[], typingMs = 55, pauseMs = 1600, deletingMs = 30) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(
      () => setText(current.slice(0, text.length + (deleting ? -1 : 1))),
      deleting ? deletingMs : typingMs,
    );
    return () => clearTimeout(t);
  }, [text, deleting, wordIndex, words, typingMs, pauseMs, deletingMs]);

  return text;
}
