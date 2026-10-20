import { PrismaClient, Role, SellerStatus, ProductStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🧨 Seeding FireWorks Database...");

  // 1. Seed Categories
  const categoriesData = [
    {
      name: "Sparklers",
      slug: "sparklers",
      description: "Low-smoke, handheld sparkle fireworks in gold, silver, and colours (10cm - 50cm).",
      minAgeRequired: 18,
      isGreenOnly: true
    },
    {
      name: "Ground Chakkars",
      slug: "ground-chakkars",
      description: "High-speed rotating circular ground spinners with bright multi-colour sparks.",
      minAgeRequired: 18,
      isGreenOnly: true
    },
    {
      name: "Flower Pots (Anar)",
      slug: "flower-pots",
      description: "Spectacular fountain fountains emitting glittering conical showers.",
      minAgeRequired: 18,
      isGreenOnly: true
    },
    {
      name: "Sound Crackers",
      slug: "sound-crackers",
      description: "CSIR-NEERI certified green sound crackers strictly under the 125 dB statutory limit.",
      minAgeRequired: 18,
      isGreenOnly: true
    },
    {
      name: "Aerial Shells & Shots",
      slug: "aerial-shells",
      description: "Multi-shot sky repeaters with vibrant bursts and eco-friendly stars.",
      minAgeRequired: 18,
      isGreenOnly: true
    },
    {
      name: "Diwali Family Gift Boxes",
      slug: "gift-boxes",
      description: "Carefully curated assortments with protective safety goggles and lighting sticks.",
      minAgeRequired: 18,
      isGreenOnly: true
    }
  ];

  const categoriesMap: Record<string, string> = {};
  for (const cat of categoriesData) {
    const record = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat
    });
    categoriesMap[cat.slug] = record.id;
  }
  console.log(`✅ Seeded ${Object.keys(categoriesMap).length} categories.`);

  // 2. Seed Admin User
  const adminPasswordHash = await bcrypt.hash("Admin@12345", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@fireworks.com" },
    update: {},
    create: {
      email: "admin@fireworks.com",
      phone: "9876543210",
      passwordHash: adminPasswordHash,
      role: Role.ADMIN,
      isEmailVerified: true,
      isPhoneVerified: true,
      customerProfile: {
        create: {
          fullName: "System Compliance Administrator",
          isAgeVerified: true
        }
      }
    }
  });
  console.log(`✅ Admin account created: ${admin.email}`);

  // 3. Seed Verified Demo Seller
  const sellerPasswordHash = await bcrypt.hash("Seller@12345", 10);
  const sellerUser = await prisma.user.upsert({
    where: { email: "seller.sivakasi@fireworks.com" },
    update: {},
    create: {
      email: "seller.sivakasi@fireworks.com",
      phone: "9876543211",
      passwordHash: sellerPasswordHash,
      role: Role.SELLER,
      isEmailVerified: true,
      isPhoneVerified: true,
      customerProfile: {
        create: {
          fullName: "Sivakasi Sparkles Ltd",
          isAgeVerified: true
        }
      },
      sellerProfile: {
        create: {
          businessName: "Sivakasi Sparkles Fireworks Private Limited",
          tradeName: "Sivakasi Sparkles",
          gstin: "33AAAAA0000A1Z5",
          pan: "AAAAA0000A",
          pesoLicenseNumber: "E/SC/TN/20/12345(LE-1)",
          pesoLicenseExpiry: new Date("2028-12-31"),
          storageCapacityKg: 5000.0,
          magazineAddress: "Survey No 412, Sivakasi-Sattur Road, Virudhunagar, Tamil Nadu 626123",
          policeNocNumber: "POL/NOC/2024/7891",
          verificationStatus: SellerStatus.APPROVED,
          verifiedAt: new Date(),
          verifiedBy: admin.id
        }
      }
    },
    include: { sellerProfile: true }
  });
  console.log(`✅ Verified Seller created: ${sellerUser.email}`);

  const sellerProfileId = sellerUser.sellerProfile!.id;

  // 4. Seed Approved Green Cracker Products
  const products = [
    {
      sellerId: sellerProfileId,
      categoryId: categoriesMap["sparklers"],
      name: "CSIR-NEERI Deluxe 30cm Sparklers (10 Pcs)",
      slug: "csir-neeri-deluxe-30cm-sparklers",
      description: "Low-smoke golden sparklers certified by CSIR-NEERI. Emits zero toxic barium or heavy metal particulates.",
      chemicalComposition: "Barium-Free CSIR Formulation: Potassium Nitrate (65%), Aluminium Powder (25%), Dextrin Binder (10%).",
      decibelRating: 0.0,
      neeriQrCodeUrl: "https://neeri.res.in/verify/qr?code=NEERI-GRN-2026-SPK-001",
      neeriCertNumber: "CSIR-NEERI-2024-SPK-9901",
      basePrice: 150.0,
      salePrice: 120.0,
      stockQuantity: 250,
      approvalStatus: ProductStatus.APPROVED,
      approvedBy: admin.id,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600",
            isPrimary: true
          }
        ]
      }
    },
    {
      sellerId: sellerProfileId,
      categoryId: categoriesMap["flower-pots"],
      name: "CSIR-NEERI Green Flower Pot Special (5 Pcs)",
      slug: "csir-neeri-green-flower-pot-special",
      description: "Fountain emitters with vibrant low-smoke sparks. Approved barium-free formulation with CSIR-NEERI scannable batch QR.",
      chemicalComposition: "Barium-Free Formulation. Potassium Nitrate, Natural Shellac, Aluminium Flake.",
      decibelRating: 45.0,
      neeriQrCodeUrl: "https://neeri.res.in/verify/qr?code=NEERI-GRN-2026-FP-002",
      neeriCertNumber: "CSIR-NEERI-2024-FP-8821",
      basePrice: 280.0,
      salePrice: 220.0,
      stockQuantity: 180,
      approvalStatus: ProductStatus.APPROVED,
      approvedBy: admin.id,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?w=600",
            isPrimary: true
          }
        ]
      }
    },
    {
      sellerId: sellerProfileId,
      categoryId: categoriesMap["ground-chakkars"],
      name: "CSIR-NEERI Eco Zamin Chakkar Deluxe (10 Pcs)",
      slug: "csir-neeri-eco-zamin-chakkar-deluxe",
      description: "Traditional rotating ground spinner engineered for low particulate matter (PM2.5 reduced by 35%).",
      chemicalComposition: "Zero Barium Salts. Reducer: Pure Charcoal and Sulphur. Oxidiser: Potassium Nitrate.",
      decibelRating: 15.0,
      neeriQrCodeUrl: "https://neeri.res.in/verify/qr?code=NEERI-GRN-2026-CHK-003",
      neeriCertNumber: "CSIR-NEERI-2024-CHK-7712",
      basePrice: 200.0,
      salePrice: 160.0,
      stockQuantity: 300,
      approvalStatus: ProductStatus.APPROVED,
      approvedBy: admin.id,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=600",
            isPrimary: true
          }
        ]
      }
    },
    {
      sellerId: sellerProfileId,
      categoryId: categoriesMap["aerial-shells"],
      name: "CSIR-NEERI Safe 12-Shot Aerial Salute (1 Box)",
      slug: "csir-neeri-safe-12-shot-aerial-salute",
      description: "12 consecutive sky bursts with safe decibel levels strictly below 120 dB, compliant with Supreme Court norms.",
      chemicalComposition: "CSIR-NEERI certified low decibel burst charge. Barium-free colour stars. Lead and arsenic free.",
      decibelRating: 110.0,
      neeriQrCodeUrl: "https://neeri.res.in/verify/qr?code=NEERI-GRN-2026-AER-004",
      neeriCertNumber: "CSIR-NEERI-2024-AER-4411",
      basePrice: 650.0,
      salePrice: 520.0,
      stockQuantity: 95,
      approvalStatus: ProductStatus.APPROVED,
      approvedBy: admin.id,
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600",
            isPrimary: true
          }
        ]
      }
    }
  ];

  for (const prod of products) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {},
      create: prod
    });
  }
  console.log(`✅ Seeded ${products.length} certified green cracker products.`);

  // 5. Seed Demo Customer User
  const customerPasswordHash = await bcrypt.hash("Customer@12345", 10);
  const customer = await prisma.user.upsert({
    where: { email: "customer@fireworks.com" },
    update: {},
    create: {
      email: "customer@fireworks.com",
      phone: "9876543212",
      passwordHash: customerPasswordHash,
      role: Role.CUSTOMER,
      isEmailVerified: true,
      isPhoneVerified: true,
      customerProfile: {
        create: {
          fullName: "Rahul Sharma",
          isAgeVerified: true,
          dob: new Date("1995-08-15"),
          idProofType: "AADHAAR_MASKED",
          idProofNumber: "XXXX-XXXX-8921",
          addresses: {
            create: [
              {
                addressLine1: "Flat 402, Shanti Vihar",
                addressLine2: "Sector 14",
                city: "Gurugram",
                state: "Haryana",
                pincode: "122001"
              }
            ]
          }
        }
      }
    }
  });
  console.log(`✅ Customer demo account created: ${customer.email}`);

  console.log("🧨 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
