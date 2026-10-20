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
  Chip
} from "@mui/material";
import { ShoppingBag, ShieldCheck, MapPin, Sparkles, AlertTriangle } from "lucide-react";
import { useCart } from "../context/CartContext.js";

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
  const { itemCount, setIsCartOpen, selectedDepot } = useCart();

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "rgba(10, 15, 29, 0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
        zIndex: 1100
      }}
    >
      {/* Statutory Regulatory Banner */}
      <Box
        sx={{
          backgroundColor: "rgba(245, 158, 11, 0.12)",
          borderBottom: "1px solid rgba(245, 158, 11, 0.25)",
          py: 0.6,
          px: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
          fontSize: "0.78rem",
          color: "#fbbf24",
          fontWeight: 500,
          textAlign: "center"
        }}
      >
        <ShieldCheck size={14} color="#10b981" />
        <span>
          <strong>PESO & Explosives Act (1884) Compliant</strong> • CSIR-NEERI Certified Green Crackers (&lt;125 dB) • Authorized Depot Pickup Only
        </span>
        <Chip
          label="Barium-Free"
          size="small"
          sx={{
            height: 18,
            fontSize: "0.65rem",
            backgroundColor: "rgba(16, 185, 129, 0.2)",
            color: "#34d399",
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
                  background: "linear-gradient(90deg, #fbbf24 0%, #f97316 100%)",
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
                  color: "#94a3b8",
                  fontSize: "0.68rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5
                }}
              >
                <Sparkles size={10} color="#10b981" /> Licensed Marketplace
              </Typography>
            </Box>
          </Box>

          {/* Depot Location Badge */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1,
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "10px",
              px: 2,
              py: 0.8,
              cursor: "pointer"
            }}
          >
            <MapPin size={16} color="#f59e0b" />
            <Box>
              <Typography variant="caption" sx={{ color: "#94a3b8", display: "block", fontSize: "0.65rem", lineHeight: 1 }}>
                Depot Collection Hub
              </Typography>
              <Typography variant="body2" sx={{ color: "#f8fafc", fontWeight: 600, fontSize: "0.8rem" }}>
                Gurugram 122001 (Form LE-5 Approved)
              </Typography>
            </Box>
          </Box>

          {/* Right Actions: Age Gate, Status & Cart */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={onOpenAgeGate}
              startIcon={<ShieldCheck size={16} color="#10b981" />}
              sx={{
                borderColor: "rgba(16, 185, 129, 0.3)",
                color: "#34d399",
                fontSize: "0.75rem",
                display: { xs: "none", sm: "flex" },
                "&:hover": {
                  borderColor: "#10b981",
                  backgroundColor: "rgba(16, 185, 129, 0.1)"
                }
              }}
            >
              18+ Verified
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsCartOpen(true)}
              startIcon={
                <Badge badgeContent={itemCount} color="error" sx={{ "& .MuiBadge-badge": { fontWeight: 700 } }}>
                  <ShoppingBag size={18} />
                </Badge>
              }
              sx={{ px: { xs: 2, sm: 2.5 } }}
            >
              Depot Cart
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
