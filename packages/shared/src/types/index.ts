import {
  UserRole,
  SellerStatus,
  ProductStatus,
  OrderStatus,
  PaymentStatus,
  FulfilmentType
} from "../constants/index.js";

export interface ApiResponse<T = any> {
  success: boolean;
  data: T | null;
  error?: {
    code: string;
    message: string;
    details?: any;
  } | null;
  meta?: {
    timestamp: string;
    requestId?: string;
    totalCount?: number;
    page?: number;
    limit?: number;
  };
}

export interface UserSummary {
  id: string;
  email: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}

export interface CustomerProfileDTO {
  id: string;
  userId: string;
  fullName: string;
  isAgeVerified: boolean;
  dob?: string | null;
  idProofType?: string | null;
}

export interface SellerProfileDTO {
  id: string;
  userId: string;
  businessName: string;
  tradeName: string;
  gstin: string;
  pan: string;
  pesoLicenseNumber: string;
  pesoLicenseExpiry: string;
  storageCapacityKg: number;
  magazineAddress: string;
  policeNocNumber: string;
  verificationStatus: SellerStatus;
  rejectionReason?: string | null;
  verifiedAt?: string | null;
  documents?: SellerDocumentDTO[];
}

export interface SellerDocumentDTO {
  id: string;
  sellerId: string;
  docType: string;
  fileKey: string;
  fileName?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface CategoryDTO {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  parentId?: string | null;
  minAgeRequired: number;
  isGreenOnly: boolean;
  productCount?: number;
}

export interface ProductDTO {
  id: string;
  sellerId: string;
  sellerName?: string;
  categoryId: string;
  categoryName?: string;
  name: string;
  slug: string;
  description: string;
  chemicalComposition: string;
  decibelRating: number;
  neeriQrCodeUrl: string;
  neeriCertNumber: string;
  basePrice: number;
  salePrice: number;
  stockQuantity: number;
  reservedQuantity: number;
  availableStock: number;
  minOrderQty: number;
  maxOrderQty: number;
  approvalStatus: ProductStatus;
  rejectionReason?: string | null;
  images: { id: string; url: string; isPrimary: boolean }[];
  createdAt: string;
}

export interface CartItemDTO {
  id: string;
  productId: string;
  product: ProductDTO;
  quantity: number;
  unitPrice: number;
  itemTotal: number;
}

export interface CartDTO {
  id: string;
  userId: string;
  items: CartItemDTO[];
  subtotal: number;
  taxAmount: number;
  complianceFee: number;
  totalAmount: number;
  itemCount: number;
}

export interface OrderItemDTO {
  id: string;
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  totalAmount: number;
}

export interface OrderDTO {
  id: string;
  orderNumber: string;
  customerId: string;
  sellerId: string;
  subtotalAmount: number;
  taxAmount: number;
  complianceFee: number;
  totalAmount: number;
  status: OrderStatus;
  fulfilmentType: FulfilmentType;
  pickupDepotName?: string | null;
  pickupDepotAddress?: string | null;
  pickupPinOtp?: string | null;
  items: OrderItemDTO[];
  createdAt: string;
  expiresAt?: string | null;
}
