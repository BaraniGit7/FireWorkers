import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Badge,
  Container,
  Chip,
  Tooltip
} from "@mui/material";
import {
  ShoppingBag,
  ShieldCheck,
  MapPin,
  Sparkles,
  Sun,
  Moon,
  LogIn,
  LogOut,
  UserCheck,
  Languages
} from "lucide-react";
import { useCart } from "../context/CartContext.js";
import { useThemeMode } from "../context/ThemeContext.js";
import { useAuth } from "../context/AuthContext.js";
import { useLanguage } from "../context/LanguageContext.js";

interface NavbarProps {
  onOpenAgeGate: () => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAgeGate,
  searchTerm,
  onSearchChange
}) => {
  const { itemCount, setIsCartOpen } = useCart();
  const { mode, toggleTheme } = useThemeMode();
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();

  const isDark = mode === "dark";

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: isDark ? "rgba(10, 15, 29, 0.85)" : "rgba(255, 255, 255, 0.88)",
        backdropFilter: "blur(16px)",
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        boxShadow: isDark
          ? "0 4px 30px rgba(0, 0, 0, 0.5)"
          : "0 4px 20px rgba(0, 0, 0, 0.06)",
        color: "text.primary",
        zIndex: 1100
      }}
    >
      {/* Statutory Regulatory Banner */}
      <Box
        sx={{
          backgroundColor: isDark ? "rgba(245, 158, 11, 0.12)" : "rgba(245, 158, 11, 0.18)",
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          py: 0.6,
          px: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
          fontSize: "0.78rem",
          color: isDark ? "#fbbf24" : "#b45309",
          fontWeight: 600,
          textAlign: "center"
        }}
      >
        <ShieldCheck size={14} color="#10b981" />
        <span>{t("regulatoryBanner")}</span>
        <Chip
          label={t("bariumFree")}
          size="small"
          sx={{
            height: 18,
            fontSize: "0.65rem",
            backgroundColor: isDark ? "rgba(16, 185, 129, 0.2)" : "rgba(16, 185, 129, 0.15)",
            color: isDark ? "#34d399" : "#047857",
            fontWeight: 700
          }}
        />
      </Box>

      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between", py: 1, px: { xs: 0, md: 1 } }}>
          {/* Logo & Brand */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "12px",
                background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(245, 158, 11, 0.4)",
                fontSize: "1.5rem"
              }}
            >
              🧨
            </Box>
            <Box>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: 800,
                  fontFamily: "'Outfit', sans-serif",
                  background: isDark
                    ? "linear-gradient(90deg, #fbbf24 0%, #f97316 100%)"
                    : "linear-gradient(90deg, #d97706 0%, #ea580c 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1.1
                }}
              >
                FireWorks
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontSize: "0.68rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5
                }}
              >
                <Sparkles size={10} color="#10b981" /> {t("marketplaceSubtitle")}
              </Typography>
            </Box>
          </Box>

          {/* Depot Location Badge */}
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              alignItems: "center",
              gap: 1,
              backgroundColor: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.03)",
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: "10px",
              px: 2,
              py: 0.8
            }}
          >
            <MapPin size={16} color="#f59e0b" />
            <Box>
              <Typography variant="caption" sx={{ color: "text.secondary", display: "block", fontSize: "0.65rem", lineHeight: 1 }}>
                {t("depotCollectionHub")}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 600, fontSize: "0.8rem" }}>
                {t("depotLocation")}
              </Typography>
            </Box>
          </Box>

          {/* Right Actions: Language Switcher, Theme Toggle, Auth, Age Gate & Cart */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Language Switcher Button (English / தமிழ்) */}
            <Tooltip title={language === "en" ? "தமிழுக்கு மாற்றுக" : "Switch to English"}>
              <Button
                variant="outlined"
                size="small"
                onClick={toggleLanguage}
                startIcon={<Languages size={15} color="#f59e0b" />}
                sx={{
                  borderColor: (theme) => theme.palette.divider,
                  color: "text.primary",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  px: 1.5,
                  minWidth: "auto",
                  borderRadius: "9px"
                }}
              >
                {language === "en" ? "தமிழ்" : "EN"}
              </Button>
            </Tooltip>

            {/* Theme Switcher Button */}
            <Tooltip title={isDark ? t("switchThemeLight") : t("switchThemeDark")}>
              <IconButton
                onClick={toggleTheme}
                sx={{
                  backgroundColor: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.04)",
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  color: isDark ? "#fbbf24" : "#475569",
                  "&:hover": {
                    backgroundColor: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)"
                  }
                }}
              >
                {isDark ? <Sun size={17} /> : <Moon size={17} />}
              </IconButton>
            </Tooltip>

            {/* Statutory Age Gate Button */}
            <Button
              variant="outlined"
              size="small"
              onClick={onOpenAgeGate}
              startIcon={<ShieldCheck size={16} color="#10b981" />}
              sx={{
                borderColor: "rgba(16, 185, 129, 0.35)",
                color: isDark ? "#34d399" : "#059669",
                fontSize: "0.75rem",
                display: { xs: "none", sm: "flex" },
                "&:hover": {
                  borderColor: "#10b981",
                  backgroundColor: "rgba(16, 185, 129, 0.08)"
                }
              }}
            >
              {t("ageVerifiedBtn")}
            </Button>

            {/* Authentication Button & User Profile */}
            {isAuthenticated && user ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Chip
                  icon={<UserCheck size={14} color="#10b981" />}
                  label={`${user.fullName.split(" ")[0]} (${user.role})`}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    backgroundColor: isDark ? "rgba(245, 158, 11, 0.15)" : "rgba(217, 119, 6, 0.12)",
                    color: isDark ? "#f59e0b" : "#b45309",
                    border: (theme) => `1px solid ${theme.palette.divider}`
                  }}
                />
                <Tooltip title={t("signOut")}>
                  <IconButton onClick={logout} size="small" sx={{ color: "error.main" }}>
                    <LogOut size={16} />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              <Button
                variant="outlined"
                size="small"
                onClick={() => openAuthModal("login")}
                startIcon={<LogIn size={16} />}
                sx={{
                  borderColor: (theme) => theme.palette.divider,
                  color: "text.primary",
                  fontSize: "0.8rem",
                  "&:hover": {
                    borderColor: "primary.main",
                    backgroundColor: "rgba(245, 158, 11, 0.08)"
                  }
                }}
              >
                {t("signIn")}
              </Button>
            )}

            {/* Cart Drawer Trigger */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsCartOpen(true)}
              startIcon={
                <Badge badgeContent={itemCount} color="error" sx={{ "& .MuiBadge-badge": { fontWeight: 700 } }}>
                  <ShoppingBag size={18} />
                </Badge>
              }
              sx={{ px: { xs: 1.8, sm: 2.2 } }}
            >
              {t("cart")}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
