export type ProductApprovalStatus = "APPROVED" | "UNDER_REVIEW" | "REJECTED";
export type OrderStatusType = "CONFIRMED" | "READY_FOR_PICKUP" | "DISPATCHED_LICENSED_CARRIER" | "COMPLETED" | "CANCELLED";
export type UserRole = "CUSTOMER" | "SELLER" | "ADMIN" | "SUPERADMIN";

export interface FireworkCategory {
  id: string;
  name: string;
  nameTa: string;
  slug: string;
  description: string;
  descriptionTa: string;
  icon: string;
}

export interface DemoProduct {
  id: string;
  name: string;
  nameTa?: string;
  category: string;
  categorySlug: string;
  description: string;
  descriptionTa?: string;
  chemicalComposition: string;
  decibelRating: number;
  neeriCertNumber: string;
  neeriQrUrl: string;
  basePrice: number;
  salePrice: number;
  stockQuantity: number;
  image: string;
  sellerName: string;
  sellerPesoLicense: string;
  isGreenCertified: boolean;
  bariumFree: boolean;
  companyId?: string;
}

export interface ManagedProduct extends DemoProduct {
  approvalStatus: ProductApprovalStatus;
  rejectionReason?: string;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  salePrice: number;
  neeriCertNumber: string;
}

export interface OrderShippingDetails {
  carrierType: "LICENSED_DEPOT_PICKUP" | "PESO_LICENSED_CARRIER";
  vehicleNumber?: string;
  driverName?: string;
  driverPhone?: string;
  dispatchDate?: string;
  deliveryNotes?: string;
}

export interface MarketplaceOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  sellerId: string;
  sellerName: string;
  items: OrderItem[];
  subtotal: number;
  complianceFee: number;
  gstAmount: number;
  totalAmount: number;
  status: OrderStatusType;
  pickupPinOtp: string;
  depotLocation: string;
  shippingDetails?: OrderShippingDetails;
  createdAt: string;
  handedOverAt?: string;
  createdByAdmin?: boolean;
}

export interface SellerKYCDocument {
  docType: string;
  docTitle: string;
  fileName: string;
  fileSize: string;
  isVerified: boolean;
  uploadedAt: string;
}

export interface SellerKYC {
  id: string;
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
  verificationStatus: "APPROVED" | "UNDER_REVIEW" | "REJECTED";
  rejectionReason?: string;
  documents?: SellerKYCDocument[];
  createdAt: string;
  adminEmail?: string;
}

export interface CustomerRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  ageVerified: boolean;
  address?: string;
  registeredAt: string;
  addedBy: "SELF_REGISTRATION" | "SUPERADMIN";
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: "ADMIN" | "SELLER" | "SYSTEM" | "SUPERADMIN";
  action: string;
  details: string;
  category?: "SELLER_COMPLIANCE" | "PRODUCT_MODERATION" | "ORDER_HANDOVER" | "EMERGENCY_CONTROLS";
  statutoryRule?: string;
  companyId?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  phone?: string;
  sellerStatus?: string;
  pesoLicense?: string;
  companyId?: string;
  companyName?: string;
}
