import React, { useState } from "react";
import { Box } from "@mui/material";
import { AppThemeProvider, useThemeMode } from "./context/ThemeContext.js";
import { LanguageProvider } from "./context/LanguageContext.js";
import { AuthProvider } from "./context/AuthContext.js";
import { CartProvider } from "./context/CartContext.js";
import { Navbar } from "./components/Navbar.js";
import { CartDrawer } from "./components/CartDrawer.js";
import { AgeGateModal } from "./components/AgeGateModal.js";
import { AuthModal } from "./components/AuthModal.js";
import { Storefront } from "./pages/Storefront.js";

const MainLayout: React.FC = () => {
  const [ageGateOpen, setAgeGateOpen] = useState(false);
  const { mode } = useThemeMode();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        color: "text.primary",
        transition: "background-color 0.3s ease, color 0.3s ease"
      }}
    >
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
        onVerified={() => localStorage.setItem("fck_age_verified", "true")}
      />

      <AuthModal />
    </Box>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppThemeProvider>
        <AuthProvider>
          <CartProvider>
            <MainLayout />
          </CartProvider>
        </AuthProvider>
      </AppThemeProvider>
    </LanguageProvider>
  );
};
