import React, { createContext, useContext, useState, useEffect } from "react";
import { DemoProduct } from "../api/client.js";

export interface CartItem {
  product: DemoProduct;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: DemoProduct, qty?: number) => void;
  updateQuantity: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  complianceFee: number;
  gstAmount: number;
  totalAmount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedDepot: string;
  setSelectedDepot: (depot: string) => void;
  activeReservationExpiresAt: number | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("fck_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedDepot, setSelectedDepot] = useState("PESO Licensed Hub #04, Sector 14, Gurugram (122001)");
  const [activeReservationExpiresAt, setActiveReservationExpiresAt] = useState<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem("fck_cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  const addToCart = (product: DemoProduct, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        const newQty = Math.min(10, existing.quantity + qty);
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      }
      return [...prev, { product, quantity: Math.min(10, qty) }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: Math.min(10, qty) } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
    setActiveReservationExpiresAt(null);
  };

  const itemCount = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = items.reduce((acc, curr) => acc + curr.product.salePrice * curr.quantity, 0);
  const complianceFee = itemCount > 0 ? 49.0 : 0.0;
  const gstAmount = Math.round(subtotal * 0.18 * 100) / 100;
  const totalAmount = subtotal + complianceFee + gstAmount;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        itemCount,
        subtotal,
        complianceFee,
        gstAmount,
        totalAmount,
        isCartOpen,
        setIsCartOpen,
        selectedDepot,
        setSelectedDepot,
        activeReservationExpiresAt
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
