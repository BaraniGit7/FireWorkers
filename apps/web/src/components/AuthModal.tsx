import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  IconButton,
  CircularProgress,
  Divider,
  Card,
  CardActionArea
} from "@mui/material";
import { X, Lock, Mail, Phone, User, Sparkles, Building2, Crown, Factory, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext.js";
import { useLanguage } from "../context/LanguageContext.js";
import { useMarketplace } from "../context/MarketplaceContext.js";

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalTab,
    openAuthModal,
    login,
    register,
    user: currentUser
  } = useAuth();
  const { setCurrentView } = useMarketplace();
  const { t } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("CUSTOMER");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (_: any, newTab: "login" | "register") => {
    setErrorMsg(null);
    openAuthModal(newTab);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (!res.success) setErrorMsg(res.error || "Login failed");
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    const res = await register({ email, phone, password, fullName, role });
    setLoading(false);
    if (!res.success) setErrorMsg(res.error || "Registration failed");
  };

  // 1-click demo login — also routes to the correct view
  const handleQuickLogin = async (
    demoEmail: string,
    demoPass: string,
    targetRole: "SUPERADMIN" | "SELLER" | "CUSTOMER"
  ) => {
    setLoading(true);
    await login(demoEmail, demoPass);
    setLoading(false);
    if (targetRole === "SUPERADMIN") setCurrentView("admin");
    else if (targetRole === "SELLER") setCurrentView("seller");
    else setCurrentView("storefront");
  };

  // Demo role card definitions
  const demoRoles = [
    {
      label: "👑 SuperAdmin",
      sublabel: "முழு அணுகல் · கம்பெனி நிர்வாகம்",
      email: "admin@fireworks.com",
      pass: "Admin@12345",
      role: "SUPERADMIN" as const,
      color: "#ef4444",
      bg: "rgba(239,68,68,0.09)",
      border: "rgba(239,68,68,0.35)",
      icon: <Crown size={20} color="#ef4444" />
    },
    {
      label: "🏭 சிவகாசி ஸ்பார்க்ளர்ஸ்",
      sublabel: "கம்பெனி அட்மின் 1 · விற்பனை போர்டல்",
      email: "seller.sivakasi@fireworks.com",
      pass: "Seller@12345",
      role: "SELLER" as const,
      color: "#10b981",
      bg: "rgba(16,185,129,0.09)",
      border: "rgba(16,185,129,0.35)",
      icon: <Factory size={20} color="#10b981" />
    },
    {
      label: "🏭 மீனாட்சி பட்டாசு",
      sublabel: "கம்பெனி அட்மின் 2 · 2வது நிறுவனம்",
      email: "seller.meenakshi@fireworks.com",
      pass: "Seller@12345",
      role: "SELLER" as const,
      color: "#3b82f6",
      bg: "rgba(59,130,246,0.09)",
      border: "rgba(59,130,246,0.35)",
      icon: <Factory size={20} color="#3b82f6" />
    },
    {
      label: "👤 வாடிக்கையாளர் (18+)",
      sublabel: "கடை முகப்பு & கார்ட் மட்டுமே",
      email: "customer@fireworks.com",
      pass: "Customer@12345",
      role: "CUSTOMER" as const,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.09)",
      border: "rgba(245,158,11,0.35)",
      icon: <User size={20} color="#f59e0b" />
    }
  ];

  return (
    <Dialog
      open={isAuthModalOpen}
      onClose={closeAuthModal}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          backgroundColor: "background.paper",
          color: "text.primary",
          border: (theme) => `1px solid ${theme.palette.divider}`,
          boxShadow: "0 30px 60px -12px rgba(0,0,0,0.55)"
        }
      }}
    >
      {/* Header */}
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: 1, pt: 2.5, px: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "11px",
              background: "linear-gradient(135deg,#f59e0b 0%,#ea580c 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff"
            }}
          >
            <Lock size={18} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: "'Noto Sans Tamil','Outfit',sans-serif", lineHeight: 1.2 }}>
              {t("authTitle")}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {t("authSubtitle")}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={closeAuthModal} size="small" sx={{ color: "text.secondary" }}>
          <X size={18} />
        </IconButton>
      </DialogTitle>

      <Box sx={{ px: 3 }}>
        <Tabs
          value={authModalTab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Tab value="login" label={t("tabSignIn")} sx={{ fontWeight: 700 }} />
          <Tab value="register" label={t("tabCreateAccount")} sx={{ fontWeight: 700 }} />
        </Tabs>
      </Box>

      <DialogContent sx={{ px: 3, pt: 2.5, pb: 4 }}>
        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2.5, borderRadius: "10px" }}>
            {errorMsg}
          </Alert>
        )}

        {authModalTab === "login" && (
          <>
            {/* ── 1-Click Role Login Cards ─────────────────────────── */}
            <Box sx={{ mb: 2.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1.5 }}>
                <Sparkles size={13} color="#f59e0b" />
                <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {t("demoProfilesTitle")}
                </Typography>
              </Box>

              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
                {demoRoles.map((r) => {
                  const isActive = currentUser?.email === r.email;
                  return (
                    <Card
                      key={r.email}
                      variant="outlined"
                      sx={{
                        borderRadius: "12px",
                        border: `1.5px solid ${isActive ? r.color : r.border}`,
                        backgroundColor: isActive ? r.bg : "transparent",
                        transition: "all 0.18s",
                        "&:hover": { backgroundColor: r.bg, borderColor: r.color }
                      }}
                    >
                      <CardActionArea
                        onClick={() => handleQuickLogin(r.email, r.pass, r.role)}
                        disabled={loading}
                        sx={{ p: 1.4, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 0.5 }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                          {r.icon}
                          {isActive && (
                            <Box
                              sx={{
                                ml: "auto",
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                backgroundColor: r.color,
                                flexShrink: 0
                              }}
                            />
                          )}
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 800, fontSize: "0.78rem", color: isActive ? r.color : "text.primary", lineHeight: 1.3, fontFamily: "'Noto Sans Tamil','Outfit',sans-serif" }}
                        >
                          {r.label}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ fontSize: "0.65rem", color: "text.secondary", lineHeight: 1.3, fontFamily: "'Noto Sans Tamil','Inter',sans-serif" }}
                        >
                          {r.sublabel}
                        </Typography>
                      </CardActionArea>
                    </Card>
                  );
                })}
              </Box>
            </Box>

            <Divider sx={{ mb: 2.5 }}>
              <Typography variant="caption" sx={{ color: "text.secondary", px: 1 }}>
                அல்லது நேரடியாக உள்நுழைக · OR
              </Typography>
            </Divider>

            {/* Manual login form */}
            <Box component="form" onSubmit={handleLoginSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label={t("emailLabel")}
                type="email"
                required
                fullWidth
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: <Mail size={16} style={{ marginRight: 8, opacity: 0.55 }} />
                }}
              />
              <TextField
                label={t("passwordLabel")}
                type="password"
                required
                fullWidth
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: <Lock size={16} style={{ marginRight: 8, opacity: 0.55 }} />
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{ py: 1, fontWeight: 700 }}
              >
                {loading ? <CircularProgress size={22} color="inherit" /> : t("signInSubmit")}
              </Button>
            </Box>
          </>
        )}

        {authModalTab === "register" && (
          <Box component="form" onSubmit={handleRegisterSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Role selector */}
            <Box sx={{ display: "flex", gap: 1, mb: 0.5 }}>
              <Button
                variant={role === "CUSTOMER" ? "contained" : "outlined"}
                size="small"
                onClick={() => setRole("CUSTOMER")}
                fullWidth
                startIcon={<User size={15} />}
                sx={{ fontWeight: 700 }}
              >
                {t("customerTab")}
              </Button>
              <Button
                variant={role === "SELLER" ? "contained" : "outlined"}
                size="small"
                color="secondary"
                onClick={() => setRole("SELLER")}
                fullWidth
                startIcon={<Building2 size={15} />}
                sx={{ fontWeight: 700 }}
              >
                {t("sellerTab")}
              </Button>
            </Box>

            <TextField
              label={t("fullNameLabel")}
              required
              fullWidth
              size="small"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              InputProps={{ startAdornment: <User size={16} style={{ marginRight: 8, opacity: 0.55 }} /> }}
            />
            <TextField
              label={t("emailLabel")}
              type="email"
              required
              fullWidth
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{ startAdornment: <Mail size={16} style={{ marginRight: 8, opacity: 0.55 }} /> }}
            />
            <TextField
              label={t("phoneLabel")}
              required
              fullWidth
              size="small"
              placeholder="9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              InputProps={{ startAdornment: <Phone size={16} style={{ marginRight: 8, opacity: 0.55 }} /> }}
            />
            <TextField
              label={t("passwordHint")}
              type="password"
              required
              fullWidth
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{ startAdornment: <Lock size={16} style={{ marginRight: 8, opacity: 0.55 }} /> }}
            />
            <Button
              type="submit"
              variant="contained"
              color={role === "SELLER" ? "secondary" : "primary"}
              fullWidth
              disabled={loading}
              sx={{ py: 1, fontWeight: 700 }}
            >
              {loading ? <CircularProgress size={22} color="inherit" /> : t("createAccountSubmit")}
            </Button>
          </Box>
        )}

        {/* Age verification footer note */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mt: 2.5, opacity: 0.65 }}>
          <ShieldCheck size={13} color="#10b981" />
          <Typography variant="caption" sx={{ fontSize: "0.65rem", color: "text.secondary" }}>
            வயது சரிபார்ப்பு (18+) கட்டாயம் · PESO / Explosives Act 1884 compliance required
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
