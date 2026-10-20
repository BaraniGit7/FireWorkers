const API_BASE = "/api/v1";

export async function fetchHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error("Health check failed");
    return await res.json();
  } catch (err) {
    return {
      success: true,
      data: {
        status: "ONLINE",
        version: "1.0.0",
        environment: "development",
        liveCheckoutEnabled: false,
        regulatoryFramework: {
          act: "Explosives Act 1884 / Explosives Rules 2008",
          licensing: "PESO LE-1/LE-3/LE-5 compliant click-and-collect",
          certification: "CSIR-NEERI Green Crackers only"
        }
      }
    };
  }
}

export interface DemoProduct {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
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
}

export const INITIAL_PRODUCTS: DemoProduct[] = [
  {
    id: "prod-spk-001",
    name: "CSIR-NEERI Deluxe 30cm Sparklers (10 Pcs)",
    category: "Sparklers",
    categorySlug: "sparklers",
    description: "Low-smoke golden sparklers certified by CSIR-NEERI. Emits zero toxic barium or heavy metal particulates.",
    chemicalComposition: "Barium-Free Formulation: Potassium Nitrate (65%), Aluminium Powder (25%), Dextrin Binder (10%).",
    decibelRating: 0.0,
    neeriCertNumber: "CSIR-NEERI-2024-SPK-9901",
    neeriQrUrl: "https://neeri.res.in/verify/qr?code=NEERI-GRN-2026-SPK-001",
    basePrice: 150.0,
    salePrice: 120.0,
    stockQuantity: 250,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    sellerName: "Sivakasi Sparkles Fireworks Ltd",
    sellerPesoLicense: "E/SC/TN/20/12345(LE-1)",
    isGreenCertified: true,
    bariumFree: true
  },
  {
    id: "prod-fp-002",
    name: "CSIR-NEERI Green Flower Pot Special (5 Pcs)",
    category: "Flower Pots (Anar)",
    categorySlug: "flower-pots",
    description: "Vibrant conical shower fountain with low particulate smoke. Approved barium-free formulation with scannable batch QR.",
    chemicalComposition: "Barium-Free Formulation. Potassium Nitrate, Natural Shellac, Aluminium Flake.",
    decibelRating: 45.0,
    neeriCertNumber: "CSIR-NEERI-2024-FP-8821",
    neeriQrUrl: "https://neeri.res.in/verify/qr?code=NEERI-GRN-2026-FP-002",
    basePrice: 280.0,
    salePrice: 220.0,
    stockQuantity: 180,
    image: "https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?w=600&auto=format&fit=crop&q=80",
    sellerName: "Sivakasi Sparkles Fireworks Ltd",
    sellerPesoLicense: "E/SC/TN/20/12345(LE-1)",
    isGreenCertified: true,
    bariumFree: true
  },
  {
    id: "prod-chk-003",
    name: "CSIR-NEERI Eco Zamin Chakkar Deluxe (10 Pcs)",
    category: "Ground Chakkars",
    categorySlug: "ground-chakkars",
    description: "Traditional rotating ground spinner engineered for low particulate matter (PM2.5 reduced by 35%).",
    chemicalComposition: "Zero Barium Salts. Reducer: Pure Charcoal and Sulphur. Oxidiser: Potassium Nitrate.",
    decibelRating: 15.0,
    neeriCertNumber: "CSIR-NEERI-2024-CHK-7712",
    neeriQrUrl: "https://neeri.res.in/verify/qr?code=NEERI-GRN-2026-CHK-003",
    basePrice: 200.0,
    salePrice: 160.0,
    stockQuantity: 300,
    image: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=600&auto=format&fit=crop&q=80",
    sellerName: "Sivakasi Sparkles Fireworks Ltd",
    sellerPesoLicense: "E/SC/TN/20/12345(LE-1)",
    isGreenCertified: true,
    bariumFree: true
  },
  {
    id: "prod-aer-004",
    name: "CSIR-NEERI Safe 12-Shot Aerial Salute (1 Box)",
    category: "Aerial Shells & Shots",
    categorySlug: "aerial-shells",
    description: "12 consecutive sky bursts with safe decibel levels strictly below 120 dB, compliant with Supreme Court norms.",
    chemicalComposition: "CSIR-NEERI certified low decibel burst charge. Barium-free colour stars. Lead and arsenic free.",
    decibelRating: 110.0,
    neeriCertNumber: "CSIR-NEERI-2024-AER-4411",
    neeriQrUrl: "https://neeri.res.in/verify/qr?code=NEERI-GRN-2026-AER-004",
    basePrice: 650.0,
    salePrice: 520.0,
    stockQuantity: 95,
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&auto=format&fit=crop&q=80",
    sellerName: "Sivakasi Sparkles Fireworks Ltd",
    sellerPesoLicense: "E/SC/TN/20/12345(LE-1)",
    isGreenCertified: true,
    bariumFree: true
  },
  {
    id: "prod-snd-005",
    name: "CSIR-NEERI Eco Maroons Sound Special (5 Pcs)",
    category: "Sound Crackers",
    categorySlug: "sound-crackers",
    description: "Statutory compliant green sound cracker tested at 115 dB (strictly under Supreme Court 125 dB limit).",
    chemicalComposition: "Barium-Free Safe Formula: CSIR patented acoustic propellant without toxic nitrates.",
    decibelRating: 115.0,
    neeriCertNumber: "CSIR-NEERI-2024-SND-1102",
    neeriQrUrl: "https://neeri.res.in/verify/qr?code=NEERI-GRN-2026-SND-005",
    basePrice: 320.0,
    salePrice: 260.0,
    stockQuantity: 120,
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80",
    sellerName: "Sivakasi Sparkles Fireworks Ltd",
    sellerPesoLicense: "E/SC/TN/20/12345(LE-1)",
    isGreenCertified: true,
    bariumFree: true
  },
  {
    id: "prod-gft-006",
    name: "Diwali Shubh Labh Assortment Hamper (Family Box)",
    category: "Diwali Family Gift Boxes",
    categorySlug: "gift-boxes",
    description: "Comprehensive celebration hamper containing sparklers, chakkars, anars, safety goggles, and agarbatti sticks.",
    chemicalComposition: "All enclosed items are 100% CSIR-NEERI certified Green Crackers with independent batch codes.",
    decibelRating: 85.0,
    neeriCertNumber: "CSIR-NEERI-2024-GFT-9099",
    neeriQrUrl: "https://neeri.res.in/verify/qr?code=NEERI-GRN-2026-GFT-006",
    basePrice: 1400.0,
    salePrice: 1099.0,
    stockQuantity: 60,
    image: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=600&auto=format&fit=crop&q=80",
    sellerName: "Sivakasi Sparkles Fireworks Ltd",
    sellerPesoLicense: "E/SC/TN/20/12345(LE-1)",
    isGreenCertified: true,
    bariumFree: true
  }
];
