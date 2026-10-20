import React, { createContext, useContext, useState, useEffect } from "react";
import {
  ManagedProduct,
  MarketplaceOrder,
  OrderItem,
  SellerKYC,
  AuditLogEntry,
  DemoProduct,
  CustomerRecord,
  OrderShippingDetails,
  OrderStatusType,
  HARDCODED_PRODUCTS,
  HARDCODED_ORDERS,
  HARDCODED_SELLERS,
  HARDCODED_AUDIT_LOGS,
  HARDCODED_CUSTOMERS,
  HARDCODED_USERS,
  AuthUser
} from "../data/index.js";

export type {
  ManagedProduct,
  MarketplaceOrder,
  OrderItem,
  SellerKYC,
  AuditLogEntry,
  DemoProduct,
  CustomerRecord,
  OrderShippingDetails,
  OrderStatusType
};

interface MarketplaceContextType {
  // Navigation / View
  currentView: "storefront" | "seller" | "admin";
  setCurrentView: (view: "storefront" | "seller" | "admin") => void;

  // Multi-Company Filter for SuperAdmin
  selectedCompanyFilter: string; // "ALL" or specific company/seller ID
  setSelectedCompanyFilter: (filter: string) => void;

  // Products
  products: ManagedProduct[];
  approvedProducts: ManagedProduct[];
  pendingProducts: ManagedProduct[];
  submitProduct: (newProduct: Omit<ManagedProduct, "id" | "approvalStatus" | "createdAt" | "sellerName" | "sellerPesoLicense" | "isGreenCertified" | "bariumFree">) => { success: boolean; error?: string };
  approveProduct: (productId: string) => void;
  rejectProduct: (productId: string, reason: string) => void;
  updateProductStock: (productId: string, newStock: number) => void;

  // Orders
  orders: MarketplaceOrder[];
  sellerOrders: MarketplaceOrder[];
  createOrderFromCart: (items: { product: DemoProduct; quantity: number }[], depot: string, customerName?: string, customerPhone?: string) => MarketplaceOrder;
  verifyDepotOtp: (orderId: string, enteredOtp: string) => { success: boolean; message: string };
  updateOrderShippingAndStatus: (orderId: string, status: OrderStatusType, shippingDetails?: OrderShippingDetails) => void;
  createOrderByAdminForCustomer: (
    customerId: string,
    items: { product: DemoProduct; quantity: number }[],
    depot: string,
    shippingDetails?: OrderShippingDetails,
    sellerId?: string
  ) => MarketplaceOrder;

  // Sellers & Company Creation (SuperAdmin)
  sellers: SellerKYC[];
  registerSellerKYC: (newSeller: {
    businessName: string;
    tradeName: string;
    gstin?: string;
    pan?: string;
    pesoLicenseNumber: string;
    pesoFormType?: string;
    licenseExpiryDate?: string;
    storageCapacityKg: number;
    magazineAddress: string;
    policeNocNumber: string;
  }) => { success: boolean; error?: string };
  approveSeller: (sellerId: string) => void;
  rejectSeller: (sellerId: string, reason: string) => void;
  createCompanyAdmin: (data: {
    companyName: string;
    tradeName: string;
    pesoLicenseNumber: string;
    storageCapacityKg: number;
    magazineAddress: string;
    policeNocNumber?: string;
    adminName: string;
    adminEmail: string;
    adminPhone: string;
  }) => { success: boolean; error?: string };

  // Customers Management (SuperAdmin + Self-registration)
  customers: CustomerRecord[];
  addCustomerBySuperAdmin: (data: {
    fullName: string;
    email: string;
    phone: string;
    address?: string;
  }) => { success: boolean; error?: string };
  registerCustomerSelf: (data: {
    fullName: string;
    email: string;
    phone: string;
    address?: string;
  }) => { success: boolean; error?: string };

  // Kill Switch
  isKillSwitchActive: boolean;
  toggleKillSwitch: () => void;

