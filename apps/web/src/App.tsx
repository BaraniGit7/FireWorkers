import React, { useState } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { theme } from "./theme/theme.js";
import { CartProvider } from "./context/CartContext.js";
import { Navbar } from "./components/Navbar.js";
import { CartDrawer } from "./components/CartDrawer.js";
import { AgeGateModal } from "./components/AgeGateModal.js";
import { Storefront } from "./pages/Storefront.js";

export const App: React.FC = () => {
  const [ageGateOpen, setAgeGateOpen] = useState(false);
  const [isAgeVerified, setIsAgeVerified] = useState(() => {
    return localStorage.getItem("fck_age_verified") === "true";
  });

  const handleVerified = () => {
    setIsAgeVerified(true);
    localStorage.setItem("fck_age_verified", "true");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Box sx={{ minHeight: "100vh", backgroundColor: "#0a0f1d", color: "#f8fafc" }}>
          <Navbar
            onOpenAgeGate={() => setAgeGateOpen(true)}
            searchTerm=""
            onSearchChange={() => {}}
          />

          <Storefront />

          <CartDrawer />

          <AgeGateModal
            open={ageGateOpen}
            onClose={() => setAgeGateOpen(false)}
            onVerified={handleVerified}
          />
        </Box>
      </CartProvider>
    </ThemeProvider>
  );
};
