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
  Button
} from "@mui/material";
import {
  Search,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  Flame,
  Volume2,
  CheckCircle2,
  HelpCircle
} from "lucide-react";
import { INITIAL_PRODUCTS, DemoProduct } from "../api/client.js";
import { ProductCard } from "../components/ProductCard.js";

const CATEGORIES = [
  { label: "All Fireworks", value: "all" },
  { label: "Sparklers", value: "sparklers" },
  { label: "Ground Chakkars", value: "ground-chakkars" },
  { label: "Flower Pots (Anar)", value: "flower-pots" },
  { label: "Sound Crackers", value: "sound-crackers" },
  { label: "Aerial Shells & Shots", value: "aerial-shells" },
  { label: "Family Gift Boxes", value: "gift-boxes" }
];

export const Storefront: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [maxSound, setMaxSound] = useState<number | null>(null);

  const filteredProducts = INITIAL_PRODUCTS.filter((prod) => {
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
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          textAlign: "center"
        }}
      >
        <Container maxWidth="lg">
          <Chip
            icon={<Sparkles size={14} color="#f59e0b" />}
            label="Diwali 2026 Statutory Compliant Platform"
            sx={{
              backgroundColor: "rgba(245, 158, 11, 0.12)",
              color: "#fbbf24",
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
              fontFamily: "'Outfit', sans-serif",
              fontSize: { xs: "2.4rem", sm: "3.5rem", md: "4.2rem" },
              lineHeight: 1.1,
              mb: 2.5,
              background: "linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #f59e0b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Safe, Certified Green Crackers.
            <br />
            <Box component="span" sx={{ color: "#f59e0b", WebkitTextFillColor: "initial" }}>
              Direct from Licensed Hubs.
            </Box>
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#94a3b8",
              fontSize: { xs: "1rem", md: "1.15rem" },
              maxWidth: 720,
              mx: "auto",
              mb: 4,
              lineHeight: 1.6
            }}
          >
            Supreme Court mandated <strong>CSIR-NEERI certified Green Crackers</strong> with zero toxic Barium salts. Verified PESO storage, click-and-collect fulfillment, and atomic 15-minute checkout reservation.
          </Typography>

          {/* Search Input Bar */}
          <Box sx={{ maxWidth: 640, mx: "auto", mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Search green sparklers, flowerpots, chakkars, low-smoke shells..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} color="#f59e0b" />
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: "rgba(18, 26, 47, 0.8)",
                  borderRadius: "14px",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#f8fafc",
                  fontSize: "1rem",
                  py: 0.5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)",
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
            {CATEGORIES.map((cat) => {
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
                    backgroundColor: isSelected ? "#f59e0b" : "rgba(255, 255, 255, 0.04)",
                    color: isSelected ? "#000000" : "#cbd5e1",
                    border: isSelected ? "1px solid #f59e0b" : "1px solid rgba(255, 255, 255, 0.08)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: isSelected ? "#fbbf24" : "rgba(255, 255, 255, 0.08)"
                    }
                  }}
                />
              );
            })}
          </Box>

          {/* Sound Decibel Quick Filter */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2, flexWrap: "wrap" }}>
            <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 700, mr: 1, textTransform: "uppercase" }}>
              Decibel Cap:
            </Typography>
            <Chip
              size="small"
              label="All Sounds"
              clickable
              onClick={() => setMaxSound(null)}
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                backgroundColor: maxSound === null ? "rgba(245, 158, 11, 0.2)" : "transparent",
                color: maxSound === null ? "#f59e0b" : "#94a3b8",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}
            />
            <Chip
              size="small"
              label="Silent (0 dB)"
              clickable
              onClick={() => setMaxSound(0)}
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                backgroundColor: maxSound === 0 ? "rgba(16, 185, 129, 0.2)" : "transparent",
                color: maxSound === 0 ? "#10b981" : "#94a3b8",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}
            />
            <Chip
              size="small"
              label="Low Noise (≤ 45 dB)"
              clickable
              onClick={() => setMaxSound(45)}
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                backgroundColor: maxSound === 45 ? "rgba(16, 185, 129, 0.2)" : "transparent",
                color: maxSound === 45 ? "#10b981" : "#94a3b8",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}
            />
            <Chip
              size="small"
              label="Legal Max (≤ 125 dB)"
              clickable
              onClick={() => setMaxSound(125)}
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                backgroundColor: maxSound === 125 ? "rgba(245, 158, 11, 0.2)" : "transparent",
                color: maxSound === 125 ? "#f59e0b" : "#94a3b8",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}
            />
          </Box>
        </Box>

        {/* Product Grid */}
        <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: "'Outfit', sans-serif", mb: 2.5, color: "#f8fafc" }}>
          Certified Green Cracker Catalog ({filteredProducts.length})
        </Typography>

        {filteredProducts.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8, backgroundColor: "rgba(255, 255, 255, 0.02)", borderRadius: "16px" }}>
            <Typography variant="h6" sx={{ color: "#cbd5e1", mb: 1 }}>
              No certified fireworks match your filter criteria.
            </Typography>
            <Button variant="outlined" color="primary" onClick={() => { setSelectedCategory("all"); setSearchTerm(""); setMaxSound(null); }}>
              Reset Filters
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
        <Box sx={{ mt: 10, pt: 8, borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <Typography variant="h4" sx={{ fontWeight: 800, textAlign: "center", mb: 5, fontFamily: "'Outfit', sans-serif" }}>
            Why FireWorks is India's Safest Platform
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: "100%", p: 1.5 }}>
                <CardContent>
                  <Box sx={{ width: 44, height: 44, borderRadius: "10px", backgroundColor: "rgba(16, 185, 129, 0.15)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                    <ShieldCheck size={24} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    CSIR-NEERI Certified
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#94a3b8", lineHeight: 1.5 }}>
                    Every batch features a scannable QR verification code. Particulate emissions are cut by 30-35%.
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
                    Licensed Depot Pickup
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#94a3b8", lineHeight: 1.5 }}>
                    Zero illegal courier transit. Secure collection at PESO-licensed Form LE-5 godowns with physical ID proof.
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
                    15-Min Atomic Locks
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#94a3b8", lineHeight: 1.5 }}>
                    Zero overselling. Inventory is locked at checkout so you never face unfulfillable depot orders.
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
                    100% Barium Free
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#94a3b8", lineHeight: 1.5 }}>
                    Strict Supreme Court compliance. Banned formulations (Barium, Antimony, Lithium, Lead) are permanently blacklisted.
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
