import { MarketplaceOrder } from "./types.js";

export const HARDCODED_ORDERS: MarketplaceOrder[] = [
  {
    id: "ord-101",
    orderNumber: "ORD-2026-8812",
    customerName: "Rahul Sharma (ராகுல் சர்மா - 18+ Verified)",
    customerPhone: "9876543212",
    customerEmail: "customer@fireworks.com",
    sellerId: "demo-seller-id",
    sellerName: "Sivakasi Sparkles Fireworks Ltd",
    items: [
      {
        productId: "prod-spk-001",
        productName: "CSIR-NEERI Deluxe 30cm Sparklers (10 Pcs)",
        quantity: 2,
        salePrice: 120.0,
        neeriCertNumber: "CSIR-NEERI-2024-SPK-9901"
      },
      {
        productId: "prod-fp-002",
        productName: "CSIR-NEERI Green Flower Pot Special (5 Pcs)",
        quantity: 1,
        salePrice: 220.0,
        neeriCertNumber: "CSIR-NEERI-2024-FP-8821"
      }
    ],
    subtotal: 460.0,
    complianceFee: 49.0,
    gstAmount: 82.8,
    totalAmount: 591.8,
    status: "READY_FOR_PICKUP",
    pickupPinOtp: "829140",
    depotLocation: "PESO Licensed Hub #04, Sector 14, Gurugram (122001)",
    shippingDetails: {
      carrierType: "PESO_LICENSED_CARRIER",
      vehicleNumber: "TN-67-AB-4040 (வெடிபொருள் போக்குவரத்து வண்டி)",
      driverName: "M. Murugan (எம். முருகன்)",
      driverPhone: "9842109876",
      dispatchDate: "2026-10-20T10:00:00.000Z",
      deliveryNotes: "பெசோ படிவம் LE-5 அங்கீகரிக்கப்பட்ட தீயணைப்புக் கருவி பொருத்தப்பட்ட வாகனம்."
    },
    createdAt: "2026-10-20T11:15:00.000Z",
    createdByAdmin: false
  },
  {
    id: "ord-102",
    orderNumber: "ORD-2026-8790",
    customerName: "Karthik Subramanian (கார்த்திக் சுப்ரமணியன்)",
    customerPhone: "9840123456",
    customerEmail: "karthik.sub@example.com",
    sellerId: "demo-seller-id",
    sellerName: "Sivakasi Sparkles Fireworks Ltd",
    items: [
      {
        productId: "prod-chk-003",
        productName: "CSIR-NEERI Eco Zamin Chakkar Deluxe (10 Pcs)",
        quantity: 3,
        salePrice: 160.0,
        neeriCertNumber: "CSIR-NEERI-2024-CHK-7712"
      }
    ],
    subtotal: 480.0,
    complianceFee: 49.0,
    gstAmount: 86.4,
    totalAmount: 615.4,
    status: "DISPATCHED_LICENSED_CARRIER",
    pickupPinOtp: "440219",
    depotLocation: "PESO Licensed Hub #04, Sector 14, Gurugram (122001)",
    shippingDetails: {
      carrierType: "PESO_LICENSED_CARRIER",
      vehicleNumber: "TN-67-EE-9912 (வெடிபொருள் வண்டி)",
      driverName: "S. Karuppasamy (எஸ். கருப்பசாமி)",
      driverPhone: "9842112233",
      dispatchDate: "2026-10-20T12:30:00.000Z",
      deliveryNotes: "அதிவேக பாதுகாப்பு நெறிமுறைகளுடன் அனுப்பப்பட்டுள்ளது."
    },
    createdAt: "2026-10-20T12:00:00.000Z",
    createdByAdmin: true
  },
  {
    id: "ord-103",
    orderNumber: "ORD-2026-9044",
    customerName: "Priya Sundaram (பிரியா சுந்தரம்)",
    customerPhone: "9443219870",
    customerEmail: "priya.s@example.com",
    sellerId: "seller-kyc-002",
    sellerName: "Sri Meenakshi Fireworks Industries",
    items: [
      {
        productId: "prod-gft-006",
        productName: "Diwali Shubh Labh Assortment Hamper (Family Box)",
        quantity: 1,
        salePrice: 1099.0,
        neeriCertNumber: "CSIR-NEERI-2024-GFT-9099"
      }
    ],
    subtotal: 1099.0,
    complianceFee: 49.0,
    gstAmount: 197.82,
    totalAmount: 1345.82,
    status: "CONFIRMED",
    pickupPinOtp: "632014",
    depotLocation: "PESO Hub #09, Madurai Ring Road (625020)",
    shippingDetails: {
      carrierType: "LICENSED_DEPOT_PICKUP",
      deliveryNotes: "வாடிக்கையாளர் நேரடியாக கிடங்கில் பெற முன்பதிவு செய்துள்ளார்."
    },
    createdAt: "2026-10-20T13:45:00.000Z",
    createdByAdmin: false
  },
  {
    id: "ord-100",
    orderNumber: "ORD-2026-8510",
    customerName: "Vikram Sundaram (விக்ரம் சுந்தரம் - 18+)",
    customerPhone: "9884567890",
    customerEmail: "vikram.s@outlook.com",
    sellerId: "demo-seller-id",
    sellerName: "Sivakasi Sparkles Fireworks Ltd",
    items: [
      {
        productId: "prod-gft-006",
        productName: "Diwali Shubh Labh Assortment Hamper (Family Box)",
        quantity: 1,
        salePrice: 1099.0,
        neeriCertNumber: "CSIR-NEERI-2024-GFT-9099"
      }
    ],
    subtotal: 1099.0,
    complianceFee: 49.0,
    gstAmount: 197.82,
    totalAmount: 1345.82,
    status: "COMPLETED",
    pickupPinOtp: "918234",
    depotLocation: "PESO Licensed Hub #04, Sector 14, Gurugram (122001)",
    shippingDetails: {
      carrierType: "LICENSED_DEPOT_PICKUP",
      deliveryNotes: "வாடிக்கையாளர் ஆதார் அட்டை சமர்ப்பித்து சரிபார்க்கப்பட்டது."
    },
    createdAt: "2026-10-19T16:30:00.000Z",
    handedOverAt: "2026-10-19T18:10:00.000Z",
    createdByAdmin: false
  }
];
