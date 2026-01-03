import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext({
  theme: "purple",
  toggleTheme: () => {},
  nextLabel: "Ocean Blue",
});

const THEME_LABELS = {
  purple: "Ocean Blue",
  ocean: "Royal Purple",
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "purple";
    const stored = localStorage.getItem("theme") || "purple";
    document.documentElement.dataset.theme = stored;
    return stored;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === "purple" ? "ocean" : "purple"));

  const value = useMemo(
    () => ({ theme, toggleTheme, nextLabel: THEME_LABELS[theme] }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
