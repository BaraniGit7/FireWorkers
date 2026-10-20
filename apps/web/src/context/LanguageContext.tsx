import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ta";

export const translations = {
  en: {
    // Navbar & Banners
    regulatoryBanner: "PESO & Explosives Act (1884) Compliant • CSIR-NEERI Certified Green Crackers (<125 dB) • Authorized Depot Pickup Only",
    bariumFree: "Barium-Free",
    marketplaceSubtitle: "Licensed Marketplace",
    depotCollectionHub: "Depot Collection Hub",
    depotLocation: "Gurugram 122001 (Form LE-5 Approved)",
    ageVerifiedBtn: "18+ Verified",
    signIn: "Sign In",
    signOut: "Sign Out",
    cart: "Cart",
    switchThemeLight: "Switch to Light Mode",
    switchThemeDark: "Switch to Dark Mode",
    switchLang: "தமிழ்",

    // Hero Section
    festiveBadge: "Diwali 2026 Statutory Compliant Platform",
    heroTitle1: "Safe, Certified Green Crackers.",
    heroTitle2: "Direct from Licensed Hubs.",
    heroSubtitle: "Supreme Court mandated CSIR-NEERI certified Green Crackers with zero toxic Barium salts. Verified PESO storage, click-and-collect fulfillment, and atomic 15-minute checkout reservation.",
    searchPlaceholder: "Search green sparklers, flowerpots, chakkars, low-smoke shells...",

    // Categories
    catAll: "All Fireworks",
    catSparklers: "Sparklers",
    catChakkars: "Ground Chakkars",
    catFlowerPots: "Flower Pots (Anar)",
    catSound: "Sound Crackers",
    catAerial: "Aerial Shells & Shots",
    catGiftBoxes: "Family Gift Boxes",

    // Decibel Filter
    decibelCap: "Decibel Cap:",
    soundAll: "All Sounds",
    soundSilent: "Silent (0 dB)",
    soundLow: "Low Noise (≤ 45 dB)",
    soundLegalMax: "Legal Max (≤ 125 dB)",

    // Catalog Section
    catalogTitle: "Certified Green Cracker Catalog",
    noProducts: "No certified fireworks match your filter criteria.",
    resetFilters: "Reset Filters",

    // Product Card
    csirNeeriGreen: "CSIR-NEERI Green",
    silentRating: "Silent (<0 dB)",
    inStock: "In Stock",
    available: "avail",
    addBtn: "Add",
    addedBtn: "Added",
    certPrefix: "Cert #",
    bariumVerified: "Barium-Free formulation verified.",

    // Cart Drawer
    depotCartTitle: "Depot Collection Cart",
    itemsCountSuffix: "items",
    emptyCartTitle: "Your Depot Cart is Empty",
    emptyCartDesc: "Select CSIR-NEERI certified Green Crackers to reserve at your nearest licensed depot.",
    browseCatalogBtn: "Browse Green Catalog",
    reservationActiveNotice: "15-Min Atomic Inventory Lock active once checkout begins",
    itemsSubtotal: "Items Subtotal",
    pesoPackagingFee: "PESO Packaging & Handling Fee",
    gstTax: "Applicable GST (18%)",
    totalAmount: "Total Amount",
    reserveAtDepotBtn: "Reserve at Licensed Depot",

    // Reservation Confirmation
    reservationHeldTitle: "Depot Reservation Held!",
    reservationHeldDesc: "Your inventory is atomically locked for 15 minutes at the licensed depot. No overselling guaranteed.",
    collectionOtpLabel: "Collection OTP / Verification PIN",
    collectionInstructions: "Present this PIN + Physical Govt Photo ID (18+) at the collection counter.",
    collectionHubLabel: "Collection Hub",
    doneAndReturn: "Done & Return to Store",

    // Auth Modal
    authTitle: "FireWorks Access",
    authSubtitle: "Secure Role-Based Authentication",
    tabSignIn: "Sign In",
    tabCreateAccount: "Create Account",
    demoProfilesTitle: "1-Click Demo Profiles (For Testing):",
    adminRole: "👑 Admin",
    sellerRole: "🏭 Verified Seller",
    customerRole: "👤 Customer (18+)",
    emailLabel: "Email Address",
    passwordLabel: "Password",
    fullNameLabel: "Full Name / Legal Entity",
    phoneLabel: "10-Digit Phone Number (Indian)",
    passwordHint: "Password (min 8 chars, 1 uppercase, 1 digit)",
    signInSubmit: "Sign In to FireWorks",
    createAccountSubmit: "Create Account",
    customerTab: "Customer (18+)",
    sellerTab: "Licensed Seller",

    // Age Gate Modal
    ageGateTitle: "Statutory Age Verification",
    ageGateAct: "The Explosives Act (1884) & Explosives Rules (2008)",
    ageGateAlert: "Selling, delivering, or supplying fireworks to persons under 18 years of age is strictly prohibited by law in India.",
    ageGateText: "All purchases on this platform are fulfilled through licensed Click-and-Collect Depots or verified PESO transport. You will be required to present valid Government Photo Identification (Aadhaar, Voter ID, Driving License) upon physical collection.",
    ageGateCheck1: "I hereby declare that I am 18 years of age or older.",
    ageGateCheck2: "I understand that collection requires physical verification at an authorized PESO godown.",
    ageGateConfirmBtn: "Confirm Age & Continue",

    // Safety Pillars
    whySafeTitle: "Why FireWorks is India's Safest Platform",
    pillar1Title: "CSIR-NEERI Certified",
    pillar1Desc: "Every batch features a scannable QR verification code. Particulate emissions are cut by 30-35%.",
    pillar2Title: "Licensed Depot Pickup",
    pillar2Desc: "Zero illegal courier transit. Secure collection at PESO-licensed Form LE-5 godowns with physical ID proof.",
    pillar3Title: "15-Min Atomic Locks",
    pillar3Desc: "Zero overselling. Inventory is locked at checkout so you never face unfulfillable depot orders.",
    pillar4Title: "100% Barium Free",
    pillar4Desc: "Strict Supreme Court compliance. Banned formulations (Barium, Antimony, Lithium, Lead) are permanently blacklisted.",

    // Navigation Links
    navStorefront: "Storefront",
    navSellerHub: "Seller Hub",
    navAdminConsole: "Admin Console",

    // Seller Portal
    sellerPortalTitle: "Sivakasi Licensed Seller Hub",
    sellerPortalSubtitle: "PESO Form LE-1 Authorized • Manage Green Cracker Batches, Stock & Verify Depot Handover OTPs",
    sellerTabOrders: "Incoming Orders & Depot Handover",
    sellerTabProducts: "Products & Green Inventory",
    sellerTabGodown: "PESO License & Godown Specs",
    sellerOrderCount: "Orders Received",
    sellerPendingHandover: "Pending Pickup Handover",
    sellerTotalProducts: "Products Registered",
    sellerGodownCap: "Licensed Storage Capacity",
    otpVerificationCardTitle: "Depot Pickup Handover (Statutory PIN Verification)",
    otpVerificationCardDesc: "Customer must physically present 6-digit collection OTP and Government Photo ID (18+) at your Sivakasi depot counter.",
    enterOtpPlaceholder: "Enter 6-digit OTP (e.g. 829140)",
    verifyHandoverBtn: "Verify OTP & Release Order",
    invalidOtpMsg: "Invalid OTP! The code entered does not match order PIN.",
    handoverSuccessMsg: "OTP Verified! Handover logged in statutory compliance register. Order completed.",
    filterAllOrders: "All Orders",
    filterPendingOrders: "Ready for Pickup",
    filterCompletedOrders: "Completed",
    orderItemsHeading: "Reserved Green Cracker Items",
    customerDetails: "Customer Details",
    pickupPinLabel: "Pickup PIN",
    submitNewGreenCracker: "+ Submit New Green Cracker",
    modalSubmitProductTitle: "Submit CSIR-NEERI Green Cracker",
    modalSubmitProductSubtitle: "Under Supreme Court & PESO directives, all fireworks require lab-certified NEERI QR and sound cap ≤ 125 dB.",
    inputProductName: "Product Name",
    inputCategory: "Category",
    inputBasePrice: "Base Price (₹)",
    inputSalePrice: "Sale Price (₹)",
    inputStockQty: "Initial Stock Quantity",
    inputNeeriCert: "CSIR-NEERI Certificate #",
    inputDecibelRating: "Decibel Rating (dB - Legal Max 125 dB)",
    inputChemicalFormula: "Chemical Formulation (Barium-Free)",
    bariumFreeComplianceCert: "I hereby certify this formulation is 100% free of Barium Nitrate, Antimony, Lithium, and Lead, compliant with Supreme Court directions.",
    submitToAdminBtn: "Submit for Admin Review",
    productSubmittedNotice: "Product submitted successfully! It is now pending regulatory review by Admin compliance team.",
    stockUpdatedMsg: "Stock quantity updated successfully.",

    // Admin Portal
    adminPortalTitle: "Statutory Compliance Regulatory Console",
    adminPortalSubtitle: "Explosives Act (1884) & Rule 2008 Oversight • Zero-Trust Green Cracker Moderation & Market Audit",
    adminTabModQueue: "Product Moderation Queue",
    adminTabMarketOrders: "Marketplace Orders Oversight",
    adminTabSellerVetting: "Seller KYC & License Vetting",
    adminTabAuditTrail: "Compliance Audit Trail",
    adminMetricPendingProd: "Products Awaiting Review",
    adminMetricActiveOrders: "Total Platform Orders",
    adminMetricGMV: "Marketplace GMV (₹)",
    adminMetricAuditEvents: "Immutable Audit Events",
    adminModQueueTitle: "Pending Green Cracker Certification Submissions",
    adminModQueueDesc: "Inspect chemical composition, CSIR-NEERI certificate, and acoustic decibel cap before publishing to public marketplace.",
    adminApproveBtn: "Approve & Publish to Store",
    adminRejectBtn: "Reject Formulation",
    adminRejectionModalTitle: "Reject Product Submission",
    adminRejectionReasonLabel: "Statutory Violation / Rejection Reason",
    adminConfirmReject: "Confirm Rejection",
    adminProductApprovedMsg: "Product approved and published! It is now live on the public Storefront.",
    adminProductRejectedMsg: "Product rejected and returned to seller with statutory feedback.",
    adminKillSwitchTitle: "Emergency Checkout Kill-Switch",
    adminKillSwitchActiveDesc: "HALTED: All checkouts are frozen nationwide by administrative order (e.g. adverse weather / GRAP-IV).",
    adminKillSwitchInactiveDesc: "OPERATIONAL: Live checkout is enabled across licensed Sivakasi depots.",
    adminKillSwitchToggleBtn: "Toggle Emergency Freeze",
    adminVettingTitle: "PESO Licensed Sellers Vetting Queue",
    adminApproveSeller: "Approve Seller License",
    adminSellerApprovedMsg: "Seller Form LE-1 verified and authorized for marketplace sales.",
    statusReady: "Ready for Depot Pickup",
    statusCompleted: "Completed / Collected",
    killSwitchLabel: "Master Checkout Kill-Switch",
    noPendingProducts: "No products currently awaiting moderation. All green crackers are vetted.",

    // Phase 2: Seller Onboarding & KYC
    sellerOnboardingTitle: "Seller Onboarding & KYC Application",
    sellerOnboardingSubtitle: "Submit PESO Form LE-1, Explosives Storage Specs & District Police NOC for Regulatory Vetting",
    businessLegalName: "Legal Business Name",
    tradeBrandName: "Trade / Brand Name",
    gstinLabel: "GSTIN Number",
    panLabel: "PAN Number",
    pesoFormTypeLabel: "PESO Form Classification",
    storageCapacityKgLabel: "Licensed Storage Capacity (KG)",
    magazineAddressLabel: "Explosives Magazine / Godown Physical Address",
    policeNocNumberLabel: "Police Commissioner NOC Reference Number",
    licenseExpiryDateLabel: "PESO License Expiry Date",
    uploadPesoDoc: "PESO Form LE-1 Certificate (PDF / Scanned)",
    uploadPoliceNocDoc: "Police Clearance Certificate (NOC)",
    uploadBlueprintDoc: "Storage Magazine Standoff Blueprint",
    submitKycBtn: "Submit KYC Dossier for Audit",
    inspectKycDocsBtn: "Inspect Statutory Dossier",
    viewCertificateBtn: "View PESO Form LE-1 Certificate",
    rejectSellerBtn: "Reject License Application",
    adminRejectSellerModalTitle: "Reject Seller License Application",
    adminRejectSellerReasonLabel: "Statutory Rejection Reason (Explosives Rules 2008)",
    sellerKycSubmittedMsg: "Seller KYC dossier submitted successfully! Awaiting regulatory review by Admin compliance team.",
    sellerKycApprovedMsg: "Seller Form LE-1 license verified and approved for marketplace sales.",
    sellerKycRejectedMsg: "Seller KYC application rejected with statutory feedback.",
    filterAllLogs: "All Events",
    filterSellerKycLogs: "Seller Compliance",
    filterProductLogs: "Product Moderation",
    filterHandoverLogs: "Depot Handover",
    filterEmergencyLogs: "Emergency Controls",
    auditInspectorTitle: "Statutory Compliance Event Dossier",

    // Admin Portal - Hardcoded strings
    superAdminPortalTitle: "SuperAdmin Portal",
    superAdminPortalSubtitle: "Full oversight of all companies, admins, customers, orders & statutory audit",
    companyFilterLabel: "Company Filter (View by Company):",
    allCompaniesOption: "All Companies",
    filteredCompanyChip: "Filtered Company",
    checkoutsActive: "Checkouts Active",
    checkoutsFrozen: "Checkouts Frozen",
    approvedCompanies: "Approved Companies",
    registeredCustomers: "Registered Customers",
    allSellersProducts: "All seller products",
    companyProducts: "Company products",
    companyOrders: "Company orders",
    totalMarketOrders: "Total marketplace reservations",
    companyRevenue: "Company revenue",
    totalGMVLabel: "Total marketplace value",
    companiesAndAdminsTab: "Companies & Admins",
    customersTab: "Customers",
    createCompanyBtn: "+ Add New Company & Admin",
    addCustomerBtn: "+ Add Customer",
    companyNameLabel: "Company Name",
    adminEmailLabel: "Admin Email",
    adminNameLabel: "Admin Full Name",
    adminPhoneLabel: "Admin Phone",
    pesoLicenseLabel: "PESO License Number",
    createCompanyTitle: "Create New Company & Admin Account",
    createCompanySubtitle: "Register a new seller company under the FireWorks marketplace with PESO credentials",
    addCustomerTitle: "Add Customer (SuperAdmin)",
    addCustomerSubtitle: "Manually register a verified customer to the platform",
    customerNameLabel: "Customer Full Name",
    customerEmailLabel: "Customer Email",
    customerPhoneLabel: "Customer Phone",
    customerAddressLabel: "Customer Address",
    companyCreatedMsg: "Company and admin account created successfully!",
    customerAddedMsg: "Customer added successfully!",
    shippingDetailsLabel: "Shipping Details",
    deliveryStatusLabel: "Delivery Status",
    orderForCustomer: "Order for Customer",
    noOrdersFound: "No orders found",
    noCustomersFound: "No customers found",
    noCompaniesFound: "No companies registered yet",
    createOrderForCustomer: "Create Order for Customer",
    assistedOrderTitle: "Assisted Cart & Order (Seller Creates for Customer)",
    selectCustomerLabel: "Select Customer",
    selectProductLabel: "Select Product",
    quantityLabel: "Quantity"
  },
  ta: {
    // Navbar & Banners
    regulatoryBanner: "பெசோ (PESO) & வெடிபொருள் சட்டம் (1884) விதிகளுக்கு உட்பட்டது • சிஎஸ்ஐஆர்-நீரி (CSIR-NEERI) பசுமை பட்டாசுகள் (<125 dB) • நேரடி கிடங்கு விநியோகம் மட்டுமே",
    bariumFree: "பேரியம் அற்றது",
    marketplaceSubtitle: "அங்கீகரிக்கப்பட்ட பட்டாசு சந்தை",
    depotCollectionHub: "கிடங்கு விநியோக மையம்",
    depotLocation: "குருகிராம் 122001 (படிவம் LE-5 அங்கீகரிக்கப்பட்டது)",
    ageVerifiedBtn: "18+ வயது சரிபார்க்கப்பட்டது",
    signIn: "உள்நுழைக",
    signOut: "வெளியேறுக",
    cart: "கூடை",
    switchThemeLight: "பகல் பயன்முறைக்கு மாறுக",
    switchThemeDark: "இரவு பயன்முறைக்கு மாறுக",
    switchLang: "English",

    // Hero Section
    festiveBadge: "தீபாவளி 2026 சட்டப்பூர்வ விதிகளுக்கு உட்பட்ட தளம்",
    heroTitle1: "பாதுகாப்பான, சான்றளிக்கப்பட்ட பசுமை பட்டாசுகள்.",
    heroTitle2: "உரிமம் பெற்ற கிடங்குகளில் இருந்து நேரடியாக.",
    heroSubtitle: "உச்ச நீதிமன்ற வழிகாட்டுதலின்படி நச்சு பேரியம் உப்புகள் இல்லாத சிஎஸ்ஐஆர்-நீரி சான்றளிக்கப்பட்ட பசுமை பட்டாசுகள். சரிபார்க்கப்பட்ட பெசோ சேமிப்பு மற்றும் 15 நிமிட நேரடி முன்பதிவு.",
    searchPlaceholder: "கம்பி மத்தாப்பு, புஸ்வாணம், சக்கரம், சத்தமில்லா பட்டாசுகளை தேடுங்கள்...",

    // Categories
    catAll: "அனைத்து பட்டாசுகள்",
    catSparklers: "கம்பி மத்தாப்பு (Sparklers)",
    catChakkars: "தரை சக்கரம் (Chakkars)",
    catFlowerPots: "பூந்தொட்டி / புஸ்வாணம் (Flower Pots)",
    catSound: "ஒலி பட்டாசுகள் (Sound Crackers)",
    catAerial: "வானவெடி / வாணவேடிக்கை (Aerial Shells)",
    catGiftBoxes: "குடும்ப பரிசுப் பெட்டகம் (Gift Boxes)",

    // Decibel Filter
    decibelCap: "ஒலி அளவு வரம்பு:",
    soundAll: "அனைத்து ஒலிகள்",
    soundSilent: "சத்தமில்லாதவை (0 dB)",
    soundLow: "குறைந்த சத்தம் (≤ 45 dB)",
    soundLegalMax: "அங்கீகரிக்கப்பட்ட உச்சவரம்பு (≤ 125 dB)",

    // Catalog Section
    catalogTitle: "சான்றளிக்கப்பட்ட பசுமை பட்டாசுகள் பட்டியல்",
    noProducts: "உங்கள் தேடலுக்குரிய சான்றளிக்கப்பட்ட பட்டாசுகள் எதுவும் கிடைக்கவில்லை.",
    resetFilters: "வடிகட்டிகளை மீட்டமைக்க",

    // Product Card
    csirNeeriGreen: "சிஎஸ்ஐஆர்-நீரி பசுமை",
    silentRating: "சத்தமில்லாதது (<0 dB)",
    inStock: "இருப்பில் உள்ளது",
    available: "உள்ளது",
    addBtn: "சேர்க்க",
    addedBtn: "சேர்க்கப்பட்டது",
    certPrefix: "சான்றிதழ் எண்: ",
    bariumVerified: "பேரியம் அற்ற தயாரிப்பு சரிபார்க்கப்பட்டது.",

    // Cart Drawer
    depotCartTitle: "கிடங்கு விநியோக கூடை",
    itemsCountSuffix: "பொருட்கள்",
    emptyCartTitle: "உங்கள் கூடை காலியாக உள்ளது",
    emptyCartDesc: "உங்கள் அருகிலுள்ள உரிமம் பெற்ற கிடங்கில் முன்பதிவு செய்ய சிஎஸ்ஐஆர்-நீரி சான்றளிக்கப்பட்ட பசுமை பட்டாசுகளைத் தேர்ந்தெடுக்கவும்.",
    browseCatalogBtn: "பட்டாசுகளைப் பார்க்க",
    reservationActiveNotice: "முன்பதிவு தொடங்கியவுடன் 15 நிமிட நேரடி இருப்பு பூட்டு செயல்படுத்தப்படும்",
    itemsSubtotal: "பட்டாசுகளின் மொத்த மதிப்பு",
    pesoPackagingFee: "பெசோ (PESO) பாதுகாப்பு பேக்கிங் கட்டணம்",
    gstTax: "ஜிஎஸ்டி வரி (18%)",
    totalAmount: "மொத்த தொகை",
    reserveAtDepotBtn: "உரிமம் பெற்ற கிடங்கில் முன்பதிவு செய்க",

    // Reservation Confirmation
    reservationHeldTitle: "கிடங்கு முன்பதிவு உறுதி செய்யப்பட்டது!",
    reservationHeldDesc: "உரிமம் பெற்ற கிடங்கில் உங்கள் இருப்பு 15 நிமிடங்களுக்குப் பாதுகாப்பாகப் பூட்டப்பட்டுள்ளது. கூடுதல் விற்பனை ஏதும் நிகழாது.",
    collectionOtpLabel: "விநியோக OTP / சரிபார்ப்பு எண்",
    collectionInstructions: "கிடங்கு மையத்தில் இந்த OTP மற்றும் அசல் அரசு புகைப்பட அடையாள அட்டையைக் (18+) காண்பித்து பெற்றுக்கொள்ளவும்.",
    collectionHubLabel: "விநியோக மையம்",
    doneAndReturn: "முடிந்தது & முகப்பிற்குத் திரும்புக",

    // Auth Modal
    authTitle: "ஃபயர்வொர்க்ஸ் அணுகல்",
    authSubtitle: "பாதுகாப்பான பங்கு அடிப்படையிலான அங்கீகாரம்",
    tabSignIn: "உள்நுழைக",
    tabCreateAccount: "கணக்கு தொடங்க",
    demoProfilesTitle: "1-கிளிக் சோதனை கணக்குகள்:",
    adminRole: "👑 நிர்வாகி",
    sellerRole: "🏭 விற்பனையாளர்",
    customerRole: "👤 வாடிக்கையாளர் (18+)",
    emailLabel: "மின்னஞ்சல் முகவரி",
    passwordLabel: "கடவுச்சொல்",
    fullNameLabel: "முழு பெயர் / நிறுவன பெயர்",
    phoneLabel: "10 இலக்க தொலைபேசி எண்",
    passwordHint: "கடவுச்சொல் (குறைந்தது 8 எழுத்துக்கள், 1 பெரிய எழுத்து, 1 எண்)",
    signInSubmit: "உள்நுழைக",
    createAccountSubmit: "கணக்கை உருவாக்குக",
    customerTab: "வாடிக்கையாளர் (18+)",
    sellerTab: "உரிமம் பெற்ற விற்பனையாளர்",

    // Age Gate Modal
    ageGateTitle: "சட்டரீதியான வயது சரிபார்ப்பு",
    ageGateAct: "வெடிபொருள் சட்டம் (1884) & வெடிபொருள் விதிகள் (2008)",
    ageGateAlert: "இந்திய சட்டப்படி 18 வயதுக்குட்பட்ட நபர்களுக்குப் பட்டாசுகளை விற்பனை செய்வது அல்லது வழங்குவது முற்றிலும் தடைசெய்யப்பட்டுள்ளது.",
    ageGateText: "இந்த தளத்தின் அனைத்து ஆர்டர்களும் உரிமம் பெற்ற கிடங்கு சேகரிப்பு மையங்கள் அல்லது அங்கீகரிக்கப்பட்ட பெசோ வாகனங்கள் மூலமாக மட்டுமே விநியோகிக்கப்படும். சேகரிப்பின் போது அசல் அரசு புகைப்பட அடையாள அட்டையைக் (ஆதார், வாக்காளர் அட்டை, ஓட்டுநர் உரிமம்) காண்பிக்க வேண்டும்.",
    ageGateCheck1: "எனக்கு 18 வயது அல்லது அதற்கு மேற்பட்ட வயது நிறைவடைந்துள்ளது என உறுதிப்படுத்துகிறேன்.",
    ageGateCheck2: "அங்கீகரிக்கப்பட்ட பெசோ கிடங்கில் மட்டுமே நேரில் சரிபார்த்து பெற முடியும் என்பதை ஒப்புக்கொள்கிறேன்.",
    ageGateConfirmBtn: "வயதை உறுதிசெய்து தொடர்க",

    // Safety Pillars
    whySafeTitle: "ஃபயர்வொர்க்ஸ் ஏன் இந்தியாவின் பாதுகாப்பான தளம்?",
    pillar1Title: "சிஎஸ்ஐஆர்-நீரி பசுமை சான்றிதழ்",
    pillar1Desc: "ஒவ்வொரு தயாரிப்பிலும் ஸ்கேன் செய்யக்கூடிய QR சரிபார்ப்புக் குறியீடு உள்ளது. காற்றில் கலக்கும் நுண்துகள் 30-35% குறைக்கப்பட்டுள்ளது.",
    pillar2Title: "அங்கீகரிக்கப்பட்ட கிடங்கு விநியோகம்",
    pillar2Desc: "சட்டவிரோத கொரியர் போக்குவரத்து முற்றிலுமாகத் தவிர்க்கப்படுகிறது. பெசோ படிவம் LE-5 உரிமம் பெற்ற பாதுகாப்பான கிடங்குகளில் மட்டுமே விநியோகம்.",
    pillar3Title: "15 நிமிட நேரடி இருப்பு பூட்டு",
    pillar3Desc: "கூடுதல் விற்பனை ஏதும் ஏற்படாது. முன்பதிவு செய்த பொருட்கள் உங்களுக்காக 15 நிமிடங்கள் பிரத்யேகமாக ஒதுக்கப்படும்.",
    pillar4Title: "100% பேரியம் நச்சு அற்றது",
    pillar4Desc: "உச்ச நீதிமன்ற உத்தரவுக்கு முழு இணக்கம். தடைசெய்யப்பட்ட பேரியம், ஆன்டிமனி, லித்தியம் மற்றும் ஈயம் ஆகியவை நிரந்தரமாகத் தடை செய்யப்பட்டுள்ளன.",

    // Navigation Links
    navStorefront: "கடை முகப்பு",
    navSellerHub: "விற்பனையாளர் தளம்",
    navAdminConsole: "நிர்வாகி கன்சோல்",

    // Seller Portal
    sellerPortalTitle: "சிவகாசி உரிமம் பெற்ற விற்பனையாளர் தளம்",
    sellerPortalSubtitle: "பெசோ (PESO) படிவம் LE-1 அங்கீகரிக்கப்பட்டது • பசுமை பட்டாசு தயாரிப்புகள், இருப்பு & கிடங்கு விநியோக OTP சரிபார்ப்பு",
    sellerTabOrders: "வந்த ஆர்டர்கள் & கிடங்கு விநியோகம்",
    sellerTabProducts: "பட்டாசுகள் & பசுமை இருப்பு",
    sellerTabGodown: "பெசோ உரிமம் & கிடங்கு விவரங்கள்",
    sellerOrderCount: "பெறப்பட்ட ஆர்டர்கள்",
    sellerPendingHandover: "விநியோகத்திற்கு தயார்",
    sellerTotalProducts: "பதிவுசெய்த பட்டாசுகள்",
    sellerGodownCap: "அங்கீகரிக்கப்பட்ட சேமிப்பு அளவு",
    otpVerificationCardTitle: "கிடங்கு விநியோக சரிபார்ப்பு (சட்டப்பூர்வ OTP)",
    otpVerificationCardDesc: "வாடிக்கையாளர் தங்களது 6-இலக்க விநியோக OTP மற்றும் அரசு புகைப்பட அடையாள அட்டையைக் (18+) கிடங்கு கவுண்டரில் சமர்ப்பிக்க வேண்டும்.",
    enterOtpPlaceholder: "6-இலக்க OTP-ஐ உள்ளிடவும் (எ.கா. 829140)",
    verifyHandoverBtn: "OTP சரிபார்த்து பட்டாசுகளை வழங்குக",
    invalidOtpMsg: "தவறான OTP! உள்ளிட்ட குறியீடு ஆர்டர் சரிபார்ப்பு எண்ணுடன் பொருந்தவில்லை.",
    handoverSuccessMsg: "OTP வெற்றிகரமாக சரிபார்க்கப்பட்டது! பட்டாசுகள் வாடிக்கையாளரிடம் ஒப்படைக்கப்பட்டது.",
    filterAllOrders: "அனைத்து ஆர்டர்கள்",
    filterPendingOrders: "விநியோகத்திற்கு தயார்",
    filterCompletedOrders: "விநியோகிக்கப்பட்டது",
    orderItemsHeading: "முன்பதிவு செய்யப்பட்ட பசுமை பட்டாசுகள்",
    customerDetails: "வாடிக்கையாளர் விவரங்கள்",
    pickupPinLabel: "விநியோக OTP",
    submitNewGreenCracker: "+ புதிய பசுமை பட்டாசை சமர்ப்பிக்க",
    modalSubmitProductTitle: "சிஎஸ்ஐஆர்-நீரி பசுமை பட்டாசை சமர்ப்பிக்கவும்",
    modalSubmitProductSubtitle: "உச்ச நீதிமன்றம் மற்றும் பெசோ விதிகளின்படி, அனைத்து பட்டாசுகளும் நீரி QR குறியீடு மற்றும் ஒலி அளவு ≤ 125 dB கொண்டிருக்க வேண்டும்.",
    inputProductName: "பட்டாசின் பெயர்",
    inputCategory: "வகை",
    inputBasePrice: "அடிப்படை விலை (₹)",
    inputSalePrice: "விற்பனை விலை (₹)",
    inputStockQty: "ஆரம்ப இருப்பு எண்ணிக்கை",
    inputNeeriCert: "சிஎஸ்ஐஆர்-நீரி சான்றிதழ் எண்",
    inputDecibelRating: "ஒலி அளவு (dB - உச்சவரம்பு 125 dB)",
    inputChemicalFormula: "வேதியியல் கலவை (பேரியம் அற்றது)",
    bariumFreeComplianceCert: "இந்த தயாரிப்பில் பேரியம் நைட்ரேட், ஆன்டிமனி, லித்தியம் மற்றும் ஈயம் ஆகியவை முற்றிலும் இல்லை என சான்றளிக்கிறேன்.",
    submitToAdminBtn: "நிர்வாகி ஒப்புதலுக்கு சமர்ப்பிக்கவும்",
    productSubmittedNotice: "தயாரிப்பு வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது! இது தற்போது நிர்வாகியின் சட்டப்பூர்வ மதிப்பாய்வில் உள்ளது.",
    stockUpdatedMsg: "இருப்பு எண்ணிக்கை வெற்றிகரமாக புதுப்பிக்கப்பட்டது.",

    // Admin Portal
    adminPortalTitle: "சட்டரீதியான ஒழுங்குமுறை நிர்வாகி கன்சோல்",
    adminPortalSubtitle: "வெடிபொருள் சட்டம் (1884) & விதி 2008 மேற்பார்வை • பசுமை பட்டாசு தயாரிப்பு ஒப்புதல் & சந்தை தணிக்கை",
    adminTabModQueue: "பட்டாசு ஒப்புதல் வரிசை",
    adminTabMarketOrders: "அனைத்து சந்தை ஆர்டர்கள்",
    adminTabSellerVetting: "விற்பனையாளர் உரிம சரிபார்ப்பு",
    adminTabAuditTrail: "சட்டப்பூர்வ தணிக்கைப் பதிவு",
    adminMetricPendingProd: "ஒப்புதலுக்கு நிலுவையில் உள்ளவை",
    adminMetricActiveOrders: "தளத்தின் மொத்த ஆர்டர்கள்",
    adminMetricGMV: "மொத்த சந்தை மதிப்பு (₹)",
    adminMetricAuditEvents: "பதிவுசெய்யப்பட்ட தணிக்கை நிகழ்வுகள்",
    adminModQueueTitle: "நிலுவையில் உள்ள பசுமை பட்டாசு சான்றிதழ் சமர்ப்பிப்புகள்",
    adminModQueueDesc: "பொது சந்தையில் வெளியிடுவதற்கு முன் வேதியியல் கலவை, நீரி சான்றிதழ் மற்றும் ஒலி அளவை சரிபார்க்கவும்.",
    adminApproveBtn: "ஒப்புதல் வழங்கி வெளியிடுக",
    adminRejectBtn: "நிராகரிக்க",
    adminRejectionModalTitle: "தயாரிப்பு நிராகரிப்பு",
    adminRejectionReasonLabel: "சட்டரீதியான நிராகரிப்பு காரணம்",
    adminConfirmReject: "நிராகரிப்பை உறுதிசெய்",
    adminProductApprovedMsg: "தயாரிப்புக்கு ஒப்புதல் வழங்கப்பட்டு கடையில் வெளியிடப்பட்டது!",
    adminProductRejectedMsg: "தயாரிப்பு நிராகரிக்கப்பட்டு விற்பனையாளருக்கு திருப்பி அனுப்பப்பட்டது.",
    adminKillSwitchTitle: "அவசர விற்பனை நிறுத்து பொத்தான்",
    adminKillSwitchActiveDesc: "நிறுத்தப்பட்டது: அவசர உத்தரவு காரணமாக அனைத்து முன்பதிவுகளும் நாடு முழுவதும் தற்காலிகமாக நிறுத்தப்பட்டுள்ளன.",
    adminKillSwitchInactiveDesc: "செயல்பாட்டில் உள்ளது: சிவகாசி கிடங்குகளில் நேரடி முன்பதிவு தடையின்றி இயங்குகிறது.",
    adminKillSwitchToggleBtn: "அவசர நிலையை மாற்று",
    adminVettingTitle: "பெசோ உரிமம் பெற்ற விற்பனையாளர் சரிபார்ப்பு வரிசை",
    adminApproveSeller: "விற்பனையாளர் உரிமத்தை அங்கீகரிக்கவும்",
    adminSellerApprovedMsg: "விற்பனையாளரின் படிவம் LE-1 சரிபார்க்கப்பட்டு விற்பனைக்கு அங்கீகரிக்கப்பட்டது.",
    statusReady: "கிடங்கு விநியோகத்திற்கு தயார்",
    statusCompleted: "விநியோகிக்கப்பட்டது",
    killSwitchLabel: "அவசர விற்பனை நிறுத்து பொத்தான்",
    noPendingProducts: "ஒப்புதலுக்கு நிலுவையில் உள்ள பட்டாசுகள் எதுவும் இல்லை. அனைத்தும் சரிபார்க்கப்பட்டன.",

    // Phase 2: Seller Onboarding & KYC (Tamil)
    sellerOnboardingTitle: "புதிய விற்பனையாளர் பதிவு & KYC விண்ணப்பம்",
    sellerOnboardingSubtitle: "பெசோ (PESO) படிவம் LE-1 மற்றும் வெடிபொருள் சேமிப்பு ஆவணங்களை சமர்ப்பிக்கவும்",
    businessLegalName: "சட்டப்பூர்வ வணிக பெயர்",
    tradeBrandName: "வர்த்தக / பிராண்ட் பெயர்",
    gstinLabel: "ஜிஎஸ்டி எண் (GSTIN)",
    panLabel: "பான் எண் (PAN)",
    pesoFormTypeLabel: "பெசோ படிவ வகை",
    storageCapacityKgLabel: "அங்கீகரிக்கப்பட்ட சேமிப்பு திறன் (கிலோ)",
    magazineAddressLabel: "வெடிபொருள் கிடங்கு முழு முகவரி",
    policeNocNumberLabel: "காவல்துறை தடையில்லா சான்றிதழ் எண்",
    licenseExpiryDateLabel: "பெசோ உரிம காலாவதி தேதி",
    uploadPesoDoc: "பெசோ படிவம் LE-1 உரிம ஆவணம் (PDF)",
    uploadPoliceNocDoc: "காவல்துறை தடையில்லா சான்றிதழ் (NOC PDF)",
    uploadBlueprintDoc: "கிடங்கு பாதுகாப்பு வரைபடம் (Blueprint PDF)",
    submitKycBtn: "KYC ஆவணங்களை சமர்ப்பிக்க",
    inspectKycDocsBtn: "ஆவணங்களை ஆய்வு செய்",
    viewCertificateBtn: "பெசோ உரிம சான்றிதழைப் பார்",
    rejectSellerBtn: "உரிமத்தை நிராகரி",
    adminRejectSellerModalTitle: "விற்பனையாளர் உரிம நிராகரிப்பு",
    adminRejectSellerReasonLabel: "சட்டப்பூர்வ நிராகரிப்பு காரணம் (வெடிபொருள் விதிகள் 2008)",
    sellerKycSubmittedMsg: "KYC விண்ணப்பம் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது! ஒழுங்குமுறை தணிக்கையில் உள்ளது.",
    sellerKycApprovedMsg: "விற்பனையாளரின் படிவம் LE-1 சரிபார்க்கப்பட்டு விற்பனைக்கு அங்கீகரிக்கப்பட்டது!",
    sellerKycRejectedMsg: "விற்பனையாளர் KYC விண்ணப்பம் நிராகரிக்கப்பட்டது.",
    filterAllLogs: "அனைத்து நிகழ்வுகள்",
    filterSellerKycLogs: "விற்பனையாளர் இணக்கம்",
    filterProductLogs: "தயாரிப்பு தணிக்கை",
    filterHandoverLogs: "விநியோக சரிபார்ப்பு",
    filterEmergencyLogs: "அவசர கட்டுப்பாடுகள்",
    auditInspectorTitle: "சட்டப்பூர்வ தணிக்கை நிகழ்வு விவரம்",

    // Admin Portal - Hardcoded strings (Tamil)
    superAdminPortalTitle: "முதன்மை நிர்வாகி கன்சோல் (SuperAdmin Portal)",
    superAdminPortalSubtitle: "அனைத்து நிறுவனங்கள், கம்பெனி அட்மின்கள், வாடிக்கையாளர்கள், ஆர்டர்கள் மற்றும் சட்டப்பூர்வ தணிக்கை மேற்பார்வை",
    companyFilterLabel: "நிறுவன வாரியான பார்வை (Company Filter):",
    allCompaniesOption: "அனைத்து நிறுவனங்கள் (All Companies)",
    filteredCompanyChip: "வடிகட்டப்பட்ட நிறுவனம்",
    checkoutsActive: "முன்பதிவு செயல்பாட்டில்",
    checkoutsFrozen: "முன்பதிவு நிறுத்தப்பட்டது",
    approvedCompanies: "அங்கீகரிக்கப்பட்ட கம்பெனிகள்",
    registeredCustomers: "பதிவுசெய்த வாடிக்கையாளர்கள்",
    allSellersProducts: "அனைத்து விற்பனையாளர் பட்டாசுகள்",
    companyProducts: "நிறுவன பட்டாசுகள்",
    companyOrders: "நிறுவனத்தின் ஆர்டர்கள்",
    totalMarketOrders: "மொத்த சந்தை முன்பதிவுகள்",
    companyRevenue: "நிறுவன வருவாய்",
    totalGMVLabel: "மொத்த தள வர்த்தக மதிப்பு",
    companiesAndAdminsTab: "நிறுவனங்கள் & அட்மின்கள்",
    customersTab: "வாடிக்கையாளர்கள்",
    createCompanyBtn: "+ புதிய நிறுவனம் & அட்மின் சேர்க்க",
    addCustomerBtn: "+ வாடிக்கையாளர் சேர்க்க",
    companyNameLabel: "நிறுவனப் பெயர்",
    adminEmailLabel: "அட்மின் மின்னஞ்சல்",
    adminNameLabel: "அட்மின் முழு பெயர்",
    adminPhoneLabel: "அட்மின் தொலைபேசி",
    pesoLicenseLabel: "பெசோ உரிம எண்",
    createCompanyTitle: "புதிய நிறுவனம் & அட்மின் கணக்கு உருவாக்கு",
    createCompanySubtitle: "பெசோ சான்றுகளுடன் FireWorks சந்தையில் புதிய விற்பனையாளர் நிறுவனத்தை பதிவு செய்யுங்கள்",
    addCustomerTitle: "வாடிக்கையாளர் சேர்க்க (SuperAdmin)",
    addCustomerSubtitle: "தளத்தில் சரிபார்க்கப்பட்ட வாடிக்கையாளரை கைமுறையாக பதிவு செய்யுங்கள்",
    customerNameLabel: "வாடிக்கையாளர் முழு பெயர்",
    customerEmailLabel: "வாடிக்கையாளர் மின்னஞ்சல்",
    customerPhoneLabel: "வாடிக்கையாளர் தொலைபேசி",
    customerAddressLabel: "வாடிக்கையாளர் முகவரி",
    companyCreatedMsg: "நிறுவனம் மற்றும் அட்மின் கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது!",
    customerAddedMsg: "வாடிக்கையாளர் வெற்றிகரமாக சேர்க்கப்பட்டார்!",
    shippingDetailsLabel: "ஷிப்பிங் விவரங்கள்",
    deliveryStatusLabel: "விநியோக நிலை",
    orderForCustomer: "வாடிக்கையாளருக்கான ஆர்டர்",
    noOrdersFound: "ஆர்டர்கள் எதுவும் கிடைக்கவில்லை",
    noCustomersFound: "வாடிக்கையாளர்கள் எதுவும் இல்லை",
    noCompaniesFound: "இன்னும் நிறுவனங்கள் பதிவு செய்யப்படவில்லை",
    createOrderForCustomer: "வாடிக்கையாளருக்கு ஆர்டர் உருவாக்கு",
    assistedOrderTitle: "உதவி கார்ட் & ஆர்டர் (விற்பனையாளர் வாடிக்கையாளருக்காக உருவாக்குகிறார்)",
    selectCustomerLabel: "வாடிக்கையாளரை தேர்வு செய்யுங்கள்",
    selectProductLabel: "பட்டாசை தேர்வு செய்யுங்கள்",
    quantityLabel: "அளவு"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: keyof typeof translations["en"]) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("fck_lang");
      if (saved === "en" || saved === "ta") return saved;
      // No pref saved yet — default English, persist it
      localStorage.setItem("fck_lang", "en");
    } catch {}
    return "en"; // Default: English
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("fck_lang", lang);
    } catch {}
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => {
      const next = prev === "en" ? "ta" : "en";
      try {
        localStorage.setItem("fck_lang", next);
      } catch {}
      return next;
    });
  };

  const t = (key: keyof typeof translations["en"]): string => {
    const dict = translations[language] || translations.en;
    return (dict as any)[key] || translations.en[key] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
