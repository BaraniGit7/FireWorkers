export const COMPLIANCE_CONSTANTS = {
  MIN_PURCHASER_AGE: 18,
  MAX_DECIBEL_LIMIT: 125.0, // Indian Explosives Rules limit at 4m
  MAX_HOARDING_QTY_PER_PRODUCT: 10,
  RESERVATION_TTL_MINUTES: 15,
  FORBIDDEN_CHEMICALS: [
    "Barium Nitrate",
    "Barium Salts",
    "Antimony",
    "Lithium",
    "Mercury",
    "Arsenic",
    "Lead",
    "Chlorate"
  ] as const,
  DEFAULT_COMPLIANCE_FEE: 49.0 // Fee for mandatory safety transport packaging & depot compliance check
} as const;

export const USER_ROLES = {
  CUSTOMER: "CUSTOMER",
  SELLER: "SELLER",
  ADMIN: "ADMIN"
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const SELLER_STATUS = {
  PENDING_SUBMISSION: "PENDING_SUBMISSION",
  UNDER_REVIEW: "UNDER_REVIEW",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  SUSPENDED: "SUSPENDED"
} as const;

export type SellerStatus = (typeof SELLER_STATUS)[keyof typeof SELLER_STATUS];

export const PRODUCT_STATUS = {
  DRAFT: "DRAFT",
  UNDER_REVIEW: "UNDER_REVIEW",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  ARCHIVED: "ARCHIVED"
} as const;

export type ProductStatus = (typeof PRODUCT_STATUS)[keyof typeof PRODUCT_STATUS];

export const ORDER_STATUS = {
  RESERVATION_PENDING: "RESERVATION_PENDING",
  PAYMENT_PENDING: "PAYMENT_PENDING",
  CONFIRMED: "CONFIRMED",
  READY_FOR_PICKUP: "READY_FOR_PICKUP",
  DISPATCHED_LICENSED_CARRIER: "DISPATCHED_LICENSED_CARRIER",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  EXPIRED: "EXPIRED"
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export const PAYMENT_STATUS = {
  PENDING: "PENDING",
  AUTHORIZED: "AUTHORIZED",
  CAPTURED: "CAPTURED",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED"
} as const;

export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export const FULFILMENT_TYPE = {
  LICENSED_DEPOT_PICKUP: "LICENSED_DEPOT_PICKUP",
  PESO_LICENSED_CARRIER: "PESO_LICENSED_CARRIER"
} as const;

export type FulfilmentType = (typeof FULFILMENT_TYPE)[keyof typeof FULFILMENT_TYPE];
