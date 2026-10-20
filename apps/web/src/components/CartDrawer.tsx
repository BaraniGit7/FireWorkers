import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  List,
  ListItem,
  Chip
} from "@mui/material";
import {
  X,
  Trash2,
  Plus,
  Minus,
  Clock,
  MapPin,
  CheckCircle2,
  Lock
} from "lucide-react";
import { useCart } from "../context/CartContext.js";
import { useLanguage } from "../context/LanguageContext.js";

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    itemCount,
    subtotal,
    complianceFee,
    gstAmount,
    totalAmount,
    selectedDepot
  } = useCart();

  const { t } = useLanguage();
  const [reservationPlaced, setReservationPlaced] = useState(false);
  const [pickupOtp, setPickupOtp] = useState<string | null>(null);

  const handleCreateReservation = () => {
    // Generate secure 6-digit collection OTP for compliant depot collection
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setPickupOtp(randomOtp);
    setReservationPlaced(true);
  };

  const handleReset = () => {
    clearCart();
    setReservationPlaced(false);
    setPickupOtp(null);
    setIsCartOpen(false);
  };

  return (
    <Drawer
      anchor="right"
      open={isCartOpen}
      onClose={() => setIsCartOpen(false)}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 440 },
          backgroundColor: "background.paper",
          color: "text.primary",
          borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
          display: "flex",
          flexDirection: "column"
        }
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: "'Outfit', 'Noto Sans Tamil', sans-serif" }}>
            {t("depotCartTitle")}
          </Typography>
          <Chip label={`${itemCount} ${t("itemsCountSuffix")}`} size="small" sx={{ backgroundColor: "rgba(245, 158, 11, 0.2)", color: "primary.main", fontWeight: 700, fontSize: "0.7rem" }} />
        </Box>
        <IconButton onClick={() => setIsCartOpen(false)} sx={{ color: "text.secondary" }}>
          <X size={20} />
        </IconButton>
      </Box>

      {/* Reservation Placed Confirmation State */}
      {reservationPlaced ? (
        <Box sx={{ p: 3, textAlign: "center", my: "auto" }}>
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              color: "#10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2.5,
              border: "2px solid #10b981"
            }}
          >
            <CheckCircle2 size={40} />
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: "'Outfit', 'Noto Sans Tamil', sans-serif", mb: 1, color: "text.primary" }}>
            {t("reservationHeldTitle")}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
            {t("reservationHeldDesc")}
          </Typography>

          {/* Secure Collection PIN */}
          <Box
            sx={{
              backgroundColor: (theme) => (theme.palette.mode === "dark" ? "rgba(245, 158, 11, 0.08)" : "rgba(245, 158, 11, 0.12)"),
              border: "1px dashed #f59e0b",
              borderRadius: "12px",
              p: 2.5,
              mb: 3
            }}
          >
            <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {t("collectionOtpLabel")}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: "0.15em", color: "primary.main", my: 1, fontFamily: "monospace" }}>
              {pickupOtp}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.72rem" }}>
              {t("collectionInstructions")}
            </Typography>
          </Box>

          {/* Depot Details */}
          <Box sx={{ textAlign: "left", backgroundColor: (theme) => (theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)"), p: 2, borderRadius: "10px", mb: 3, border: (theme) => `1px solid ${theme.palette.divider}` }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
              <MapPin size={16} color="#f59e0b" />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "text.primary" }}>
                {t("collectionHubLabel")}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8rem" }}>
              {selectedDepot}
            </Typography>
          </Box>

          <Button variant="contained" color="primary" fullWidth onClick={handleReset}>
            {t("doneAndReturn")}
          </Button>
        </Box>
      ) : (
        <>
          {/* Active 15-Minute Anti-Overselling Banner */}
          <Box
            sx={{
              backgroundColor: "rgba(16, 185, 129, 0.08)",
              borderBottom: "1px solid rgba(16, 185, 129, 0.2)",
              px: 2.5,
              py: 1.2,
              display: "flex",
              alignItems: "center",
              gap: 1.2
            }}
          >
            <Clock size={16} color="#10b981" />
            <Typography variant="caption" sx={{ color: "secondary.main", fontWeight: 600, fontSize: "0.75rem" }}>
              {t("reservationActiveNotice")}
            </Typography>
          </Box>

          {/* Cart Items List */}
          <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2.5 }}>
            {items.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Box sx={{ fontSize: "3rem", mb: 1.5 }}>🛒</Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "text.primary", fontFamily: "'Outfit', 'Noto Sans Tamil', sans-serif" }}>
                  {t("emptyCartTitle")}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: 280, mx: "auto", mb: 3 }}>
                  {t("emptyCartDesc")}
                </Typography>
                <Button variant="outlined" color="primary" onClick={() => setIsCartOpen(false)}>
                  {t("browseCatalogBtn")}
                </Button>
              </Box>
            ) : (
              <List disablePadding>
                {items.map(({ product, quantity }) => (
                  <ListItem
                    key={product.id}
                    disableGutters
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      py: 1.8,
                      borderBottom: (theme) => `1px solid ${theme.palette.divider}`
                    }}
                  >
                    <Box
                      component="img"
                      src={product.image}
                      alt={product.name}
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: "8px",
                        objectFit: "cover",
                        backgroundColor: "background.default"
                      }}
                    />

                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "text.primary", lineHeight: 1.2, mb: 0.4 }} noWrap>
                        {product.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "secondary.main", fontWeight: 600, display: "block" }}>
                        ₹{product.salePrice.toFixed(0)} each
                      </Typography>

                      {/* Quantity Controls */}
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center", backgroundColor: (theme) => (theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.04)"), borderRadius: "6px" }}>
                          <IconButton size="small" onClick={() => updateQuantity(product.id, quantity - 1)} sx={{ color: "text.secondary", p: 0.5 }}>
                            <Minus size={14} />
                          </IconButton>
                          <Typography variant="caption" sx={{ px: 1, fontWeight: 700, minWidth: 20, textAlign: "center" }}>
                            {quantity}
                          </Typography>
                          <IconButton size="small" onClick={() => updateQuantity(product.id, quantity + 1)} sx={{ color: "text.secondary", p: 0.5 }}>
                            <Plus size={14} />
                          </IconButton>
                        </Box>

                        <IconButton size="small" onClick={() => removeFromCart(product.id)} sx={{ color: "#f43f5e", ml: "auto" }}>
                          <Trash2 size={16} />
                        </IconButton>
                      </Box>
                    </Box>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <Box sx={{ p: 2.5, backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#0b0f1a" : "#f1f5f9"), borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>
              {/* Statutory Fee Breakdown */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.8 }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>{t("itemsSubtotal")}</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>₹{subtotal.toFixed(2)}</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.8 }}>
                <Typography variant="body2" sx={{ color: "text.secondary", display: "flex", alignItems: "center", gap: 0.5 }}>
                  {t("pesoPackagingFee")}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: "primary.main" }}>₹{complianceFee.toFixed(2)}</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.2 }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>{t("gstTax")}</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>₹{gstAmount.toFixed(2)}</Typography>
              </Box>

              <Divider sx={{ borderColor: (theme) => theme.palette.divider, my: 1.5 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "text.primary" }}>{t("totalAmount")}</Typography>
                <Typography variant="h5" sx={{ fontWeight: 900, color: "primary.main", fontFamily: "'Outfit', sans-serif" }}>
                  ₹{totalAmount.toFixed(2)}
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                startIcon={<Lock size={18} />}
                onClick={handleCreateReservation}
                sx={{
                  py: 1.4,
                  fontSize: "1rem",
                  fontWeight: 800
                }}
              >
                {t("reserveAtDepotBtn")}
              </Button>
            </Box>
          )}
        </>
      )}
    </Drawer>
  );
};
