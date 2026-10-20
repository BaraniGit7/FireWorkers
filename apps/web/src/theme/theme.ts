import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#f59e0b", // Festive golden spark
      light: "#fbbf24",
      dark: "#d97706",
      contrastText: "#000000"
    },
    secondary: {
      main: "#10b981", // CSIR-NEERI Green Cracker Emerald
      light: "#34d399",
      dark: "#059669",
      contrastText: "#ffffff"
    },
    error: {
      main: "#f43f5e"
    },
    warning: {
      main: "#fb923c"
    },
    background: {
      default: "#0a0f1d", // Deep midnight slate
      paper: "#121a2f"
    },
    text: {
      primary: "#f8fafc",
      secondary: "#94a3b8"
    }
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
          background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
          color: "#ffffff",
          boxShadow: "0 4px 14px 0 rgba(245, 158, 11, 0.35)",
          "&:hover": {
            background: "linear-gradient(135deg, #fbbf24 0%, #f97316 100%)",
            boxShadow: "0 6px 20px 0 rgba(245, 158, 11, 0.5)"
          }
        },
        containedSecondary: {
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          boxShadow: "0 4px 14px 0 rgba(16, 185, 129, 0.35)",
          "&:hover": {
            background: "linear-gradient(135deg, #34d399 0%, #10b981 100%)",
            boxShadow: "0 6px 20px 0 rgba(16, 185, 129, 0.5)"
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#121a2f",
          backgroundImage: "none",
          borderRadius: 16,
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3)",
          transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
          "&:hover": {
            borderColor: "rgba(245, 158, 11, 0.4)",
            boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.6), 0 0 15px 1px rgba(245, 158, 11, 0.15)"
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
