import { z } from "zod";
import { COMPLIANCE_CONSTANTS, USER_ROLES, FULFILMENT_TYPE } from "../constants/index.js";

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid 10-digit Indian phone number"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  role: z.enum([USER_ROLES.CUSTOMER, USER_ROLES.SELLER]).default(USER_ROLES.CUSTOMER)
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required")
});

export const sellerOnboardSchema = z.object({
  businessName: z.string().min(3, "Business name is required"),
  tradeName: z.string().min(2, "Trade name is required"),
  gstin: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid Indian GSTIN"),
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid Indian PAN format"),
  pesoLicenseNumber: z.string().min(5, "PESO license number is required"),
  pesoLicenseExpiry: z.string().refine((val) => new Date(val) > new Date(), {
    message: "PESO license must not be expired"
  }),
  storageCapacityKg: z.number().positive("Storage capacity must be greater than 0 kg"),
  magazineAddress: z.string().min(10, "Complete licensed magazine/godown address is required"),
  policeNocNumber: z.string().min(3, "Local Police NOC number is required")
});

export const sellerVerificationActionSchema = z.object({
  action: z.enum(["APPROVE", "REJECT", "SUSPEND"]),
  rejectionReason: z.string().optional()
});

export const createProductSchema = z.object({
  categoryId: z.string().uuid("Invalid category ID"),
  name: z.string().min(3, "Product name must be at least 3 characters"),
  description: z.string().min(10, "Detailed description is required"),
  chemicalComposition: z
    .string()
    .min(5, "Chemical composition details required")
    .refine(
      (val) => {
        const lower = val.toLowerCase();
        return !COMPLIANCE_CONSTANTS.FORBIDDEN_CHEMICALS.some((chem) =>
          lower.includes(chem.toLowerCase())
        );
      },
      {
        message: "Prohibited chemicals detected (Barium, Antimony, Lithium, Mercury, Arsenic, Lead, Chlorate are strictly banned)"
      }
    ),
  decibelRating: z
    .number()
    .min(0, "Decibel rating must be non-negative")
    .max(COMPLIANCE_CONSTANTS.MAX_DECIBEL_LIMIT, `Decibel rating cannot exceed ${COMPLIANCE_CONSTANTS.MAX_DECIBEL_LIMIT} dB`),
  neeriQrCodeUrl: z.string().url("Valid CSIR-NEERI verification QR code URL is required"),
  neeriCertNumber: z.string().min(3, "CSIR-NEERI Certificate number is required"),
  basePrice: z.number().positive("Base price must be positive"),
  salePrice: z.number().positive("Sale price must be positive"),
  stockQuantity: z.number().int().nonnegative("Stock quantity must be zero or positive"),
  minOrderQty: z.number().int().positive().default(1),
  maxOrderQty: z
    .number()
    .int()
    .positive()
    .max(COMPLIANCE_CONSTANTS.MAX_HOARDING_QTY_PER_PRODUCT, `Max order quantity cannot exceed ${COMPLIANCE_CONSTANTS.MAX_HOARDING_QTY_PER_PRODUCT}`)
    .default(COMPLIANCE_CONSTANTS.MAX_HOARDING_QTY_PER_PRODUCT),
  images: z.array(z.string().url()).min(1, "At least one product image is required")
});

export const updateProductStockSchema = z.object({
  stockQuantity: z.number().int().nonnegative("Stock quantity must be >= 0")
});

export const productApprovalSchema = z.object({
  action: z.enum(["APPROVE", "REJECT"]),
  rejectionReason: z.string().optional()
});

export const addToCartSchema = z.object({
  productId: z.string().uuid("Invalid product ID"),
  quantity: z
    .number()
    .int()
    .positive("Quantity must be at least 1")
    .max(COMPLIANCE_CONSTANTS.MAX_HOARDING_QTY_PER_PRODUCT, `Cannot exceed ${COMPLIANCE_CONSTANTS.MAX_HOARDING_QTY_PER_PRODUCT} units`)
});

export const updateCartItemSchema = z.object({
  quantity: z
    .number()
    .int()
    .positive("Quantity must be at least 1")
    .max(COMPLIANCE_CONSTANTS.MAX_HOARDING_QTY_PER_PRODUCT, `Cannot exceed ${COMPLIANCE_CONSTANTS.MAX_HOARDING_QTY_PER_PRODUCT} units`)
});

export const checkoutReservationSchema = z.object({
  fulfilmentType: z.enum([FULFILMENT_TYPE.LICENSED_DEPOT_PICKUP, FULFILMENT_TYPE.PESO_LICENSED_CARRIER]),
  pickupDepotName: z.string().min(3, "Pickup depot is required"),
  pickupDepotAddress: z.string().min(5, "Depot address is required"),
  isAge18Declared: z.literal(true, {
    errorMap: () => ({ message: "You must be 18 years or older to purchase fireworks" })
  }),
  idProofType: z.string().min(2, "ID proof type is required for depot collection"),
  idProofNumber: z.string().min(4, "ID proof number is required")
});

export const paymentConfirmationSchema = z.object({
  gateway: z.enum(["RAZORPAY", "CASH_AT_DEPOT"]),
  gatewayTxnId: z.string().optional()
});

export const pincodeCheckSchema = z.object({
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, "Invalid 6-digit Indian pincode")
});
