import { AuthUser, CustomerRecord } from "./types.js";

export const HARDCODED_USERS: AuthUser[] = [
  {
    id: "user-superadmin-01",
    email: "superadmin@fireworks.com",
    role: "SUPERADMIN",
    fullName: "Gokulapandi (👑 முதன்மை நிர்வாகி / SuperAdmin)",
    phone: "9876543210"
  },
  {
    id: "user-seller-01",
    email: "seller.sivakasi@fireworks.com",
    role: "SELLER",
    fullName: "Sivakasi Sparkles Fireworks Ltd (🏭 கம்பெனி அட்மின்)",
    phone: "9876543211",
    sellerStatus: "APPROVED",
    pesoLicense: "E/SC/TN/20/12345(LE-1)",
    companyId: "demo-seller-id",
    companyName: "Sivakasi Sparkles Fireworks Private Limited"
  },
  {
    id: "user-seller-02",
    email: "seller.meenakshi@fireworks.com",
    role: "SELLER",
    fullName: "Sri Meenakshi Fireworks Industries (🏭 கம்பெனி அட்மின்)",
    phone: "9876543213",
    sellerStatus: "UNDER_REVIEW",
    pesoLicense: "E/SC/TN/20/99812(LE-1)",
    companyId: "seller-kyc-002",
    companyName: "Sri Meenakshi Fireworks Industries"
  },
  {
    id: "user-cust-01",
    email: "customer@fireworks.com",
    role: "CUSTOMER",
    fullName: "Rahul Sharma (👤 வாடிக்கையாளர் 18+)",
    phone: "9876543212"
  }
];

export const HARDCODED_CUSTOMERS: CustomerRecord[] = [
  {
    id: "cust-001",
    fullName: "Rahul Sharma (ராகுல் சர்மா)",
    email: "customer@fireworks.com",
    phone: "9876543212",
    ageVerified: true,
    address: "Flat 402, Green Avenue, Gurugram, Haryana 122001",
    registeredAt: "2026-10-18T10:30:00.000Z",
    addedBy: "SELF_REGISTRATION"
  },
  {
    id: "cust-002",
    fullName: "Karthik Subramanian (கார்த்திக் சுப்ரமணியன்)",
    email: "karthik.sub@example.com",
    phone: "9840123456",
    ageVerified: true,
    address: "No 14, Gandhi Road, T Nagar, Chennai, Tamil Nadu 600017",
    registeredAt: "2026-10-19T14:15:00.000Z",
    addedBy: "SELF_REGISTRATION"
  },
  {
    id: "cust-003",
    fullName: "Priya Sundaram (பிரியா சுந்தரம்)",
    email: "priya.s@example.com",
    phone: "9443219870",
    ageVerified: true,
    address: "Plot 88, Anna Nagar West, Madurai, Tamil Nadu 625020",
    registeredAt: "2026-10-20T09:00:00.000Z",
    addedBy: "SUPERADMIN"
  }
];
