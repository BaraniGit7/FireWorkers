import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Button,
  Alert
} from "@mui/material";
import {
  Search,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  Volume2,
  CheckCircle2
} from "lucide-react";
import { INITIAL_PRODUCTS, DemoProduct } from "../api/client.js";
import { ProductCard } from "../components/ProductCard.js";
import { useLanguage } from "../context/LanguageContext.js";
import { useMarketplace } from "../context/MarketplaceContext.js";
import { useAuth } from "../context/AuthContext.js";

export const Storefront: React.FC = () => {
  const { t } = useLanguage();
  const { approvedProducts, setCurrentView } = useMarketplace();
  const { user, switchUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [maxSound, setMaxSound] = useState<number | null>(null);

  const isCustomer = !user || user.role === "CUSTOMER";

  const categories = [
    { label: t("catAll"), value: "all" },
    { label: t("catSparklers"), value: "sparklers" },
    { label: t("catChakkars"), value: "ground-chakkars" },
    { label: t("catFlowerPots"), value: "flower-pots" },
    { label: t("catSound"), value: "sound-crackers" },
    { label: t("catAerial"), value: "aerial-shells" },
    { label: t("catGiftBoxes"), value: "gift-boxes" }
  ];

  const filteredProducts = approvedProducts.filter((prod) => {
    const matchesCat = selectedCategory === "all" || prod.categorySlug === selectedCategory;
    const matchesSearch =
      prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSound = maxSound === null || prod.decibelRating <= maxSound;
    return matchesCat && matchesSearch && matchesSound;
  });

  return (
    <Box sx={{ minHeight: "100vh", pb: 10 }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          pt: { xs: 6, md: 10 },
          pb: { xs: 8, md: 12 },
          background: "radial-gradient(ellipse at 50% 0%, rgba(245, 158, 11, 0.18) 0%, rgba(10, 15, 29, 0) 75%)",
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          textAlign: "center"
        }}
      >
        <Container maxWidth="lg">
          {!isCustomer && (
            <Alert
              severity="warning"
              sx={{
                mb: 3,
                textAlign: "left",
                borderRadius: "12px",
                border: "1px solid #f59e0b",
                "& .MuiAlert-message": { width: "100%" }
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                    🔒 வாடிக்கையாளர்களுக்கு (18+) மட்டுமே நேரடி கடை முகப்பு மற்றும் கார்ட் அணுகல்
                  </Typography>
                  <Typography variant="caption" sx={{ display: "block", color: "text.secondary" }}>
                    நீங்கள் {user?.role === "SUPERADMIN" ? "👑 முதன்மை நிர்வாகி (SuperAdmin)" : "🏭 கம்பெனி அட்மின் (Seller)"} ஆக உள்ளீர்கள். வாடிக்கையாளர்களுக்கு ஆர்டர் பதிவு செய்ய உங்கள் போர்ட்டலைப் பயன்படுத்தலாம்.
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  {user?.role === "SELLER" && (
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      onClick={() => setCurrentView("seller")}
                      sx={{ fontWeight: 800, fontSize: "0.75rem" }}
                    >
                      விற்பனையாளர் மையத்திற்கு செல்க
                    </Button>
                  )}
                  {user?.role === "SUPERADMIN" && (
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => setCurrentView("admin")}
                      sx={{ fontWeight: 800, fontSize: "0.75rem" }}
                    >
                      முதன்மை அட்மின் கன்சோல்
                    </Button>
                  )}
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => switchUser("CUSTOMER")}
                    sx={{ fontWeight: 700, fontSize: "0.75rem" }}
                  >
                    வாடிக்கையாளராக மாறுக
                  </Button>
                </Box>
              </Box>
            </Alert>
          )}

          <Chip
            icon={<Sparkles size={14} color="#f59e0b" />}
            label={t("festiveBadge")}
            sx={{
              backgroundColor: "rgba(245, 158, 11, 0.12)",
              color: "primary.main",
              fontWeight: 700,
              fontSize: "0.8rem",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              mb: 3
            }}
          />

          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              fontFamily: "'Outfit', 'Noto Sans Tamil', sans-serif",
              fontSize: { xs: "2.3rem", sm: "3.4rem", md: "4.1rem" },
              lineHeight: 1.15,
              mb: 2.5,
              background: (theme) =>
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #f59e0b 100%)"
                  : "linear-gradient(135deg, #0f172a 0%, #334155 50%, #d97706 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            {t("heroTitle1")}
            <br />
            <Box component="span" sx={{ color: "primary.main", WebkitTextFillColor: "initial" }}>
              {t("heroTitle2")}
            </Box>
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              fontSize: { xs: "0.98rem", md: "1.12rem" },
              maxWidth: 720,
              mx: "auto",
              mb: 4,
              lineHeight: 1.6
            }}
          >
            {t("heroSubtitle")}
          </Typography>

          {/* Search Input Bar */}
          <Box sx={{ maxWidth: 640, mx: "auto", mb: 2 }}>
            <TextField
              fullWidth
              placeholder={t("searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} color="#f59e0b" />
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: "background.paper",
                  borderRadius: "14px",
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  color: "text.primary",
                  fontSize: "1rem",
                  py: 0.5,
                  boxShadow: (theme) =>
                    theme.palette.mode === "dark"
                      ? "0 10px 25px -5px rgba(0, 0, 0, 0.4)"
                      : "0 10px 25px -5px rgba(0, 0, 0, 0.08)",
                  "& fieldset": { border: "none" }
                }
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        {/* Category Pills & Sound Filters */}
        <Box sx={{ mb: 4 }}>
          {/* Category Pills */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              overflowX: "auto",
              pb: 1.5,
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" }
            }}
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.value;
              return (
                <Chip
                  key={cat.value}
                  label={cat.label}
                  clickable
                  onClick={() => setSelectedCategory(cat.value)}
                  sx={{
                    px: 1.5,
                    py: 2.2,
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    borderRadius: "10px",
                    backgroundColor: isSelected
                      ? "primary.main"
                      : (theme) => (theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)"),
                    color: isSelected ? "#ffffff" : "text.secondary",
                    border: (theme) => (isSelected ? "1px solid transparent" : `1px solid ${theme.palette.divider}`),
                    transition: "all 0.2s ease"
                  }}
                />
              );
            })}
          </Box>

          {/* Sound Decibel Quick Filter */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2, flexWrap: "wrap" }}>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, mr: 1, textTransform: "uppercase" }}>
              {t("decibelCap")}
            </Typography>
            <Chip
              size="small"
              label={t("soundAll")}
              clickable
              onClick={() => setMaxSound(null)}
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                backgroundColor: maxSound === null ? "rgba(245, 158, 11, 0.2)" : "transparent",
                color: maxSound === null ? "primary.main" : "text.secondary",
                border: (theme) => `1px solid ${theme.palette.divider}`
              }}
            />
            <Chip
              size="small"
              label={t("soundSilent")}
              clickable
              onClick={() => setMaxSound(0)}
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                backgroundColor: maxSound === 0 ? "rgba(16, 185, 129, 0.2)" : "transparent",
                color: maxSound === 0 ? "secondary.main" : "text.secondary",
                border: (theme) => `1px solid ${theme.palette.divider}`
              }}
            />
            <Chip
              size="small"
              label={t("soundLow")}
              clickable
              onClick={() => setMaxSound(45)}
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                backgroundColor: maxSound === 45 ? "rgba(16, 185, 129, 0.2)" : "transparent",
                color: maxSound === 45 ? "secondary.main" : "text.secondary",
                border: (theme) => `1px solid ${theme.palette.divider}`
              }}
            />
            <Chip
              size="small"
              label={t("soundLegalMax")}
              clickable
              onClick={() => setMaxSound(125)}
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                backgroundColor: maxSound === 125 ? "rgba(245, 158, 11, 0.2)" : "transparent",
                color: maxSound === 125 ? "primary.main" : "text.secondary",
                border: (theme) => `1px solid ${theme.palette.divider}`
              }}
            />
          </Box>
        </Box>

        {/* Product Grid */}
        <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: "'Outfit', 'Noto Sans Tamil', sans-serif", mb: 2.5, color: "text.primary" }}>
          {t("catalogTitle")} ({filteredProducts.length})
        </Typography>

        {filteredProducts.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8, backgroundColor: "background.paper", borderRadius: "16px", border: (theme) => `1px solid ${theme.palette.divider}` }}>
            <Typography variant="h6" sx={{ color: "text.secondary", mb: 1 }}>
              {t("noProducts")}
            </Typography>
            <Button variant="outlined" color="primary" onClick={() => { setSelectedCategory("all"); setSearchTerm(""); setMaxSound(null); }}>
              {t("resetFilters")}
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* 4 Pillars of Regulatory Safety */}
        <Box sx={{ mt: 10, pt: 8, borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>
          <Typography variant="h4" sx={{ fontWeight: 800, textAlign: "center", mb: 5, fontFamily: "'Outfit', 'Noto Sans Tamil', sans-serif" }}>
            {t("whySafeTitle")}
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: "100%", p: 1.5 }}>
                <CardContent>
                  <Box sx={{ width: 44, height: 44, borderRadius: "10px", backgroundColor: "rgba(16, 185, 129, 0.15)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                    <ShieldCheck size={24} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {t("pillar1Title")}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.5 }}>
                    {t("pillar1Desc")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: "100%", p: 1.5 }}>
                <CardContent>
                  <Box sx={{ width: 44, height: 44, borderRadius: "10px", backgroundColor: "rgba(245, 158, 11, 0.15)", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                    <MapPin size={24} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {t("pillar2Title")}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.5 }}>
                    {t("pillar2Desc")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: "100%", p: 1.5 }}>
                <CardContent>
                  <Box sx={{ width: 44, height: 44, borderRadius: "10px", backgroundColor: "rgba(59, 130, 246, 0.15)", color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                    <Clock size={24} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {t("pillar3Title")}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.5 }}>
                    {t("pillar3Desc")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: "100%", p: 1.5 }}>
                <CardContent>
                  <Box sx={{ width: 44, height: 44, borderRadius: "10px", backgroundColor: "rgba(244, 63, 94, 0.15)", color: "#f43f5e", display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                    <CheckCircle2 size={24} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {t("pillar4Title")}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.5 }}>
                    {t("pillar4Desc")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