  // Audit Logs
  auditLogs: AuditLogEntry[];
  addAuditLog: (
    role: "ADMIN" | "SELLER" | "SYSTEM" | "SUPERADMIN",
    action: string,
    details: string,
    actor?: string,
    category?: "SELLER_COMPLIANCE" | "PRODUCT_MODERATION" | "ORDER_HANDOVER" | "EMERGENCY_CONTROLS",
    statutoryRule?: string,
    companyId?: string
  ) => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<"storefront" | "seller" | "admin">("storefront");
  const [selectedCompanyFilter, setSelectedCompanyFilter] = useState<string>("ALL");

  const [products, setProducts] = useState<ManagedProduct[]>(() => {
    try {
      const saved = localStorage.getItem("fck_managed_products");
      return saved ? JSON.parse(saved) : HARDCODED_PRODUCTS;
    } catch {
      return HARDCODED_PRODUCTS;
    }
  });

  const [orders, setOrders] = useState<MarketplaceOrder[]>(() => {
    try {
      const saved = localStorage.getItem("fck_orders");
      return saved ? JSON.parse(saved) : HARDCODED_ORDERS;
    } catch {
      return HARDCODED_ORDERS;
    }
  });

  const [sellers, setSellers] = useState<SellerKYC[]>(() => {
    try {
      const saved = localStorage.getItem("fck_sellers");
      return saved ? JSON.parse(saved) : HARDCODED_SELLERS;
    } catch {
      return HARDCODED_SELLERS;
    }
  });

