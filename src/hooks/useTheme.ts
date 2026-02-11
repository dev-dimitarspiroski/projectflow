import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "projectflow-theme";

const applyThemeToDom = (theme: Theme) => {
  document.getElementById("body")?.setAttribute("data-theme", theme);
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;

    return stored ?? "light";
  });

  useEffect(() => {
    applyThemeToDom(theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, setTheme, toggleTheme };
};
