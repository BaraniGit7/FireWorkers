import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Container,
  Chip,
  Tooltip,
  Button
} from "@mui/material";
import {
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  Sun,
  Moon,
  LogIn,
  LogOut,
  Languages,
  Store,
  Factory,
  Crown,
  User,
  PlusCircle,
  LayoutDashboard
} from "lucide-react";
import { useCart } from "../context/CartContext.js";
import { useThemeMode } from "../context/ThemeContext.js";
import { useAuth } from "../context/AuthContext.js";
import { useLanguage } from "../context/LanguageContext.js";
import { useMarketplace } from "../context/MarketplaceContext.js";

interface NavbarProps {
  onOpenAgeGate: () => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAgeGate }) => {
  const { itemCount, setIsCartOpen } = useCart();
  const { mode, toggleTheme } = useThemeMode();
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const { currentView, setCurrentView, pendingProducts, sellerOrders } = useMarketplace();

  const isDark = mode === "dark";
  const pendingPickupCount = sellerOrders.filter((o) => o.status === "READY_FOR_PICKUP").length;

  const userRole = user?.role || "CUSTOMER";
  const isCustomer = userRole === "CUSTOMER";
  const isSeller = userRole === "SELLER";
  const isSuperAdmin = userRole === "SUPERADMIN";

  // Logout then immediately prompt re-login for role switching
  const handleLogout = () => {
    logout();
    openAuthModal("login");
  };

  // Role colour helpers
  const roleColor = isSuperAdmin ? "#ef4444" : isSeller ? "#10b981" : "#f59e0b";
  const roleBorderColor = isSuperAdmin
    ? "rgba(239,68,68,0.45)"
    : isSeller
    ? "rgba(16,185,129,0.45)"
    : "rgba(245,158,11,0.45)";

  const iconBtnSx = {
    width: 36,
    height: 36,
    borderRadius: "9px",
    border: (theme: any) => `1px solid ${theme.palette.divider}`,
    backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
    "&:hover": {
      backgroundColor: isDark ? "rgba(255,255,255,0.11)" : "rgba(0,0,0,0.08)"
    }
  };

  const navPillSx = (active: boolean, color: string, bgAlpha: string) => ({
    width: 36,
    height: 36,
    borderRadius: "9px",
    border: `1px solid ${active ? color : "transparent"}`,
    backgroundColor: active ? `${color}${bgAlpha}` : "transparent",
    color: color,
    "&:hover": { backgroundColor: `${color}22` }
  });

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: isDark ? "rgba(10,15,29,0.88)" : "rgba(255,255,255,0.9)",
        backdropFilter: "blur(18px)",
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        boxShadow: isDark
          ? "0 4px 30px rgba(0,0,0,0.55)"
          : "0 4px 20px rgba(0,0,0,0.06)",
        color: "text.primary",
        zIndex: 1100
      }}
    >
      {/* Statutory Regulatory Banner */}
      <Box
        sx={{
          backgroundColor: isDark ? "rgba(245,158,11,0.1)" : "rgba(245,158,11,0.15)",
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          py: 0.5,
          px: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
          fontSize: "0.72rem",
          color: isDark ? "#fbbf24" : "#b45309",
          fontWeight: 600,
          textAlign: "center"
        }}
      >
        <ShieldCheck size={13} color="#10b981" />
        <span>{t("regulatoryBanner")}</span>
        <Chip
          label={t("bariumFree")}
          size="small"
          sx={{
            height: 17,
            fontSize: "0.62rem",
            backgroundColor: isDark ? "rgba(16,185,129,0.2)" : "rgba(16,185,129,0.15)",
            color: isDark ? "#34d399" : "#047857",
            fontWeight: 700
          }}
        />
      </Box>

      <Container maxWidth="xl">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            py: 0.8,
            px: { xs: 0, md: 1 },
            minHeight: "56px !important"
          }}
        >
          {/* ── Logo ──────────────────────────────────────────────────────── */}
          <Box
            onClick={() => {
              if (isCustomer) setCurrentView("storefront");
              else if (isSeller) setCurrentView("seller");
              else setCurrentView("admin");
            }}
            sx={{ display: "flex", alignItems: "center", gap: 1.2, cursor: "pointer", flexShrink: 0 }}
          >
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: "10px",
                background: "linear-gradient(135deg,#f59e0b 0%,#ea580c 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 16px rgba(245,158,11,0.38)",
                fontSize: "1.3rem",
                flexShrink: 0
              }}
            >
              🧨
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 800,
                  fontFamily: "'Outfit', sans-serif",
                  background: isDark
                    ? "linear-gradient(90deg,#fbbf24 0%,#f97316 100%)"
                    : "linear-gradient(90deg,#d97706 0%,#ea580c 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1.1,
                  fontSize: "1.1rem"
                }}
              >
                FireWorks
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontSize: "0.6rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.4
                }}
              >
                <Sparkles size={9} color="#10b981" /> {t("marketplaceSubtitle")}
              </Typography>
            </Box>
          </Box>

          {/* ── Centre Nav Icons ──────────────────────────────────────────── */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 0.6,
              p: 0.5,
              borderRadius: "12px",
              backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
              border: (theme) => `1px solid ${theme.palette.divider}`
            }}
          >
            {/* Customer: Storefront */}
            {isCustomer && (
              <Tooltip title={`🛒 ${t("navStorefront")}`} placement="bottom">
                <IconButton
                  onClick={() => setCurrentView("storefront")}
                  sx={navPillSx(currentView === "storefront", "#f59e0b", "25")}
                >
                  <Store size={17} />
                </IconButton>
              </Tooltip>
            )}

            {/* Seller: Seller Hub */}
            {isSeller && (
              <Tooltip title={`🏭 ${t("navSellerHub")}`} placement="bottom">
                <IconButton
                  onClick={() => setCurrentView("seller")}
                  sx={navPillSx(currentView === "seller", "#10b981", "25")}
                >
                  <Badge
                    badgeContent={pendingPickupCount}
                    color="warning"
                    sx={{ "& .MuiBadge-badge": { fontSize: "0.55rem", height: 14, minWidth: 14 } }}
                  >
                    <Factory size={17} />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}

            {/* SuperAdmin: Admin Console */}
            {isSuperAdmin && (
              <>
                <Tooltip title={`👑 ${t("navAdminConsole")}`} placement="bottom">
                  <IconButton
                    onClick={() => setCurrentView("admin")}
                    sx={navPillSx(currentView === "admin", "#ef4444", "22")}
                  >
                    <Badge
                      badgeContent={pendingProducts.length}
                      color="error"
                      sx={{ "& .MuiBadge-badge": { fontSize: "0.55rem", height: 14, minWidth: 14 } }}
                    >
                      <Crown size={17} />
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Tooltip title={`🛒 ${t("navStorefront")} (Preview)`} placement="bottom">
                  <IconButton
                    onClick={() => setCurrentView("storefront")}
                    sx={navPillSx(currentView === "storefront", "#6366f1", "20")}
                  >
                    <LayoutDashboard size={17} />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Box>

          {/* ── Right Action Icons ────────────────────────────────────────── */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>

            {/* Current Role Indicator — click to open Login modal for role switch */}
            <Tooltip title="பங்கு மாற்ற உள்நுழைக · Click to Switch Role" placement="bottom">
              <Chip
                icon={
                  isSuperAdmin ? <Crown size={13} color="#ef4444" /> :
                  isSeller ? <Factory size={13} color="#10b981" /> :
                  <User size={13} color="#f59e0b" />
                }
                onClick={() => openAuthModal("login")}
                size="small"
                sx={{
                  height: 30,
                  borderRadius: "9px",
                  border: `1px solid ${
                    isSuperAdmin ? "rgba(239,68,68,0.45)" :
                    isSeller ? "rgba(16,185,129,0.45)" :
                    "rgba(245,158,11,0.45)"
                  }`,
                  backgroundColor: "transparent",
                  color: isSuperAdmin ? "#ef4444" : isSeller ? "#10b981" : "#f59e0b",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  fontFamily: "'Noto Sans Tamil','Outfit',sans-serif",
                  cursor: "pointer",
                  "& .MuiChip-icon": { ml: 0.5 },
                  "&:hover": {
                    backgroundColor: isSuperAdmin ? "rgba(239,68,68,0.1)" :
                      isSeller ? "rgba(16,185,129,0.1)" :
                      "rgba(245,158,11,0.1)"
                  }
                }}
              />
            </Tooltip>

            {/* Language toggle – icon only */}
            <Tooltip title={language === "en" ? "தமிழுக்கு மாற்று" : "Switch to English"} placement="bottom">
              <IconButton onClick={toggleLanguage} size="small" sx={{ ...iconBtnSx, color: "#f59e0b" }}>
                <Languages size={16} />
              </IconButton>
            </Tooltip>

            {/* Theme toggle */}
            <Tooltip title={isDark ? t("switchThemeLight") : t("switchThemeDark")} placement="bottom">
              <IconButton onClick={toggleTheme} size="small" sx={{ ...iconBtnSx, color: isDark ? "#fbbf24" : "#475569" }}>
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </IconButton>
            </Tooltip>

            {/* Age Gate */}
            <Tooltip title={t("ageVerifiedBtn")} placement="bottom">
              <IconButton
                onClick={onOpenAgeGate}
                size="small"
                sx={{ ...iconBtnSx, color: isDark ? "#34d399" : "#059669", display: { xs: "none", sm: "flex" } }}
              >
                <ShieldCheck size={16} />
              </IconButton>
            </Tooltip>

            {/* Auth */}
            {isAuthenticated && user ? (
              <Tooltip title={`${t("signOut")} · பங்கு மாற்ற மீண்டும் உள்நுழைக`} placement="bottom">
                <IconButton onClick={handleLogout} size="small" sx={{ ...iconBtnSx, color: "error.main" }}>
                  <LogOut size={16} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title={t("signIn")} placement="bottom">
                <IconButton onClick={() => openAuthModal("login")} size="small" sx={{ ...iconBtnSx }}>
                  <LogIn size={16} />
                </IconButton>
              </Tooltip>
            )}

            {/* Cart / Action CTA */}
            {isCustomer ? (
              <Tooltip title={t("cart")} placement="bottom">
                <IconButton
                  onClick={() => setIsCartOpen(true)}
                  size="small"
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "9px",
                    background: "linear-gradient(135deg,#f59e0b,#ea580c)",
                    color: "#fff",
                    "&:hover": { opacity: 0.88 }
                  }}
                >
                  <Badge
                    badgeContent={itemCount}
                    color="error"
                    sx={{ "& .MuiBadge-badge": { fontWeight: 700, fontSize: "0.6rem", height: 15, minWidth: 15 } }}
                  >
                    <ShoppingBag size={17} />
                  </Badge>
                </IconButton>
              </Tooltip>
            ) : isSeller ? (
              <Tooltip title="வாடிக்கையாளர் கார்ட் பதிவு" placement="bottom">
                <IconButton
                  onClick={() => setCurrentView("seller")}
                  size="small"
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "9px",
                    backgroundColor: "#10b981",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#059669" }
                  }}
                >
                  <PlusCircle size={17} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="SuperAdmin Console" placement="bottom">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    px: 1,
                    py: 0.4,
                    borderRadius: "8px",
                    backgroundColor: "rgba(239,68,68,0.14)",
                    border: "1px solid rgba(239,68,68,0.35)"
                  }}
                >
                  <Crown size={14} color="#ef4444" />
                </Box>
              </Tooltip>
            )}
          </Box>
        </Toolbar>

        {/* ── Mobile Bottom Icon Navigation ──────────────────────────────── */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            justifyContent: "center",
            py: 0.7,
            px: 1.5,
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            gap: 1.5
          }}
        >
          {isCustomer && (
            <Tooltip title={`🛒 ${t("navStorefront")}`}>
              <IconButton
                onClick={() => setCurrentView("storefront")}
                sx={navPillSx(currentView === "storefront", "#f59e0b", "28")}
              >
                <Store size={18} />
              </IconButton>
            </Tooltip>
          )}
          {isSeller && (
            <Tooltip title={`🏭 ${t("navSellerHub")}`}>
              <IconButton
                onClick={() => setCurrentView("seller")}
                sx={navPillSx(currentView === "seller", "#10b981", "28")}
              >
                <Badge badgeContent={pendingPickupCount} color="warning">
                  <Factory size={18} />
                </Badge>
              </IconButton>
            </Tooltip>
          )}
          {isSuperAdmin && (
            <>
              <Tooltip title={`👑 ${t("navAdminConsole")}`}>
                <IconButton
                  onClick={() => setCurrentView("admin")}
                  sx={navPillSx(currentView === "admin", "#ef4444", "22")}
                >
                  <Badge badgeContent={pendingProducts.length} color="error">
                    <Crown size={18} />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title={`${t("navStorefront")} Preview`}>
                <IconButton
                  onClick={() => setCurrentView("storefront")}
                  sx={navPillSx(currentView === "storefront", "#6366f1", "20")}
                >
                  <LayoutDashboard size={18} />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
      </Container>
    </AppBar>
  );
};
