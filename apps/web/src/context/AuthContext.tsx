import React, { createContext, useContext, useState } from "react";
import { AuthUser, HARDCODED_USERS, HARDCODED_CUSTOMERS, CustomerRecord } from "../data/index.js";

export type { AuthUser };

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: { email: string; phone: string; password: string; fullName: string; role?: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthModalOpen: boolean;
  authModalTab: "login" | "register";
  openAuthModal: (tab?: "login" | "register") => void;
  closeAuthModal: () => void;
  switchUser: (role: "SUPERADMIN" | "SELLER" | "CUSTOMER", userId?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem("fck_auth_user");
      return saved ? JSON.parse(saved) : HARDCODED_USERS[0];
    } catch {
      return HARDCODED_USERS[0];
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem("fck_auth_token") || "demo-jwt-token";
    } catch {
      return "demo-jwt-token";
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login");

  const openAuthModal = (tab: "login" | "register" = "login") => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (email: string, _password: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.toLowerCase().trim();

    // Check predefined structured demo users
    const found = HARDCODED_USERS.find((u) => u.email.toLowerCase() === cleanEmail);

    if (found) {
      setUser(found);
      setToken("token-" + found.id);
      localStorage.setItem("fck_auth_user", JSON.stringify(found));
      localStorage.setItem("fck_auth_token", "token-" + found.id);
      closeAuthModal();
      return { success: true };
    }

    // Dynamic role mapping if user enters any email
    const inferredRole = cleanEmail.includes("super")
      ? "SUPERADMIN"
      : cleanEmail.includes("seller") || cleanEmail.includes("admin")
      ? "SELLER"
      : "CUSTOMER";

    const customUser: AuthUser = {
      id: "user-" + Date.now(),
      email: cleanEmail,
      role: inferredRole,
      fullName: cleanEmail.split("@")[0].toUpperCase()
    };

    HARDCODED_USERS.push(customUser);
    setUser(customUser);
    setToken("token-" + customUser.id);
    localStorage.setItem("fck_auth_user", JSON.stringify(customUser));
    localStorage.setItem("fck_auth_token", "token-" + customUser.id);
    closeAuthModal();
    return { success: true };
  };

  const register = async (inputData: {
    email: string;
    phone: string;
    password: string;
    fullName: string;
    role?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    const role = (inputData.role as any) || "CUSTOMER";
    const newUser: AuthUser = {
      id: "user-reg-" + Date.now(),
      email: inputData.email.toLowerCase().trim(),
      role: role,
      fullName: `${inputData.fullName} (👤 வாடிக்கையாளர் 18+)`,
      phone: inputData.phone
    };

    HARDCODED_USERS.push(newUser);

    // If customer, also register in customers list
    if (role === "CUSTOMER") {
      const newCustRecord: CustomerRecord = {
        id: "cust-reg-" + Date.now(),
        fullName: inputData.fullName,
        email: newUser.email,
        phone: inputData.phone,
        ageVerified: true,
        address: "வாடிக்கையாளர் பதிவுசெய்த முகவரி",
        registeredAt: new Date().toISOString(),
        addedBy: "SELF_REGISTRATION"
      };
      HARDCODED_CUSTOMERS.push(newCustRecord);
      try {
        const stored = localStorage.getItem("fck_customers");
        const list = stored ? JSON.parse(stored) : [];
        localStorage.setItem("fck_customers", JSON.stringify([newCustRecord, ...list]));
      } catch {}
    }

    setUser(newUser);
    setToken("token-" + newUser.id);
    localStorage.setItem("fck_auth_user", JSON.stringify(newUser));
    localStorage.setItem("fck_auth_token", "token-" + newUser.id);
    closeAuthModal();
    return { success: true };
  };

  const switchUser = (role: "SUPERADMIN" | "SELLER" | "CUSTOMER", userId?: string) => {
    let target = userId ? HARDCODED_USERS.find((u) => u.id === userId) : null;
    if (!target) {
      target = HARDCODED_USERS.find((u) => u.role === role) || HARDCODED_USERS[0];
    }
    setUser(target);
    setToken("token-" + target.id);
    localStorage.setItem("fck_auth_user", JSON.stringify(target));
    localStorage.setItem("fck_auth_token", "token-" + target.id);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("fck_auth_user");
    localStorage.removeItem("fck_auth_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        switchUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
