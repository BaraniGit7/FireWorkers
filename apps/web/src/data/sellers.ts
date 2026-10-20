import { SellerKYC } from "./types.js";

export const HARDCODED_SELLERS: SellerKYC[] = [
  {
    id: "demo-seller-id",
    businessName: "Sivakasi Sparkles Fireworks Private Limited",
    tradeName: "Sivakasi Sparkles (சிவகாசி ஸ்பார்க்ளர்ஸ்)",
    gstin: "33AAACS1234F1Z8",
    pan: "AAACS1234F",
    pesoLicenseNumber: "E/SC/TN/20/12345(LE-1)",
    pesoFormType: "Form LE-1 (Wholesale Fireworks Storage)",
    licenseExpiryDate: "2028-03-31",
    storageCapacityKg: 5000.0,
    magazineAddress: "Survey No 412, Sivakasi-Sattur Road, Virudhunagar, Tamil Nadu 626123",
    policeNocNumber: "POL/NOC/2024/7891",
    verificationStatus: "APPROVED",
    documents: [
      {
        docType: "PESO_LE1",
        docTitle: "PESO Form LE-1 Explosives Storage License",
        fileName: "PESO_Form_LE1_License_12345.pdf",
        fileSize: "2.4 MB",
        isVerified: true,
        uploadedAt: "2026-08-15T09:12:00.000Z"
      },
      {
        docType: "FIRE_NOC",
        docTitle: "Tamil Nadu Fire & Rescue Services NOC",
        fileName: "TN_Fire_Services_NOC_7891.pdf",
        fileSize: "1.8 MB",
        isVerified: true,
        uploadedAt: "2026-08-15T09:15:00.000Z"
      },
      {
        docType: "MAGAZINE_SPEC",
        docTitle: "5,000 KG Storage Godown Perimeter & Lightning Arrester Map",
        fileName: "Godown_Perimeter_Safety_Blueprint.pdf",
        fileSize: "4.1 MB",
        isVerified: true,
        uploadedAt: "2026-08-15T09:20:00.000Z"
      }
    ],
    createdAt: "2026-08-15T09:00:00.000Z"
  },
  {
    id: "seller-kyc-002",
    businessName: "Sri Meenakshi Fireworks Industries",
    tradeName: "Meenakshi Crackers (மீனாட்சி கிராக்கர்ஸ்)",
    gstin: "33AABCM9812G1Z2",
    pan: "AABCM9812G",
    pesoLicenseNumber: "E/SC/TN/20/99812(LE-1)",
    pesoFormType: "Form LE-1 (Explosives Factory & Depot)",
    licenseExpiryDate: "2027-12-31",
    storageCapacityKg: 4000.0,
    magazineAddress: "Plot 89, Thiruthangal Industrial Area, Sivakasi, Tamil Nadu 626130",
    policeNocNumber: "POL/NOC/2025/1120",
    verificationStatus: "UNDER_REVIEW",
    documents: [
      {
        docType: "PESO_LE1",
        docTitle: "PESO License Renewal Form LE-1",
        fileName: "PESO_License_Application_99812.pdf",
        fileSize: "3.1 MB",
        isVerified: false,
        uploadedAt: "2026-10-19T14:22:00.000Z"
      },
      {
        docType: "POLICE_NOC",
        docTitle: "District Police Commissioner Safety Clearance",
        fileName: "Police_Clearance_NOC_1120.pdf",
        fileSize: "1.2 MB",
        isVerified: false,
        uploadedAt: "2026-10-19T14:25:00.000Z"
      },
      {
        docType: "CSIR_AFFIDAVIT",
        docTitle: "Statutory Barium-Free Chemical Affidavit",
        fileName: "NEERI_Barium_Free_Affidavit.pdf",
        fileSize: "850 KB",
        isVerified: false,
        uploadedAt: "2026-10-19T14:28:00.000Z"
      }
    ],
    createdAt: "2026-10-19T14:20:00.000Z"
  }
];
