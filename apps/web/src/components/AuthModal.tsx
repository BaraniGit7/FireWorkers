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
  Chip,
  CircularProgress
} from "@mui/material";
import { X, Lock, Mail, Phone, User, Sparkles, Building2 } from "lucide-react";
import { useAuth } from "../context/AuthContext.js";
import { useLanguage } from "../context/LanguageContext.js";

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalTab,
    openAuthModal,
    login,
    register
  } = useAuth();
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

    if (!res.success) {
      setErrorMsg(res.error || "Login failed");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const res = await register({
      email,
      phone,
      password,
      fullName,
      role
    });
    setLoading(false);

    if (!res.success) {
      setErrorMsg(res.error || "Registration failed");
    }
  };

  const handleQuickLogin = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    login(demoEmail, demoPass);
  };

  return (
    <Dialog
      open={isAuthModalOpen}
      onClose={closeAuthModal}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "18px",
          backgroundColor: "background.paper",
          color: "text.primary",
          border: (theme) => `1px solid ${theme.palette.divider}`,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
        }
      }}
    >
      {/* Header */}
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: 1, pt: 2.5, px: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff"
            }}
          >
            <Lock size={18} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: "'Outfit', 'Noto Sans Tamil', sans-serif", lineHeight: 1.2 }}>
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

      <DialogContent sx={{ px: 3, pt: 3, pb: 4 }}>
        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2.5, borderRadius: "10px" }}>
            {errorMsg}
          </Alert>
        )}

        {/* 1-Click Quick Demo Login Credentials Bar */}
        {authModalTab === "login" && (
          <Box
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)",
              border: (theme) => `1px dashed ${theme.palette.divider}`,
              borderRadius: "12px",
              p: 2,
              mb: 3
            }}
          >
            <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 700, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
              <Sparkles size={13} /> {t("demoProfilesTitle")}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Chip
                label={t("adminRole")}
                clickable
                onClick={() => handleQuickLogin("admin@fireworks.com", "Admin@12345")}
                size="small"
                sx={{ fontWeight: 700, borderRadius: "8px" }}
              />
              <Chip
                label={t("sellerRole")}
                clickable
                onClick={() => handleQuickLogin("seller.sivakasi@fireworks.com", "Seller@12345")}
                size="small"
                sx={{ fontWeight: 700, borderRadius: "8px" }}
              />
              <Chip
                label={t("customerRole")}
                clickable
                onClick={() => handleQuickLogin("customer@fireworks.com", "Customer@12345")}
                size="small"
                sx={{ fontWeight: 700, borderRadius: "8px" }}
              />
            </Box>
          </Box>
        )}

        {authModalTab === "login" ? (
          /* Login Form */
          <Box component="form" onSubmit={handleLoginSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label={t("emailLabel")}
              type="email"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: <Mail size={18} style={{ marginRight: 8, opacity: 0.6 }} />
              }}
            />

            <TextField
              label={t("passwordLabel")}
              type="password"
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: <Lock size={18} style={{ marginRight: 8, opacity: 0.6 }} />
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={loading}
              sx={{ mt: 1, py: 1.2, fontWeight: 700 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : t("signInSubmit")}
            </Button>
          </Box>
        ) : (
          /* Registration Form */
          <Box component="form" onSubmit={handleRegisterSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", gap: 1, mb: 0.5 }}>
              <Button
                variant={role === "CUSTOMER" ? "contained" : "outlined"}
                size="small"
                onClick={() => setRole("CUSTOMER")}
                fullWidth
                startIcon={<User size={16} />}
              >
                {t("customerTab")}
              </Button>
              <Button
                variant={role === "SELLER" ? "contained" : "outlined"}
                size="small"
                color="secondary"
                onClick={() => setRole("SELLER")}
                fullWidth
                startIcon={<Building2 size={16} />}
              >
                {t("sellerTab")}
              </Button>
            </Box>

            <TextField
              label={t("fullNameLabel")}
              required
              fullWidth
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              InputProps={{
                startAdornment: <User size={18} style={{ marginRight: 8, opacity: 0.6 }} />
              }}
            />

            <TextField
              label={t("emailLabel")}
              type="email"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: <Mail size={18} style={{ marginRight: 8, opacity: 0.6 }} />
              }}
            />

            <TextField
              label={t("phoneLabel")}
              required
              fullWidth
              placeholder="9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              InputProps={{
                startAdornment: <Phone size={18} style={{ marginRight: 8, opacity: 0.6 }} />
              }}
            />

            <TextField
              label={t("passwordHint")}
              type="password"
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: <Lock size={18} style={{ marginRight: 8, opacity: 0.6 }} />
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color={role === "SELLER" ? "secondary" : "primary"}
              fullWidth
              size="large"
              disabled={loading}
              sx={{ mt: 1, py: 1.2, fontWeight: 700 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : t("createAccountSubmit")}
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};
