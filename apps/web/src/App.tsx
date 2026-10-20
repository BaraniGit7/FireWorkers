import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { AppThemeProvider, useThemeMode } from "./context/ThemeContext.js";
import { LanguageProvider } from "./context/LanguageContext.js";
import { AuthProvider, useAuth } from "./context/AuthContext.js";
import { CartProvider } from "./context/CartContext.js";
import { MarketplaceProvider, useMarketplace } from "./context/MarketplaceContext.js";
import { Navbar } from "./components/Navbar.js";
import { CartDrawer } from "./components/CartDrawer.js";
import { AgeGateModal } from "./components/AgeGateModal.js";
import { AuthModal } from "./components/AuthModal.js";
import { Storefront } from "./pages/Storefront.js";
import { SellerPortal } from "./pages/seller/SellerPortal.js";
import { AdminPortal } from "./pages/admin/AdminPortal.js";

const MainLayout: React.FC = () => {
  const [ageGateOpen, setAgeGateOpen] = useState(false);
  const { mode } = useThemeMode();
  const { currentView, setCurrentView } = useMarketplace();
  const { user } = useAuth();

  // Role-based auto-navigation when active role changes
  useEffect(() => {
    if (user?.role === "SUPERADMIN" || user?.role === "ADMIN") {
      setCurrentView("admin");
    } else if (user?.role === "SELLER") {
      setCurrentView("seller");
    } else if (user?.role === "CUSTOMER") {
      setCurrentView("storefront");
    }
  }, [user?.role]);

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

      {/* Dynamic Portal Routing */}
      {currentView === "storefront" && <Storefront />}
      {currentView === "seller" && <SellerPortal />}
      {currentView === "admin" && <AdminPortal />}

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
            <MarketplaceProvider>
              <MainLayout />
            </MarketplaceProvider>
          </CartProvider>
        </AuthProvider>
      </AppThemeProvider>
    </LanguageProvider>
  );
};