  const [customers, setCustomers] = useState<CustomerRecord[]>(() => {
    try {
      const saved = localStorage.getItem("fck_customers");
      return saved ? JSON.parse(saved) : HARDCODED_CUSTOMERS;
    } catch {
      return HARDCODED_CUSTOMERS;
    }
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem("fck_audit_logs");
      return saved ? JSON.parse(saved) : HARDCODED_AUDIT_LOGS;
    } catch {
      return HARDCODED_AUDIT_LOGS;
    }
  });

  const [isKillSwitchActive, setIsKillSwitchActive] = useState<boolean>(() => {
    try {
      return localStorage.getItem("fck_kill_switch") === "true";
    } catch {
      return false;
    }
  });

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem("fck_managed_products", JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem("fck_orders", JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem("fck_sellers", JSON.stringify(sellers));
    } catch {}
  }, [sellers]);

  useEffect(() => {
    try {
      localStorage.setItem("fck_customers", JSON.stringify(customers));
    } catch {}
  }, [customers]);

  useEffect(() => {
    try {
      localStorage.setItem("fck_audit_logs", JSON.stringify(auditLogs));
    } catch {}
  }, [auditLogs]);

  useEffect(() => {
    try {
      localStorage.setItem("fck_kill_switch", String(isKillSwitchActive));
    } catch {}
  }, [isKillSwitchActive]);

  const approvedProducts = products.filter((p) => p.approvalStatus === "APPROVED");
  const pendingProducts = products.filter((p) => p.approvalStatus === "UNDER_REVIEW");
  const sellerOrders = orders.filter((o) => o.sellerId === "demo-seller-id" || true);

  const addAuditLog = (
    role: "ADMIN" | "SELLER" | "SYSTEM" | "SUPERADMIN",
    action: string,
    details: string,
    actor = "system",
    category: "SELLER_COMPLIANCE" | "PRODUCT_MODERATION" | "ORDER_HANDOVER" | "EMERGENCY_CONTROLS" = "SELLER_COMPLIANCE",
    statutoryRule = "Explosives Rules 2008 & PESO Directives",
    companyId?: string
  ) => {
    const entry: AuditLogEntry = {
      id: "log-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
      timestamp: new Date().toISOString(),
      actor,
      role,
      action,
      details,
      category,
      statutoryRule,
      companyId
    };
    setAuditLogs((prev) => [entry, ...prev]);
  };

  const submitProduct = (newProduct: Omit<ManagedProduct, "id" | "approvalStatus" | "createdAt" | "sellerName" | "sellerPesoLicense" | "isGreenCertified" | "bariumFree">) => {
    // Chemical validation: check for banned chemicals
    const lower = newProduct.chemicalComposition.toLowerCase();
    const banned = ["barium", "antimony", "lithium", "mercury", "arsenic", "lead", "chlorate"];
    const foundBanned = banned.find((b) => lower.includes(b));
    if (foundBanned) {
      return {
        success: false,
        error: `Prohibited chemical '${foundBanned.toUpperCase()}' detected! Supreme Court directives strictly ban toxic heavy metals.`
      };
    }

    if (newProduct.decibelRating > 125) {
      return {
        success: false,
        error: `Decibel rating ${newProduct.decibelRating} dB exceeds statutory cap of 125 dB at 4 meters.`
      };
    }

    const created: ManagedProduct = {
      ...newProduct,
      id: "prod-sub-" + Date.now(),
      sellerName: "Sivakasi Sparkles Fireworks Ltd",
      sellerPesoLicense: "E/SC/TN/20/12345(LE-1)",
      isGreenCertified: true,
      bariumFree: true,
      approvalStatus: "UNDER_REVIEW",
      createdAt: new Date().toISOString()
    };

    setProducts((prev) => [created, ...prev]);
    addAuditLog(
      "SELLER",
      "PRODUCT_SUBMISSION",
      `Submitted '${created.name}' (${created.decibelRating} dB) with NEERI cert #${created.neeriCertNumber} for statutory review.`,
      "seller.sivakasi@fireworks.com",
      "PRODUCT_MODERATION",
      "Supreme Court Directive WP 728/2015 & CSIR-NEERI Green Norms"
    );
    return { success: true };
  };

  const approveProduct = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, approvalStatus: "APPROVED", rejectionReason: undefined } : p))
    );
    const prod = products.find((p) => p.id === productId);
    addAuditLog(
      "SUPERADMIN",
      "PRODUCT_GREEN_CERT_APPROVED",
      `Approved '${prod?.name || productId}'. Verified CSIR-NEERI QR and acoustic test report.`,
      "superadmin@fireworks.com",
      "PRODUCT_MODERATION",
      "Supreme Court WP 728/2015 & Rule 125"
    );
  };

  const rejectProduct = (productId: string, reason: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, approvalStatus: "REJECTED", rejectionReason: reason } : p))
    );
    const prod = products.find((p) => p.id === productId);
    addAuditLog(
      "SUPERADMIN",
      "PRODUCT_GREEN_CERT_REJECTED",
      `Rejected '${prod?.name || productId}'. Statutory Violation: ${reason}`,
      "superadmin@fireworks.com",
      "PRODUCT_MODERATION",
      "PESO Green Cracker Mandate"
    );
  };

  const updateProductStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stockQuantity: Math.max(0, newStock) } : p))
    );
    addAuditLog(
      "SELLER",
      "STOCK_UPDATE",
      `Updated inventory for product ${productId} to ${newStock} units in licensed magazine.`,
      "seller.sivakasi@fireworks.com",
      "SELLER_COMPLIANCE",
      "PESO Storage Register Rule 119"
    );
  };

  const createOrderFromCart = (
    cartItems: { product: DemoProduct; quantity: number }[],
    depot: string,
    customerName = "Rahul Sharma (Verified 18+)",
    customerPhone = "9876543212"
  ): MarketplaceOrder => {
    const subtotal = cartItems.reduce((acc, curr) => acc + curr.product.salePrice * curr.quantity, 0);
    const complianceFee = 49.0;
    const gstAmount = Math.round(subtotal * 0.18 * 100) / 100;
    const totalAmount = subtotal + complianceFee + gstAmount;

    // Generate random 6-digit OTP
    const pickupPinOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const orderNumber = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: MarketplaceOrder = {
      id: "ord-" + Date.now(),
      orderNumber,
      customerName,
      customerPhone,
      customerEmail: "customer@fireworks.com",
      sellerId: "demo-seller-id",
      sellerName: "Sivakasi Sparkles Fireworks Ltd",
      items: cartItems.map((c) => ({
        productId: c.product.id,
        productName: c.product.name,
        quantity: c.quantity,
        salePrice: c.product.salePrice,
        neeriCertNumber: c.product.neeriCertNumber
      })),
      subtotal,
      complianceFee,
      gstAmount,
      totalAmount,
      status: "READY_FOR_PICKUP",
      pickupPinOtp,
      depotLocation: depot,
      shippingDetails: {
        carrierType: "LICENSED_DEPOT_PICKUP",
        deliveryNotes: "வாடிக்கையாளர் நேரடியாக கிடங்கில் பெறும் ஆர்டர்."
      },
      createdAt: new Date().toISOString(),
      createdByAdmin: false
    };

    setOrders((prev) => [newOrder, ...prev]);
    addAuditLog(
      "SYSTEM",
      "ORDER_CREATED",
      `Order #${orderNumber} generated by customer with 15-min atomic inventory lock and 6-digit pickup OTP.`,
      customerName,
      "ORDER_HANDOVER",
      "Statutory Depot Handover Regulations"
    );
    return newOrder;
  };

  // Admin creates cart and registers order on behalf of customer
  const createOrderByAdminForCustomer = (
    customerId: string,
    items: { product: DemoProduct; quantity: number }[],
    depot: string,
    shippingDetails?: OrderShippingDetails,
    sellerId = "demo-seller-id"
  ): MarketplaceOrder => {
    const cust = customers.find((c) => c.id === customerId);
    const targetCustomerName = cust ? cust.fullName : "Special Assisted Customer (18+)";
    const targetCustomerPhone = cust ? cust.phone : "9876543212";
    const targetCustomerEmail = cust ? cust.email : "assisted@fireworks.com";

    const subtotal = items.reduce((acc, curr) => acc + curr.product.salePrice * curr.quantity, 0);
    const complianceFee = 49.0;
    const gstAmount = Math.round(subtotal * 0.18 * 100) / 100;
    const totalAmount = subtotal + complianceFee + gstAmount;

    const pickupPinOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const orderNumber = `ADM-ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const sellerObj = sellers.find((s) => s.id === sellerId) || sellers[0];

    const newOrder: MarketplaceOrder = {
      id: "ord-adm-" + Date.now(),
      orderNumber,
      customerName: targetCustomerName,
      customerPhone: targetCustomerPhone,
      customerEmail: targetCustomerEmail,
      sellerId: sellerObj.id,
      sellerName: sellerObj.businessName,
      items: items.map((c) => ({
        productId: c.product.id,
        productName: c.product.name,
        quantity: c.quantity,
        salePrice: c.product.salePrice,
        neeriCertNumber: c.product.neeriCertNumber
      })),
      subtotal,
      complianceFee,
      gstAmount,
      totalAmount,
      status: "CONFIRMED",
      pickupPinOtp,
      depotLocation: depot,
      shippingDetails: shippingDetails || {
        carrierType: "PESO_LICENSED_CARRIER",
        vehicleNumber: "TN-67-AB-9811 (அங்கீகரிக்கப்பட்ட வண்டி)",
        driverName: "K. Selvam",
        driverPhone: "9842144556",
        dispatchDate: new Date().toISOString(),
        deliveryNotes: "அட்மினால் பதிவு செய்யப்பட்ட ஆர்டர் - நேரடி விநியோகம்."
      },
      createdAt: new Date().toISOString(),
      createdByAdmin: true
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Also deduct stock for ordered items
    setProducts((prev) =>
      prev.map((p) => {
        const matchingItem = items.find((i) => i.product.id === p.id);
        if (matchingItem) {
          return { ...p, stockQuantity: Math.max(0, p.stockQuantity - matchingItem.quantity) };
        }
        return p;
      })
    );

    addAuditLog(
      "SELLER",
      "ADMIN_CUSTOMER_CART_CREATED",
      `Company Admin created assisted order #${orderNumber} for customer '${targetCustomerName}' (Phone: ${targetCustomerPhone}). Total: ₹${totalAmount}.`,
      sellerObj.businessName,
      "ORDER_HANDOVER",
      "PESO Order Assistance Rule 104",
      sellerObj.id
    );

    return newOrder;
  };

  const updateOrderShippingAndStatus = (
    orderId: string,
    status: OrderStatusType,
    shippingDetails?: OrderShippingDetails
  ) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            status,
            shippingDetails: shippingDetails || o.shippingDetails,
            handedOverAt: status === "COMPLETED" ? new Date().toISOString() : o.handedOverAt
          };
        }
        return o;
      })
    );

    const ord = orders.find((o) => o.id === orderId);
    addAuditLog(
      "SELLER",
      "ORDER_SHIPPING_AND_STATUS_UPDATED",
      `Updated Order #${ord?.orderNumber || orderId} to status '${status}'. Carrier Vehicle: ${shippingDetails?.vehicleNumber || "N/A"}. Driver: ${shippingDetails?.driverName || "N/A"}.`,
      ord?.sellerName || "Company Admin",
      "ORDER_HANDOVER",
      "Explosives Rules 2008 - Rule 103 Carrier Dispatch Mandate",
      ord?.sellerId
    );
  };

  const verifyDepotOtp = (orderId: string, enteredOtp: string): { success: boolean; message: string } => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) {
      return { success: false, message: "Order not found." };
    }
    if (order.status === "COMPLETED") {
      return { success: false, message: "Order has already been collected." };
    }
    if (order.pickupPinOtp.trim() !== enteredOtp.trim()) {
      return { success: false, message: "Invalid OTP! The PIN entered does not match order record." };
    }

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: "COMPLETED", handedOverAt: new Date().toISOString() }
          : o
      )
    );

    addAuditLog(
      "SELLER",
      "DEPOT_HANDOVER_VERIFIED",
      `Order #${order.orderNumber}: Physical verification verified OTP ${enteredOtp}. Released items to customer.`,
      "seller.sivakasi@fireworks.com",
      "ORDER_HANDOVER",
      "Explosives Rules 2008 - Rule 103"
    );
    return { success: true, message: "Statutory handover verified! Goods released to customer." };
  };

  const registerSellerKYC = (newSeller: {
    businessName: string;
    tradeName: string;
    gstin?: string;
    pan?: string;
    pesoLicenseNumber: string;
    pesoFormType?: string;
    licenseExpiryDate?: string;
    storageCapacityKg: number;
    magazineAddress: string;
    policeNocNumber: string;
  }) => {
    if (!newSeller.businessName || !newSeller.pesoLicenseNumber || !newSeller.magazineAddress) {
      return { success: false, error: "Business name, PESO license, and magazine address are mandatory." };
    }

    const created: SellerKYC = {
      ...newSeller,
      id: "seller-kyc-" + Date.now(),
      verificationStatus: "UNDER_REVIEW",
      pesoFormType: newSeller.pesoFormType || "Form LE-1 (Explosives Factory & Depot)",
      licenseExpiryDate: newSeller.licenseExpiryDate || "2028-12-31",
      documents: [
        {
          docType: "PESO_LE1",
          docTitle: "PESO Storage License (Form LE-1)",
          fileName: `PESO_License_${newSeller.pesoLicenseNumber.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`,
          fileSize: "2.8 MB",
          isVerified: false,
          uploadedAt: new Date().toISOString()
        },
        {
          docType: "POLICE_NOC",
          docTitle: "District Police Commissioner NOC",
          fileName: `Police_Clearance_${newSeller.policeNocNumber.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`,
          fileSize: "1.4 MB",
          isVerified: false,
          uploadedAt: new Date().toISOString()
        },
        {
          docType: "SAFETY_BLUEPRINT",
          docTitle: "Magazine Standoff Perimeter Blueprint",
          fileName: "Storage_Magazine_Blueprint.pdf",
          fileSize: "3.5 MB",
          isVerified: false,
          uploadedAt: new Date().toISOString()
        }
      ],
      createdAt: new Date().toISOString()
    };

    setSellers((prev) => [created, ...prev]);
    addAuditLog(
      "SELLER",
      "SELLER_KYC_SUBMITTED",
      `New seller application submitted by '${created.businessName}' with PESO license ${created.pesoLicenseNumber}. Storage: ${created.storageCapacityKg} KG.`,
      created.businessName,
      "SELLER_COMPLIANCE",
      "PESO Licensing Rule 83 & Section 5"
    );
    return { success: true };
  };

  const approveSeller = (sellerId: string) => {
    setSellers((prev) =>
      prev.map((s) => (s.id === sellerId ? { ...s, verificationStatus: "APPROVED", rejectionReason: undefined } : s))
    );
    const seller = sellers.find((s) => s.id === sellerId);
    addAuditLog(
      "SUPERADMIN",
      "SELLER_VERIFICATION_APPROVED",
      `Verified PESO Form LE-1 for '${seller?.businessName || sellerId}'. All statutory storage clearances approved.`,
      "superadmin@fireworks.com",
      "SELLER_COMPLIANCE",
      "PESO Explosives Storage Authorization Rule 83",
      sellerId
    );
  };

  const rejectSeller = (sellerId: string, reason: string) => {
    setSellers((prev) =>
      prev.map((s) => (s.id === sellerId ? { ...s, verificationStatus: "REJECTED", rejectionReason: reason } : s))
    );
    const seller = sellers.find((s) => s.id === sellerId);
    addAuditLog(
      "SUPERADMIN",
      "SELLER_VERIFICATION_REJECTED",
      `Rejected KYC application for '${seller?.businessName || sellerId}'. Statutory Reason: ${reason}`,
      "superadmin@fireworks.com",
      "SELLER_COMPLIANCE",
      "PESO Form LE-1 Rejection",
      sellerId
    );
  };

  // SuperAdmin creates a new Company & Admin
  const createCompanyAdmin = (data: {
    companyName: string;
    tradeName: string;
    pesoLicenseNumber: string;
    storageCapacityKg: number;
    magazineAddress: string;
    policeNocNumber?: string;
    adminName: string;
    adminEmail: string;
    adminPhone: string;
  }) => {
    if (!data.companyName || !data.pesoLicenseNumber || !data.adminEmail) {
      return { success: false, error: "Company Name, PESO License, and Admin Email are required." };
    }

    const companyId = "seller-co-" + Date.now();

    const newCompany: SellerKYC = {
      id: companyId,
      businessName: data.companyName,
      tradeName: data.tradeName || data.companyName,
      pesoLicenseNumber: data.pesoLicenseNumber,
      pesoFormType: "Form LE-1 (Explosives Factory & Depot)",
      licenseExpiryDate: "2029-03-31",
      storageCapacityKg: Number(data.storageCapacityKg) || 10000,
      magazineAddress: data.magazineAddress,
      policeNocNumber: data.policeNocNumber || `POL/NOC/${Date.now().toString().slice(-6)}`,
      verificationStatus: "APPROVED",
      adminEmail: data.adminEmail.toLowerCase().trim(),
      createdAt: new Date().toISOString(),
      documents: [
        {
          docType: "PESO_LE1",
          docTitle: "PESO Storage License (Form LE-1)",
          fileName: `PESO_${data.pesoLicenseNumber.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`,
          fileSize: "3.1 MB",
          isVerified: true,
          uploadedAt: new Date().toISOString()
        }
      ]
    };

    setSellers((prev) => [newCompany, ...prev]);

    // Add to HARDCODED_USERS runtime list
    const newAdminUser: AuthUser = {
      id: "user-" + companyId,
      email: data.adminEmail.toLowerCase().trim(),
      role: "SELLER",
      fullName: `${data.adminName} (🏭 ${data.companyName})`,
      phone: data.adminPhone,
      sellerStatus: "APPROVED",
      pesoLicense: data.pesoLicenseNumber,
      companyId: companyId,
      companyName: data.companyName
    };
    HARDCODED_USERS.push(newAdminUser);

    addAuditLog(
      "SUPERADMIN",
      "COMPANY_ADMIN_CREATED",
      `SuperAdmin created Company '${data.companyName}' with Admin '${data.adminName}' (${data.adminEmail}). PESO License: ${data.pesoLicenseNumber}.`,
      "superadmin@fireworks.com",
      "SELLER_COMPLIANCE",
      "PESO Manufacturer Authorization Section 4",
      companyId
    );

    return { success: true };
  };

  // SuperAdmin adds Customer directly
  const addCustomerBySuperAdmin = (data: {
    fullName: string;
    email: string;
    phone: string;
    address?: string;
  }) => {
    if (!data.fullName || !data.phone) {
      return { success: false, error: "Full Name and Phone Number are required." };
    }

    const newCustomer: CustomerRecord = {
      id: "cust-sup-" + Date.now(),
      fullName: data.fullName,
      email: data.email || `customer.${Date.now().toString().slice(-4)}@fireworks.com`,
      phone: data.phone,
      ageVerified: true,
      address: data.address || "PESO Authorized Local Delivery Zone",
      registeredAt: new Date().toISOString(),
      addedBy: "SUPERADMIN"
    };

    setCustomers((prev) => [newCustomer, ...prev]);

    // Also register user so they can login as customer
    const newCustomerUser: AuthUser = {
      id: "user-" + newCustomer.id,
      email: newCustomer.email,
      role: "CUSTOMER",
      fullName: `${newCustomer.fullName} (👤 வாடிக்கையாளர் 18+)`,
      phone: newCustomer.phone
    };
    HARDCODED_USERS.push(newCustomerUser);

    addAuditLog(
      "SUPERADMIN",
      "CUSTOMER_ADDED_BY_SUPERADMIN",
      `SuperAdmin added verified customer '${newCustomer.fullName}' (Phone: ${newCustomer.phone}, Address: ${newCustomer.address}).`,
      "superadmin@fireworks.com",
      "ORDER_HANDOVER",
      "Explosives Rule 103 Age Verified Ledger"
    );

    return { success: true };
  };

  // Customer self-registration
  const registerCustomerSelf = (data: {
    fullName: string;
    email: string;
    phone: string;
    address?: string;
  }) => {
    const newCustomer: CustomerRecord = {
      id: "cust-self-" + Date.now(),
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      ageVerified: true,
      address: data.address || "Customer Address",
      registeredAt: new Date().toISOString(),
      addedBy: "SELF_REGISTRATION"
    };

    setCustomers((prev) => [newCustomer, ...prev]);

    addAuditLog(
      "SYSTEM",
      "CUSTOMER_SELF_REGISTERED",
      `Customer '${newCustomer.fullName}' self-registered with 18+ statutory age declaration.`,
      newCustomer.email,
      "ORDER_HANDOVER",
      "Explosives Act 1884 Section 6"
    );

    return { success: true };
  };

  const toggleKillSwitch = () => {
    setIsKillSwitchActive((prev) => {
      const next = !prev;
      addAuditLog(
        "SUPERADMIN",
        next ? "EMERGENCY_KILLSWITCH_ACTIVATED" : "EMERGENCY_KILLSWITCH_DEACTIVATED",
        next
          ? "Halted all marketplace checkout reservations nationwide."
          : "Resumed operational checkouts across depots.",
        "superadmin@fireworks.com",
        "EMERGENCY_CONTROLS",
        "Supreme Court Emergency Order"
      );
      return next;
    });
  };

  return (
    <MarketplaceContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedCompanyFilter,
        setSelectedCompanyFilter,
        products,
        approvedProducts,
        pendingProducts,
        submitProduct,
        approveProduct,
        rejectProduct,
        updateProductStock,
        orders,
        sellerOrders,
        createOrderFromCart,
        verifyDepotOtp,
        updateOrderShippingAndStatus,
        createOrderByAdminForCustomer,
        sellers,
        registerSellerKYC,
        approveSeller,
        rejectSeller,
        createCompanyAdmin,
        customers,
        addCustomerBySuperAdmin,
        registerCustomerSelf,
        isKillSwitchActive,
        toggleKillSwitch,
        auditLogs,
        addAuditLog
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const ctx = useContext(MarketplaceContext);
  if (!ctx) throw new Error("useMarketplace must be used within MarketplaceProvider");
  return ctx;
};
