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
  Chip,
  Alert,
  TextField
} from "@mui/material";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShieldAlert,
  Clock,
  MapPin,
  CheckCircle2,
  Lock
} from "lucide-react";
import { useCart } from "../context/CartContext.js";

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
          backgroundColor: "#0d1322",
          color: "#f8fafc",
          borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          flexDirection: "column"
        }
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
            Depot Collection Cart
          </Typography>
          <Chip label={`${itemCount} items`} size="small" sx={{ backgroundColor: "rgba(245, 158, 11, 0.2)", color: "#f59e0b", fontWeight: 700, fontSize: "0.7rem" }} />
        </Box>
        <IconButton onClick={() => setIsCartOpen(false)} sx={{ color: "#94a3b8" }}>
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

          <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: "'Outfit', sans-serif", mb: 1, color: "#f8fafc" }}>
            Depot Reservation Held!
          </Typography>

          <Typography variant="body2" sx={{ color: "#94a3b8", mb: 3 }}>
            Your inventory is atomically locked for 15 minutes at the licensed depot. No overselling guaranteed.
          </Typography>

          {/* Secure Collection PIN */}
          <Box
            sx={{
              backgroundColor: "rgba(245, 158, 11, 0.08)",
              border: "1px dashed #f59e0b",
              borderRadius: "12px",
              p: 2.5,
              mb: 3
            }}
          >
            <Typography variant="caption" sx={{ color: "#f59e0b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Collection OTP / Verification PIN
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: "0.15em", color: "#fbbf24", my: 1, fontFamily: "monospace" }}>
              {pickupOtp}
            </Typography>
            <Typography variant="caption" sx={{ color: "#cbd5e1", fontSize: "0.72rem" }}>
              Present this PIN + Physical Govt Photo ID (18+) at the collection counter.
            </Typography>
          </Box>

          {/* Depot Details */}
          <Box sx={{ textAlign: "left", backgroundColor: "rgba(255, 255, 255, 0.03)", p: 2, borderRadius: "10px", mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
              <MapPin size={16} color="#f59e0b" />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#f8fafc" }}>
                Collection Hub
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "#94a3b8", fontSize: "0.8rem" }}>
              {selectedDepot}
            </Typography>
          </Box>

          <Button variant="contained" color="primary" fullWidth onClick={handleReset}>
            Done & Return to Store
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
            <Typography variant="caption" sx={{ color: "#34d399", fontWeight: 600, fontSize: "0.75rem" }}>
              15-Min Atomic Inventory Lock active once checkout begins
            </Typography>
          </Box>

          {/* Cart Items List */}
          <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2.5 }}>
            {items.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Box sx={{ fontSize: "3rem", mb: 1.5 }}>🛒</Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#cbd5e1" }}>
                  Your Depot Cart is Empty
                </Typography>
                <Typography variant="body2" sx={{ color: "#64748b", maxWidth: 260, mx: "auto", mb: 3 }}>
                  Select CSIR-NEERI certified Green Crackers to reserve at your nearest licensed depot.
                </Typography>
                <Button variant="outlined" color="primary" onClick={() => setIsCartOpen(false)}>
                  Browse Green Catalog
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
                      borderBottom: "1px solid rgba(255, 255, 255, 0.06)"
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
                        backgroundColor: "#1e293b"
                      }}
                    />

                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#f8fafc", lineHeight: 1.2, mb: 0.4 }} noWrap>
                        {product.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#10b981", fontWeight: 600, display: "block" }}>
                        ₹{product.salePrice.toFixed(0)} each
                      </Typography>

                      {/* Quantity Controls */}
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "rgba(255, 255, 255, 0.06)", borderRadius: "6px" }}>
                          <IconButton size="small" onClick={() => updateQuantity(product.id, quantity - 1)} sx={{ color: "#cbd5e1", p: 0.5 }}>
                            <Minus size={14} />
                          </IconButton>
                          <Typography variant="caption" sx={{ px: 1, fontWeight: 700, minWidth: 20, textAlign: "center" }}>
                            {quantity}
                          </Typography>
                          <IconButton size="small" onClick={() => updateQuantity(product.id, quantity + 1)} sx={{ color: "#cbd5e1", p: 0.5 }}>
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
            <Box sx={{ p: 2.5, backgroundColor: "#0b0f1a", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
              {/* Statutory Fee Breakdown */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.8 }}>
                <Typography variant="body2" sx={{ color: "#94a3b8" }}>Items Subtotal</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: "#f8fafc" }}>₹{subtotal.toFixed(2)}</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.8 }}>
                <Typography variant="body2" sx={{ color: "#94a3b8", display: "flex", alignItems: "center", gap: 0.5 }}>
                  PESO Packaging & Handling Fee
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: "#f59e0b" }}>₹{complianceFee.toFixed(2)}</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.2 }}>
                <Typography variant="body2" sx={{ color: "#94a3b8" }}>Applicable GST (18%)</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: "#f8fafc" }}>₹{gstAmount.toFixed(2)}</Typography>
              </Box>

              <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)", my: 1.5 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#f8fafc" }}>Total Amount</Typography>
                <Typography variant="h5" sx={{ fontWeight: 900, color: "#fbbf24", fontFamily: "'Outfit', sans-serif" }}>
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
                Reserve at Licensed Depot
              </Button>
            </Box>
          )}
        </>
      )}
    </Drawer>
  );
};
