import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Tooltip
} from "@mui/material";
import { ShieldCheck, Volume2, Plus, Check, Info } from "lucide-react";
import { DemoProduct } from "../api/client.js";
import { useCart } from "../context/CartContext.js";

interface ProductCardProps {
  product: DemoProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const discountPercent = Math.round(
    ((product.basePrice - product.salePrice) / product.basePrice) * 100
  );

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Top Badges */}
      <Box
        sx={{
          position: "absolute",
          top: 12,
          left: 12,
          right: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 2
        }}
      >
        <Chip
          icon={<ShieldCheck size={14} color="#10b981" />}
          label="CSIR-NEERI Green"
          size="small"
          sx={{
            backgroundColor: "rgba(16, 185, 129, 0.9)",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "0.7rem",
            backdropFilter: "blur(6px)"
          }}
        />

        {discountPercent > 0 && (
          <Chip
            label={`${discountPercent}% OFF`}
            size="small"
            sx={{
              backgroundColor: "rgba(225, 29, 72, 0.9)",
              color: "#ffffff",
              fontWeight: 800,
              fontSize: "0.68rem"
            }}
          />
        )}
      </Box>

      {/* Product Image */}
      <Box sx={{ position: "relative", pt: "75%", overflow: "hidden", backgroundColor: "#0f172a" }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease",
            "&:hover": {
              transform: "scale(1.06)"
            }
          }}
        />
      </Box>

      {/* Content */}
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 2.2 }}>
        {/* Category & Sound cap */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography variant="caption" sx={{ color: "#f59e0b", fontWeight: 700, textTransform: "uppercase", fontSize: "0.7rem" }}>
            {product.category}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Volume2 size={13} color="#94a3b8" />
            <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 600, fontSize: "0.7rem" }}>
              {product.decibelRating === 0 ? "Silent (<0 dB)" : `${product.decibelRating} dB`}
            </Typography>
          </Box>
        </Box>

        {/* Product Name */}
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            fontFamily: "'Outfit', sans-serif",
            lineHeight: 1.3,
            mb: 1,
            color: "#f8fafc",
            minHeight: "2.6em",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}
        >
          {product.name}
        </Typography>

        {/* Chemical Formulation / Barium-free statement */}
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            border: "1px dashed rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
            p: 1,
            mb: 1.5,
            display: "flex",
            alignItems: "flex-start",
            gap: 1
          }}
        >
          <Info size={14} color="#10b981" style={{ marginTop: 2, flexShrink: 0 }} />
          <Typography variant="caption" sx={{ color: "#cbd5e1", fontSize: "0.68rem", lineHeight: 1.25 }}>
            <strong>Cert #{product.neeriCertNumber}</strong> • Barium-Free formulation verified.
          </Typography>
        </Box>

        {/* Spacer */}
        <Box sx={{ mt: "auto" }} />

        {/* Price & Action */}
        <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", pt: 1, borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
          <Box>
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.8 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#f59e0b", fontFamily: "'Outfit', sans-serif" }}>
                ₹{product.salePrice.toFixed(0)}
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748b", textDecoration: "line-through", fontSize: "0.8rem" }}>
                ₹{product.basePrice.toFixed(0)}
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: "#10b981", fontSize: "0.65rem", display: "block" }}>
              In Stock ({product.stockQuantity} avail)
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="small"
            onClick={handleAdd}
            color={added ? "secondary" : "primary"}
            startIcon={added ? <Check size={16} /> : <Plus size={16} />}
            sx={{
              borderRadius: "8px",
              py: 0.8,
              px: 1.8,
              fontSize: "0.8rem",
              fontWeight: 700
            }}
          >
            {added ? "Added" : "Add"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
