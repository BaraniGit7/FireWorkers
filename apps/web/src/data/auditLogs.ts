import { AuditLogEntry } from "./types.js";

export const HARDCODED_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "log-001",
    timestamp: "2026-10-20T08:30:00.000Z",
    actor: "seller.sivakasi@fireworks.com",
    role: "SELLER",
    action: "PRODUCT_SUBMISSION",
    category: "PRODUCT_MODERATION",
    statutoryRule: "Supreme Court Directive WP 728/2015 & CSIR-NEERI Green Cracker Norms",
    details: "Submitted 'CSIR-NEERI Royal Peacock Mega Fountain' for statutory compliance review."
  },
  {
    id: "log-002",
    timestamp: "2026-10-19T18:10:00.000Z",
    actor: "seller.sivakasi@fireworks.com",
    role: "SELLER",
    action: "DEPOT_HANDOVER_VERIFIED",
    category: "ORDER_HANDOVER",
    statutoryRule: "Explosives Rules 2008 - Rule 103 (Licensed Depot Handover Verification)",
    details: "Order #ORD-2026-8510: Verified OTP 918234 and released goods at Gurugram depot."
  },
  {
    id: "log-003",
    timestamp: "2026-10-19T14:20:00.000Z",
    actor: "seller.meenakshi@fireworks.com",
    role: "SELLER",
    action: "SELLER_KYC_SUBMITTED",
    category: "SELLER_COMPLIANCE",
    statutoryRule: "PESO Form LE-1 & Explosives Act (1884) Section 5",
    details: "Sri Meenakshi Fireworks submitted Form LE-1 application, 4,000 KG magazine specs, and Police NOC for regulatory audit."
  },
  {
    id: "log-004",
    timestamp: "2026-08-15T09:30:00.000Z",
    actor: "admin@fireworks.com",
    role: "ADMIN",
    action: "SELLER_VERIFICATION_APPROVED",
    category: "SELLER_COMPLIANCE",
    statutoryRule: "PESO Form LE-1 Storage Authorization & Rule 83",
    details: "Verified PESO Form LE-1 license E/SC/TN/20/12345 for Sivakasi Sparkles Fireworks Ltd."
  },
  {
    id: "log-005",
    timestamp: "2026-08-01T10:00:00.000Z",
    actor: "admin@fireworks.com",
    role: "ADMIN",
    action: "SYSTEM_INITIALIZATION",
    category: "EMERGENCY_CONTROLS",
    statutoryRule: "The Explosives Act (1884) & Supreme Court Directive",
    details: "PESO compliance engine active. CSIR-NEERI QR verification service connected. Zero-overselling atomic locks engaged."
  }
];
