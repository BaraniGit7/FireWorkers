import { createTheme } from "@mui/material/styles";

export const getAppTheme = (mode: "light" | "dark") => {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? "#f59e0b" : "#d97706", // Festive golden spark
        light: isDark ? "#fbbf24" : "#f59e0b",
        dark: isDark ? "#d97706" : "#b45309",
        contrastText: "#ffffff"
      },
      secondary: {
        main: isDark ? "#10b981" : "#059669", // CSIR-NEERI Green Cracker Emerald
        light: isDark ? "#34d399" : "#10b981",
        dark: isDark ? "#059669" : "#047857",
        contrastText: "#ffffff"
      },
      error: {
        main: "#f43f5e"
      },
      warning: {
        main: isDark ? "#fb923c" : "#ea580c"
      },
      background: {
        default: isDark ? "#0a0f1d" : "#f8fafc",
        paper: isDark ? "#121a2f" : "#ffffff"
      },
      text: {
        primary: isDark ? "#f8fafc" : "#0f172a",
        secondary: isDark ? "#94a3b8" : "#475569"
      },
      divider: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"
    },
    typography: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      h1: {
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 800,
        letterSpacing: "-0.02em"
      },
      h2: {
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 700,
        letterSpacing: "-0.01em"
      },
      h3: {
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 700
      },
      h4: {
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 600
      },
      h5: {
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 600
      },
      h6: {
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 600
      },
      button: {
        textTransform: "none",
        fontWeight: 600
      }
    },
    shape: {
      borderRadius: 12
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: "8px 20px",
            transition: "all 0.2s ease-in-out"
          },
          containedPrimary: {
            background: isDark
              ? "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)"
              : "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
            color: "#ffffff",
            boxShadow: isDark
              ? "0 4px 14px 0 rgba(245, 158, 11, 0.35)"
              : "0 4px 14px 0 rgba(217, 119, 6, 0.25)",
            "&:hover": {
              background: isDark
                ? "linear-gradient(135deg, #fbbf24 0%, #f97316 100%)"
                : "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              boxShadow: isDark
                ? "0 6px 20px 0 rgba(245, 158, 11, 0.5)"
                : "0 6px 20px 0 rgba(217, 119, 6, 0.4)"
            }
          },
          containedSecondary: {
            background: isDark
              ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
              : "linear-gradient(135deg, #059669 0%, #047857 100%)",
            boxShadow: isDark
              ? "0 4px 14px 0 rgba(16, 185, 129, 0.35)"
              : "0 4px 14px 0 rgba(5, 150, 105, 0.25)",
            "&:hover": {
              background: isDark
                ? "linear-gradient(135deg, #34d399 0%, #10b981 100%)"
                : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              boxShadow: isDark
                ? "0 6px 20px 0 rgba(16, 185, 129, 0.5)"
                : "0 6px 20px 0 rgba(5, 150, 105, 0.4)"
            }
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? "#121a2f" : "#ffffff",
            backgroundImage: "none",
            borderRadius: 16,
            border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
            boxShadow: isDark
              ? "0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3)"
              : "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)",
            transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
            "&:hover": {
              borderColor: isDark ? "rgba(245, 158, 11, 0.4)" : "rgba(217, 119, 6, 0.4)",
              boxShadow: isDark
                ? "0 20px 30px -10px rgba(0, 0, 0, 0.6), 0 0 15px 1px rgba(245, 158, 11, 0.15)"
                : "0 20px 30px -10px rgba(217, 119, 6, 0.15), 0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            }
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 600
          }
        }
      }
    }
  });
};

export const theme = getAppTheme("dark");
