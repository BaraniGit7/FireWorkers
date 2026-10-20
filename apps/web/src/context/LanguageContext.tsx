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
    pillar4Desc: "Strict Supreme Court compliance. Banned formulations (Barium, Antimony, Lithium, Lead) are permanently blacklisted."
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
    pillar4Desc: "உச்ச நீதிமன்ற உத்தரவுக்கு முழு இணக்கம். தடைசெய்யப்பட்ட பேரியம், ஆன்டிமனி, லித்தியம் மற்றும் ஈயம் ஆகியவை நிரந்தரமாகத் தடை செய்யப்பட்டுள்ளன."
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
    } catch {}
    return "en";
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
