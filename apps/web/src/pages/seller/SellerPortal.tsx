import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Button,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Alert,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Divider,
  Paper
} from "@mui/material";
import {
  Factory,
  PackageCheck,
  ClipboardList,
  ShieldAlert,
  ShieldCheck,
  QrCode,
  Volume2,
  CheckCircle2,
  Clock,
  PlusCircle,
  Truck,
  Building,
  KeyRound,
  FileText,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  MapPin,
  RefreshCw,
  Edit3,
  ShoppingCart,
  Send,
  UserCheck,
  UserPlus
} from "lucide-react";
import {
  useMarketplace,
  ManagedProduct,
  MarketplaceOrder,
  OrderStatusType,
  OrderShippingDetails,
  CustomerRecord
} from "../../context/MarketplaceContext.js";
import { useLanguage } from "../../context/LanguageContext.js";
import { useThemeMode } from "../../context/ThemeContext.js";
import { useAuth } from "../../context/AuthContext.js";

export const SellerPortal: React.FC = () => {
  const { t } = useLanguage();
  const { mode } = useThemeMode();
  const { user } = useAuth();
  const isDark = mode === "dark";

  const {
    products,
    sellerOrders,
    submitProduct,
    verifyDepotOtp,
    updateProductStock,
    sellers,
    registerSellerKYC,
    customers,
    createOrderByAdminForCustomer,
    updateOrderShippingAndStatus
  } = useMarketplace();

  const [activeTab, setActiveTab] = useState(0);
  const [orderFilter, setOrderFilter] = useState<"ALL" | "READY" | "COMPLETED">("ALL");

  // Handover OTP verification state
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");
  const [enteredOtp, setEnteredOtp] = useState<string>("");
  const [handoverResult, setHandoverResult] = useState<{ success: boolean; message: string } | null>(null);

  // New Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("sparklers");
  const [newProductBasePrice, setNewProductBasePrice] = useState("250");
  const [newProductSalePrice, setNewProductSalePrice] = useState("199");
  const [newProductStock, setNewProductStock] = useState("100");
  const [newProductNeeriCert, setNewProductNeeriCert] = useState("CSIR-NEERI-2026-SPK-");
  const [newProductDecibels, setNewProductDecibels] = useState("45");
  const [newProductChemicals, setNewProductChemicals] = useState(
    "Potassium Nitrate (65%), Aluminium Powder (25%), Dextrin (10%). Certified Barium-free."
  );
  const [newProductDescription, setNewProductDescription] = useState(
    "High quality green crackling sparkler certified by CSIR-NEERI for low particulate emissions."
  );
  const [bariumCertConfirmed, setBariumCertConfirmed] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // Phase 2: Seller Onboarding & KYC State
  const [isKycModalOpen, setIsKycModalOpen] = useState(false);
  const [kycBusinessName, setKycBusinessName] = useState("");
  const [kycTradeName, setKycTradeName] = useState("");
  const [kycGstin, setKycGstin] = useState("");
  const [kycPan, setKycPan] = useState("");
  const [kycPesoLicense, setKycPesoLicense] = useState("E/SC/TN/20/");
  const [kycPesoFormType, setKycPesoFormType] = useState("Form LE-1 (Wholesale Fireworks Storage)");
  const [kycStorageKg, setKycStorageKg] = useState("5000");
  const [kycMagazineAddress, setKycMagazineAddress] = useState("");
  const [kycPoliceNoc, setKycPoliceNoc] = useState("POL/NOC/2026/");
  const [kycExpiryDate, setKycExpiryDate] = useState("2028-12-31");
  const [kycAffidavitConfirmed, setKycAffidavitConfirmed] = useState(false);
  const [kycError, setKycError] = useState<string | null>(null);
  const [kycSuccess, setKycSuccess] = useState<string | null>(null);

  // Official PESO Certificate Preview Modal State
  const [isCertPreviewOpen, setIsCertPreviewOpen] = useState(false);
  const [selectedCertSeller, setSelectedCertSeller] = useState<(typeof sellers)[0] | null>(null);

  // Quick Stock Edit State
  const [stockEditId, setStockEditId] = useState<string | null>(null);
  const [stockEditVal, setStockEditVal] = useState<number>(0);

  // Admin Assisted Customer Cart Creation State
  const [isCustomerCartModalOpen, setIsCustomerCartModalOpen] = useState(false);
  const [cartSelectedCustId, setCartSelectedCustId] = useState<string>("");
  const [cartCustomName, setCartCustomName] = useState("");
  const [cartCustomPhone, setCartCustomPhone] = useState("");
  const [cartCustomEmail, setCartCustomEmail] = useState("");
  const [cartCustomAddress, setCartCustomAddress] = useState("");
  const [cartProductQuantities, setCartProductQuantities] = useState<Record<string, number>>({});
  const [cartDepotLocation, setCartDepotLocation] = useState("PESO Licensed Hub #04, Sector 14, Gurugram (122001)");
  const [cartCarrierType, setCartCarrierType] = useState<"PESO_LICENSED_CARRIER" | "LICENSED_DEPOT_PICKUP">("PESO_LICENSED_CARRIER");
  const [cartVehicleNum, setCartVehicleNum] = useState("TN-67-AB-4040");
  const [cartDriverName, setCartDriverName] = useState("M. Murugan (எம். முருகன்)");
  const [cartDriverPhone, setCartDriverPhone] = useState("9842109876");
  const [cartDeliveryNotes, setCartDeliveryNotes] = useState("அட்மினால் பதிவு செய்யப்பட்ட நேரடி விநியோகம்");
  const [assistedOrderSuccess, setAssistedOrderSuccess] = useState<{ orderNumber: string; pin: string; name: string; total: number } | null>(null);
  const [assistedOrderError, setAssistedOrderError] = useState<string | null>(null);

  // Order Shipping Details & Delivery Status Editor State
  const [isEditShippingModalOpen, setIsEditShippingModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<MarketplaceOrder | null>(null);
  const [editStatus, setEditStatus] = useState<OrderStatusType>("CONFIRMED");
  const [editCarrierType, setEditCarrierType] = useState<"PESO_LICENSED_CARRIER" | "LICENSED_DEPOT_PICKUP">("PESO_LICENSED_CARRIER");
  const [editVehicleNum, setEditVehicleNum] = useState("");
  const [editDriverName, setEditDriverName] = useState("");
  const [editDriverPhone, setEditDriverPhone] = useState("");
  const [editDeliveryNotes, setEditDeliveryNotes] = useState("");

  const handleOpenEditShipping = (order: MarketplaceOrder) => {
    setEditingOrder(order);
    setEditStatus(order.status);
    setEditCarrierType(order.shippingDetails?.carrierType || "PESO_LICENSED_CARRIER");
    setEditVehicleNum(order.shippingDetails?.vehicleNumber || "");
    setEditDriverName(order.shippingDetails?.driverName || "");
    setEditDriverPhone(order.shippingDetails?.driverPhone || "");
    setEditDeliveryNotes(order.shippingDetails?.deliveryNotes || "");
    setIsEditShippingModalOpen(true);
  };

  const handleSaveShippingAndStatus = () => {
    if (!editingOrder) return;
    updateOrderShippingAndStatus(editingOrder.id, editStatus, {
      carrierType: editCarrierType,
      vehicleNumber: editVehicleNum,
      driverName: editDriverName,
      driverPhone: editDriverPhone,
      deliveryNotes: editDeliveryNotes,
      dispatchDate: new Date().toISOString()
    });
    setIsEditShippingModalOpen(false);
    setEditingOrder(null);
  };

  const handleCreateCustomerOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setAssistedOrderError(null);

    const itemsToOrder: { product: ManagedProduct; quantity: number }[] = [];
    Object.entries(cartProductQuantities).forEach(([prodId, qty]) => {
      if (qty > 0) {
        const prod = products.find((p) => p.id === prodId);
        if (prod) itemsToOrder.push({ product: prod, quantity: qty });
      }
    });

    if (itemsToOrder.length === 0) {
      setAssistedOrderError("குறைந்தது ஒரு பட்டாசை தேர்ந்தெடுத்து எண்ணிக்கையை உள்ளிடவும்.");
      return;
    }

    let customerIdToUse = cartSelectedCustId;
    if (cartSelectedCustId === "CUSTOM" || !cartSelectedCustId) {
      if (!cartCustomName || !cartCustomPhone) {
        setAssistedOrderError("வாடிக்கையாளர் பெயர் மற்றும் தொலைபேசி எண் கட்டாயமாகும்.");
        return;
      }
    }

    const createdOrder = createOrderByAdminForCustomer(
      customerIdToUse || "cust-001",
      itemsToOrder,
      cartDepotLocation,
      {
        carrierType: cartCarrierType,
        vehicleNumber: cartVehicleNum,
        driverName: cartDriverName,
        driverPhone: cartDriverPhone,
        dispatchDate: new Date().toISOString(),
        deliveryNotes: cartDeliveryNotes
      },
      user?.companyId || "demo-seller-id"
    );

    setAssistedOrderSuccess({
      orderNumber: createdOrder.orderNumber,
      pin: createdOrder.pickupPinOtp,
      name: createdOrder.customerName,
      total: createdOrder.totalAmount
    });

    setCartProductQuantities({});
  };

  // Filtered orders
  const filteredOrders = sellerOrders.filter((o) => {
    if (orderFilter === "READY") return o.status === "READY_FOR_PICKUP";
    if (orderFilter === "COMPLETED") return o.status === "COMPLETED";
    return true;
  });

  const pendingHandoverCount = sellerOrders.filter((o) => o.status === "READY_FOR_PICKUP").length;
  const completedHandoverCount = sellerOrders.filter((o) => o.status === "COMPLETED").length;

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderId || !enteredOtp) {
      setHandoverResult({ success: false, message: "Please select an order and enter the 6-digit OTP." });
      return;
    }

    const res = verifyDepotOtp(selectedOrderId, enteredOtp);
    setHandoverResult(res);
    if (res.success) {
      setEnteredOtp("");
      setSelectedOrderId("");
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    if (!bariumCertConfirmed) {
      setSubmitError("Statutory compliance requires certifying this product is 100% Barium-free.");
      return;
    }

    const decibels = parseFloat(newProductDecibels);
    if (isNaN(decibels) || decibels > 125) {
      setSubmitError("Decibel rating cannot exceed the Supreme Court statutory cap of 125 dB at 4m.");
      return;
    }

    const categoryNames: Record<string, string> = {
      sparklers: "Sparklers",
      "ground-chakkars": "Ground Chakkars",
      "flower-pots": "Flower Pots (Anar)",
      "sound-crackers": "Sound Crackers",
      "aerial-shells": "Aerial Shells & Shots",
      "gift-boxes": "Family Gift Boxes"
    };

    const res = submitProduct({
      name: newProductName,
      category: categoryNames[newProductCategory] || "Green Fireworks",
      categorySlug: newProductCategory,
      description: newProductDescription,
      chemicalComposition: newProductChemicals,
      decibelRating: decibels,
      neeriCertNumber: newProductNeeriCert,
      neeriQrUrl: `https://neeri.res.in/verify/qr?code=${encodeURIComponent(newProductNeeriCert)}`,
      basePrice: parseFloat(newProductBasePrice) || 200,
      salePrice: parseFloat(newProductSalePrice) || 160,
      stockQuantity: parseInt(newProductStock, 10) || 50,
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80"
    });

    if (!res.success) {
      setSubmitError(res.error || "Failed to submit product.");
    } else {
      setSubmitSuccess(t("productSubmittedNotice"));
      setIsProductModalOpen(false);
      // Reset form
      setNewProductName("");
      setBariumCertConfirmed(false);
    }
  };

  const handleRegisterKyc = (e: React.FormEvent) => {
    e.preventDefault();
    setKycError(null);
    setKycSuccess(null);

    if (!kycAffidavitConfirmed) {
      setKycError("Statutory compliance requires declaring that all submitted documents adhere to Explosives Act 1884.");
      return;
    }

    const storageKg = parseFloat(kycStorageKg) || 5000;
    const res = registerSellerKYC({
      businessName: kycBusinessName,
      tradeName: kycTradeName || kycBusinessName,
      gstin: kycGstin || "33AAACS9999F1Z0",
      pan: kycPan || "AAACS9999F",
      pesoLicenseNumber: kycPesoLicense,
      pesoFormType: kycPesoFormType,
      storageCapacityKg: storageKg,
      magazineAddress: kycMagazineAddress,
      policeNocNumber: kycPoliceNoc,
      licenseExpiryDate: kycExpiryDate
    });

    if (!res.success) {
      setKycError(res.error || "Failed to submit KYC application.");
    } else {
      setKycSuccess(t("sellerKycSubmittedMsg"));
      setIsKycModalOpen(false);
      // Reset form
      setKycBusinessName("");
      setKycTradeName("");
      setKycMagazineAddress("");
      setKycAffidavitConfirmed(false);
    }
  };

  const handleOpenCertPreview = (sellerItem: (typeof sellers)[0]) => {
    setSelectedCertSeller(sellerItem);
    setIsCertPreviewOpen(true);
  };

  return (
    <Box sx={{ minHeight: "100vh", pb: 12, backgroundColor: "background.default" }}>
      {/* Header Banner */}
      <Box
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          background: isDark
            ? "linear-gradient(180deg, rgba(245, 158, 11, 0.08) 0%, rgba(10, 15, 29, 0) 100%)"
            : "linear-gradient(180deg, rgba(245, 158, 11, 0.12) 0%, rgba(255, 255, 255, 0) 100%)",
          pt: { xs: 4, md: 6 },
          pb: 4
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)"
                  }}
                >
                  <Factory size={24} />
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: "'Outfit', 'Noto Sans Tamil', sans-serif" }}>
                    {t("sellerPortalTitle")}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {t("sellerPortalSubtitle")}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1.5 }}>
                <Chip
                  icon={<ShieldCheck size={14} color="#10b981" />}
                  label="பெசோ படிவம் LE-1: E/SC/TN/20/12345"
                  size="small"
                  sx={{ backgroundColor: isDark ? "rgba(16, 185, 129, 0.15)" : "rgba(16, 185, 129, 0.12)", color: isDark ? "#34d399" : "#065f46", fontWeight: 700 }}
                />
                <Chip
                  icon={<Building size={14} color="#f59e0b" />}
                  label="கிடங்கு: சிவகாசி-சாத்தூர் சாலை (5,000 கிலோ)"
                  size="small"
                  sx={{ backgroundColor: isDark ? "rgba(245, 158, 11, 0.15)" : "rgba(245, 158, 11, 0.12)", color: isDark ? "#fbbf24" : "#92400e", fontWeight: 700 }}
                />
                <Chip
                  icon={<CheckCircle2 size={14} color="#10b981" />}
                  label="நிலை: அங்கீகரிக்கப்பட்டது (உரிமம் சரிபார்க்கப்பட்டது)"
                  size="small"
                  color="success"
                  variant="outlined"
                  sx={{ fontWeight: 700 }}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                color="success"
                startIcon={<ShoppingCart size={18} />}
                onClick={() => {
                  setCartSelectedCustId(customers[0]?.id || "");
                  setIsCustomerCartModalOpen(true);
                }}
                sx={{ px: 2.5, py: 1.2, fontWeight: 800, borderRadius: "10px", backgroundColor: "#10b981", "&:hover": { backgroundColor: "#059669" } }}
              >
                🛒 வாடிக்கையாளருக்கு ஆர்டர் பதிவு / கார்ட் உருவாக்கு
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PlusCircle size={18} />}
                onClick={() => setIsProductModalOpen(true)}
                sx={{ px: 2.5, py: 1.2, fontWeight: 700, borderRadius: "10px" }}
              >
                {t("submitNewGreenCracker")}
              </Button>
            </Box>
          </Box>

          {/* Quick Metrics Cards */}
          <Grid container spacing={2.5} sx={{ mt: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: "14px" }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>
                      {t("sellerOrderCount")}
                    </Typography>
                    <ClipboardList size={20} color="#f59e0b" />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, color: "text.primary" }}>
                    {sellerOrders.length}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    அனைத்து வாடிக்கையாளர் கிடங்கு ஆர்டர்கள்
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: "14px" }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>
                      {t("sellerPendingHandover")}
                    </Typography>
                    <Clock size={20} color="#ef4444" />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, color: "#ef4444" }}>
                    {pendingHandoverCount}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    வாடிக்கையாளர் OTP சரிபார்ப்புக்கு காத்திருக்கிறது
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: "14px" }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>
                      {t("sellerTotalProducts")}
                    </Typography>
                    <PackageCheck size={20} color="#10b981" />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, color: "#10b981" }}>
                    {products.length}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    {products.filter((p) => p.approvalStatus === "UNDER_REVIEW").length} நிர்வாகி ஒப்புதலுக்கு காத்திருக்கிறது
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: "14px" }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>
                      {t("sellerGodownCap")}
                    </Typography>
                    <Building size={20} color="#3b82f6" />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, color: "text.primary" }}>
                    5,000 கிலோ
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    பெசோ படிவம் LE-1 சேமிப்புக் கிடங்கு
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        {/* Navigation Tabs (Fully Responsive on All Devices) */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(_, val) => setActiveTab(val)}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              "& .MuiTab-root": {
                fontWeight: 700,
                fontSize: { xs: "0.85rem", md: "0.95rem" },
                textTransform: "none",
                minHeight: 48,
                whiteSpace: "nowrap"
              }
            }}
          >
            <Tab
              icon={<ClipboardList size={18} />}
              iconPosition="start"
              label={`${t("sellerTabOrders")} (${sellerOrders.length})`}
            />
            <Tab
              icon={<PackageCheck size={18} />}
              iconPosition="start"
              label={`${t("sellerTabProducts")} (${products.length})`}
            />
            <Tab
              icon={<Building size={18} />}
              iconPosition="start"
              label={t("sellerTabGodown")}
            />
          </Tabs>
        </Box>

        {/* Success Alert if any */}
        {submitSuccess && (
          <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSubmitSuccess(null)}>
            {submitSuccess}
          </Alert>
        )}

        {/* TAB 0: INCOMING ORDERS & DEPOT HANDOVER ("RECEIVE THE ORDER") */}
        {activeTab === 0 && (
          <Grid container spacing={3}>
            {/* Left: Interactive Depot Collection OTP Handover Verification Card */}
            <Grid item xs={12} lg={4}>
              <Card
                sx={{
                  border: "2px solid #f59e0b",
                  borderRadius: "16px",
                  boxShadow: "0 8px 30px rgba(245, 158, 11, 0.15)",
                  position: "sticky",
                  top: 90
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1.5 }}>
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: "10px",
                        backgroundColor: "rgba(245, 158, 11, 0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#f59e0b"
                      }}
                    >
                      <KeyRound size={22} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 800, fontSize: "1.05rem" }}>
                        {t("otpVerificationCardTitle")}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        Zero-Trust Physical Depot Protocol
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.82rem", mb: 2.5 }}>
                    {t("otpVerificationCardDesc")}
                  </Typography>

                  {handoverResult && (
                    <Alert
                      severity={handoverResult.success ? "success" : "error"}
                      sx={{ mb: 2.5 }}
                      onClose={() => setHandoverResult(null)}
                    >
                      {handoverResult.message}
                    </Alert>
                  )}

                  <Box component="form" onSubmit={handleVerifyOtp} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="select-order-label">Select Customer Order</InputLabel>
                      <Select
                        labelId="select-order-label"
                        value={selectedOrderId}
                        label="Select Customer Order"
                        onChange={(e) => setSelectedOrderId(e.target.value)}
                      >
                        <MenuItem value="">
                          <em>-- Choose pending order --</em>
                        </MenuItem>
                        {sellerOrders
                          .filter((o) => o.status === "READY_FOR_PICKUP")
                          .map((o) => (
                            <MenuItem key={o.id} value={o.id}>
                              #{o.orderNumber} - {o.customerName} (₹{o.totalAmount})
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>

                    <TextField
                      fullWidth
                      size="small"
                      label={t("enterOtpPlaceholder")}
                      placeholder="e.g. 829140"
                      value={enteredOtp}
                      onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      inputProps={{ maxLength: 6, style: { letterSpacing: "0.2em", fontWeight: 700, fontSize: "1.2rem", textAlign: "center" } }}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={!selectedOrderId || enteredOtp.length !== 6}
                      startIcon={<CheckCircle2 size={18} />}
                      sx={{ py: 1.2, fontWeight: 700 }}
                    >
                      {t("verifyHandoverBtn")}
                    </Button>
                  </Box>

                  <Box
                    sx={{
                      mt: 3,
                      p: 2,
                      borderRadius: "10px",
                      backgroundColor: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)",
                      border: (theme) => `1px solid ${theme.palette.divider}`
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 0.5, color: "text.secondary" }}>
                      <ShieldCheck size={14} color="#10b981" /> Statutory Checklist:
                    </Typography>
                    <Typography variant="caption" sx={{ display: "block", color: "text.secondary", mt: 0.5, fontSize: "0.75rem" }}>
                      1. Check customer's original Govt Photo ID (18+ only).<br />
                      2. Match 6-digit OTP generated upon 15-min reservation.<br />
                      3. Confirm Green Cracker QR batch certificate before handover.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Right: Orders Feed & History */}
            <Grid item xs={12} lg={8}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Customer Orders ({filteredOrders.length})
                </Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    size="small"
                    variant={orderFilter === "ALL" ? "contained" : "outlined"}
                    onClick={() => setOrderFilter("ALL")}
                    sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 600 }}
                  >
                    {t("filterAllOrders")} ({sellerOrders.length})
                  </Button>
                  <Button
                    size="small"
                    variant={orderFilter === "READY" ? "contained" : "outlined"}
                    color="warning"
                    onClick={() => setOrderFilter("READY")}
                    sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 600 }}
                  >
                    {t("filterPendingOrders")} ({pendingHandoverCount})
                  </Button>
                  <Button
                    size="small"
                    variant={orderFilter === "COMPLETED" ? "contained" : "outlined"}
                    color="success"
                    onClick={() => setOrderFilter("COMPLETED")}
                    sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 600 }}
                  >
                    {t("filterCompletedOrders")} ({completedHandoverCount})
                  </Button>
                </Box>
              </Box>

              {filteredOrders.length === 0 ? (
                <Card sx={{ p: 6, textAlign: "center", borderRadius: "14px", border: (theme) => `1px solid ${theme.palette.divider}` }}>
                  <Box sx={{ fontSize: "2.5rem", mb: 1 }}>📦</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    No orders match this filter.
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Incoming customer reservations will appear here automatically.
                  </Typography>
                </Card>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                  {filteredOrders.map((order) => {
                    const isReady = order.status === "READY_FOR_PICKUP";
                    return (
                      <Card
                        key={order.id}
                        sx={{
                          borderRadius: "14px",
                          border: (theme) => `1px solid ${theme.palette.divider}`,
                          transition: "box-shadow 0.2s ease",
                          "&:hover": {
                            boxShadow: isDark ? "0 8px 30px rgba(0,0,0,0.5)" : "0 8px 25px rgba(0,0,0,0.06)"
                          }
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          {/* Top Row: Order ID, Timestamp, Company Badge & Status */}
                          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 1, mb: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                              <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: "monospace" }}>
                                #{order.orderNumber}
                              </Typography>
                              <Chip
                                label={
                                  order.status === "COMPLETED"
                                    ? "விநியோகிக்கப்பட்டது (COMPLETED)"
                                    : order.status === "DISPATCHED_LICENSED_CARRIER"
                                    ? "வாகனத்தில் அனுப்பப்பட்டது (DISPATCHED)"
                                    : order.status === "READY_FOR_PICKUP"
                                    ? "டெப்போவில் தயார் (READY FOR PICKUP)"
                                    : "உறுதிசெய்யப்பட்டது (CONFIRMED)"
                                }
                                color={
                                  order.status === "COMPLETED"
                                    ? "success"
                                    : order.status === "DISPATCHED_LICENSED_CARRIER"
                                    ? "secondary"
                                    : order.status === "READY_FOR_PICKUP"
                                    ? "warning"
                                    : "info"
                                }
                                size="small"
                                sx={{ fontWeight: 700 }}
                              />
                              {order.createdByAdmin && (
                                <Chip label="அட்மின் பதிவு செய்தது" size="small" color="primary" sx={{ fontWeight: 700 }} />
                              )}
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <Chip
                                icon={<Building size={14} />}
                                label={order.sellerName}
                                size="small"
                                variant="outlined"
                                sx={{ fontWeight: 700 }}
                              />
                              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                {new Date(order.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                              </Typography>
                            </Box>
                          </Box>

                          {/* Customer & Depot details */}
                          <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={12} sm={4}>
                              <Box sx={{ p: 1.5, borderRadius: "10px", backgroundColor: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)" }}>
                                <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                                  {t("customerDetails")}
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                  {order.customerName}
                                </Typography>
                                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                  📞 +91 {order.customerPhone} • {order.customerEmail}
                                </Typography>
                              </Box>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                              <Box sx={{ p: 1.5, borderRadius: "10px", backgroundColor: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)" }}>
                                <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                                  டெப்போ / விநியோக இடம்
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 0.5 }}>
                                  <MapPin size={14} color="#f59e0b" /> {order.depotLocation}
                                </Typography>
                                <Typography variant="caption" sx={{ color: "secondary.main", fontWeight: 700 }}>
                                  Expected PIN: {order.status === "COMPLETED" ? `Verified: ${order.pickupPinOtp}` : `••• ${order.pickupPinOtp.slice(-3)} (முழு OTP: ${order.pickupPinOtp})`}
                                </Typography>
                              </Box>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                              <Box sx={{ p: 1.5, borderRadius: "10px", backgroundColor: "rgba(16, 185, 129, 0.06)", border: "1px solid rgba(16, 185, 129, 0.25)" }}>
                                <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                                  <Truck size={14} color="#10b981" /> வெடிபொருள் ஷிப்பிங் விவரங்கள்:
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                  {order.shippingDetails?.vehicleNumber || "அங்கீகரிக்கப்பட்ட நேரடி கிடங்கு விநியோகம்"}
                                </Typography>
                                <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                                  ஓட்டுநர்: {order.shippingDetails?.driverName || "நியமிக்கப்படவில்லை"} {order.shippingDetails?.driverPhone ? `(${order.shippingDetails?.driverPhone})` : ""}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>

                          {/* Line Items Table */}
                          <Typography variant="caption" sx={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "text.secondary" }}>
                            {t("orderItemsHeading")}
                          </Typography>
                          <Box sx={{ overflowX: "auto", width: "100%", my: 1 }}>
                            <Table size="small" sx={{ minWidth: 460 }}>
                              <TableHead>
                                <TableRow sx={{ backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
                                  <TableCell sx={{ fontWeight: 700 }}>Item</TableCell>
                                  <TableCell sx={{ fontWeight: 700 }}>CSIR-NEERI Cert</TableCell>
                                  <TableCell align="center" sx={{ fontWeight: 700 }}>Qty</TableCell>
                                  <TableCell align="right" sx={{ fontWeight: 700 }}>Price</TableCell>
                                  <TableCell align="right" sx={{ fontWeight: 700 }}>Subtotal</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {order.items.map((item, idx) => (
                                  <TableRow key={idx}>
                                    <TableCell sx={{ fontWeight: 600 }}>{item.productName}</TableCell>
                                    <TableCell>
                                      <Chip
                                        label={item.neeriCertNumber}
                                        size="small"
                                        sx={{ fontSize: "0.68rem", height: 20, backgroundColor: isDark ? "rgba(16,185,129,0.15)" : "rgba(16,185,129,0.1)", color: "#10b981", fontWeight: 700 }}
                                      />
                                    </TableCell>
                                    <TableCell align="center">{item.quantity}</TableCell>
                                    <TableCell align="right">₹{item.salePrice.toFixed(2)}</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 700 }}>
                                      ₹{(item.salePrice * item.quantity).toFixed(2)}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>

                          <Divider sx={{ my: 1.5 }} />

                          {/* Bottom Row: Total, Shipping & Status Edit, OTP Verify Trigger */}
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                Total Amount: <Box component="span" sx={{ color: "primary.main", fontSize: "1.1rem" }}>₹{order.totalAmount.toFixed(2)}</Box>
                              </Typography>
                              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                Incl. 18% GST & PESO Statutory Packaging Fee
                              </Typography>
                            </Box>

                            <Box sx={{ display: "flex", gap: 1 }}>
                              <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                startIcon={<Edit3 size={15} />}
                                onClick={() => handleOpenEditShipping(order)}
                                sx={{ fontWeight: 700, borderRadius: "8px" }}
                              >
                                ஷிப்பிங் & நிலை மாற்றுக
                              </Button>

                              {order.status !== "COMPLETED" && (
                                <Button
                                  variant="contained"
                                  color="warning"
                                  size="small"
                                  startIcon={<KeyRound size={16} />}
                                  onClick={() => {
                                    setSelectedOrderId(order.id);
                                    window.scrollTo({ top: 300, behavior: "smooth" });
                                  }}
                                  sx={{ fontWeight: 700, borderRadius: "8px" }}
                                >
                                  Enter Customer OTP
                                </Button>
                              )}

                              {order.status === "COMPLETED" && (
                                <Chip
                                  icon={<CheckCircle2 size={16} color="#10b981" />}
                                  label={`Handed Over at ${order.handedOverAt ? new Date(order.handedOverAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Counter"}`}
                                  color="success"
                                  variant="outlined"
                                  sx={{ fontWeight: 700 }}
                                />
                              )}
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    );
                  })}
                </Box>
              )}
            </Grid>
          </Grid>
        )}

        {/* TAB 1: PRODUCTS & GREEN INVENTORY ("RECEIVE THE PRODUCT / MANAGE PRODUCTS") */}
        {activeTab === 1 && (
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Green Cracker Products ({products.length})
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  All items must comply with CSIR-NEERI Green Formulation and statutory sound limit (≤ 125 dB).
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                startIcon={<PlusCircle size={18} />}
                onClick={() => setIsProductModalOpen(true)}
                sx={{ borderRadius: "10px", fontWeight: 700 }}
              >
                {t("submitNewGreenCracker")}
              </Button>
            </Box>

            <Grid container spacing={2.5}>
              {products.map((prod) => {
                const isUnderReview = prod.approvalStatus === "UNDER_REVIEW";
                const isApproved = prod.approvalStatus === "APPROVED";
                const isRejected = prod.approvalStatus === "REJECTED";

                return (
                  <Grid item xs={12} md={6} lg={4} key={prod.id}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "14px",
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        position: "relative",
                        overflow: "hidden"
                      }}
                    >
                      {/* Product Image & Badges */}
                      <Box sx={{ position: "relative", height: 160, overflow: "hidden" }}>
                        <Box
                          component="img"
                          src={prod.image}
                          alt={prod.name}
                          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                        <Box sx={{ position: "absolute", top: 10, right: 10 }}>
                          <Chip
                            label={
                              isApproved
                                ? "APPROVED"
                                : isUnderReview
                                ? "UNDER REVIEW (Admin)"
                                : "REJECTED"
                            }
                            color={isApproved ? "success" : isUnderReview ? "warning" : "error"}
                            size="small"
                            sx={{ fontWeight: 800, fontSize: "0.7rem", backdropFilter: "blur(6px)" }}
                          />
                        </Box>
                        <Box sx={{ position: "absolute", bottom: 10, left: 10 }}>
                          <Chip
                            icon={<Volume2 size={12} />}
                            label={`${prod.decibelRating} dB (≤125 dB)`}
                            size="small"
                            sx={{
                              backgroundColor: "rgba(0,0,0,0.6)",
                              color: "#fff",
                              fontWeight: 700,
                              fontSize: "0.68rem"
                            }}
                          />
                        </Box>
                      </Box>

                      <CardContent sx={{ p: 2.5, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                        <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 700, textTransform: "uppercase" }}>
                          {prod.category}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.25, mt: 0.5, mb: 1 }}>
                          {prod.name}
                        </Typography>

                        <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8rem", mb: 1.5, flexGrow: 1 }}>
                          {prod.description}
                        </Typography>

                        {/* CSIR-NEERI & Chemical Specs */}
                        <Box
                          sx={{
                            p: 1.5,
                            borderRadius: "8px",
                            backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                            border: (theme) => `1px solid ${theme.palette.divider}`,
                            mb: 2
                          }}
                        >
                          <Typography variant="caption" sx={{ display: "flex", alignItems: "center", gap: 0.5, fontWeight: 700, color: "#10b981" }}>
                            <QrCode size={13} /> {prod.neeriCertNumber}
                          </Typography>
                          <Typography variant="caption" sx={{ display: "block", color: "text.secondary", fontSize: "0.72rem", mt: 0.5 }}>
                            {prod.chemicalComposition}
                          </Typography>
                        </Box>

                        {/* Rejection Notice if any */}
                        {isRejected && prod.rejectionReason && (
                          <Alert severity="error" sx={{ mb: 2, py: 0.5, fontSize: "0.75rem" }}>
                            <strong>Rejection Reason:</strong> {prod.rejectionReason}
                          </Alert>
                        )}

                        <Divider sx={{ my: 1 }} />

                        {/* Price & Stock Adjustment */}
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Box>
                            <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                              Sale Price
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary" }}>
                              ₹{prod.salePrice}{" "}
                              <Box component="span" sx={{ fontSize: "0.8rem", textDecoration: "line-through", color: "text.secondary", fontWeight: 400 }}>
                                ₹{prod.basePrice}
                              </Box>
                            </Typography>
                          </Box>

                          <Box sx={{ textAlign: "right" }}>
                            <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                              Live Inventory
                            </Typography>
                            {stockEditId === prod.id ? (
                              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <TextField
                                  type="number"
                                  size="small"
                                  value={stockEditVal}
                                  onChange={(e) => setStockEditVal(parseInt(e.target.value, 10) || 0)}
                                  sx={{ width: 70, "& input": { py: 0.5, fontSize: "0.85rem", textAlign: "center" } }}
                                />
                                <Button
                                  size="small"
                                  variant="contained"
                                  color="success"
                                  onClick={() => {
                                    updateProductStock(prod.id, stockEditVal);
                                    setStockEditId(null);
                                  }}
                                  sx={{ minWidth: 32, p: 0.5 }}
                                >
                                  ✓
                                </Button>
                              </Box>
                            ) : (
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: prod.stockQuantity < 50 ? "error.main" : "text.primary" }}>
                                  {prod.stockQuantity} units
                                </Typography>
                                <Tooltip title="Update Stock">
                                  <IconButton
                                    size="small"
                                    onClick={() => {
                                      setStockEditId(prod.id);
                                      setStockEditVal(prod.stockQuantity);
                                    }}
                                  >
                                    <RefreshCw size={14} />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}

        {/* TAB 2: PESO LICENSE & GODOWN SPECS (PHASE 2 COMPLIANCE) */}
        {activeTab === 2 && (
          <Box>
            {/* Tab 2 Header Actions */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  {t("sellerTabGodown")}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Explosives Act (1884) & Rule 2008 Compliance • PESO Form LE-1 Wholesale Storage & Safety Clearances
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                startIcon={<PlusCircle size={18} />}
                onClick={() => setIsKycModalOpen(true)}
                sx={{ borderRadius: "10px", fontWeight: 700, px: 2.5, py: 1 }}
              >
                + புதிய விற்பனையாளர் பதிவு / KYC சமர்ப்பிக்க
              </Button>
            </Box>

            {kycSuccess && (
              <Alert severity="success" sx={{ mb: 3 }} onClose={() => setKycSuccess(null)}>
                {kycSuccess}
              </Alert>
            )}

            {/* Registered Sellers & KYC Dossiers */}
            <Grid container spacing={3}>
              {sellers.map((seller) => {
                const isApproved = seller.verificationStatus === "APPROVED";
                const isUnderReview = seller.verificationStatus === "UNDER_REVIEW";

                return (
                  <Grid item xs={12} lg={6} key={seller.id}>
                    <Card
                      sx={{
                        borderRadius: "16px",
                        border: isUnderReview
                          ? "2px solid #f59e0b"
                          : isApproved
                          ? (theme) => `1px solid ${theme.palette.divider}`
                          : "2px solid #ef4444",
                        p: 3,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        background: isDark
                          ? "linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.01) 100%)"
                          : "linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(248, 250, 252, 1) 100%)"
                      }}
                    >
                      <Box>
                        {/* Header: Business Name & Status */}
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2, gap: 1 }}>
                          <Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <Building size={20} color={isApproved ? "#10b981" : "#f59e0b"} />
                              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                                {seller.businessName}
                              </Typography>
                            </Box>
                            <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.5 }}>
                              {seller.tradeName} • GSTIN: {seller.gstin || "33AAACS1234F1Z8"}
                            </Typography>
                          </Box>

                          <Chip
                            icon={isApproved ? <ShieldCheck size={14} /> : isUnderReview ? <Clock size={14} /> : <AlertTriangle size={14} />}
                            label={seller.verificationStatus}
                            color={isApproved ? "success" : isUnderReview ? "warning" : "error"}
                            size="small"
                            sx={{ fontWeight: 800 }}
                          />
                        </Box>

                        {/* Specs Grid */}
                        <Grid container spacing={1.5} sx={{ mb: 2 }}>
                          <Grid item xs={12} sm={6}>
                            <Paper sx={{ p: 1.5, borderRadius: "10px", backgroundColor: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0,0,0,0.02)" }}>
                              <Typography variant="caption" sx={{ color: "text.secondary" }}>PESO License Number</Typography>
                              <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: "monospace", color: "primary.main" }}>
                                {seller.pesoLicenseNumber}
                              </Typography>
                              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                {seller.pesoFormType || "Form LE-1"}
                              </Typography>
                            </Paper>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Paper sx={{ p: 1.5, borderRadius: "10px", backgroundColor: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0,0,0,0.02)" }}>
                              <Typography variant="caption" sx={{ color: "text.secondary" }}>Storage Capacity</Typography>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: "#10b981" }}>
                                {seller.storageCapacityKg.toLocaleString()} KG
                              </Typography>
                              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                Class 7, Div 2 Fireworks
                              </Typography>
                            </Paper>
                          </Grid>

                          <Grid item xs={12}>
                            <Paper sx={{ p: 1.5, borderRadius: "10px", backgroundColor: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0,0,0,0.02)" }}>
                              <Typography variant="caption" sx={{ color: "text.secondary" }}>Physical Magazine Location</Typography>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                📍 {seller.magazineAddress}
                              </Typography>
                              <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.5 }}>
                                Police NOC: {seller.policeNocNumber} • Expiry: {seller.licenseExpiryDate || "2028-12-31"}
                              </Typography>
                            </Paper>
                          </Grid>
                        </Grid>

                        {/* Uploaded Dossier Documents */}
                        {seller.documents && seller.documents.length > 0 && (
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary", display: "block", mb: 1 }}>
                              சமர்ப்பிக்கப்பட்ட சட்டப்பூர்வ ஆவணங்கள் ({seller.documents.length}):
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                              {seller.documents.map((doc, idx) => (
                                <Box
                                  key={idx}
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    p: 1,
                                    px: 1.5,
                                    borderRadius: "8px",
                                    backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                                    border: (theme) => `1px solid ${theme.palette.divider}`
                                  }}
                                >
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <FileText size={16} color="#3b82f6" />
                                    <Box>
                                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "0.82rem" }}>
                                        {doc.docTitle}
                                      </Typography>
                                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                        {doc.fileName} ({doc.fileSize})
                                      </Typography>
                                    </Box>
                                  </Box>
                                  <Chip
                                    label={doc.isVerified ? "சரிபார்க்கப்பட்டது" : "ஆய்வில் உள்ளது"}
                                    size="small"
                                    color={doc.isVerified ? "success" : "default"}
                                    sx={{ fontSize: "0.7rem", height: 22 }}
                                  />
                                </Box>
                              ))}
                            </Box>
                          </Box>
                        )}
                      </Box>

                      {/* Action buttons */}
                      <Box sx={{ display: "flex", gap: 1.5, mt: 2 }}>
                        <Button
                          variant="outlined"
                          color="primary"
                          fullWidth
                          startIcon={<FileText size={16} />}
                          onClick={() => handleOpenCertPreview(seller)}
                          sx={{ borderRadius: "10px", fontWeight: 700, py: 1 }}
                        >
                          {t("viewCertificateBtn")}
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}
      </Container>

      {/* MODAL 1: SUBMIT NEW GREEN CRACKER PRODUCT */}
      <Dialog
        open={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: "16px", p: 1 }
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: "1.3rem" }}>
          {t("modalSubmitProductTitle")}
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5, fontWeight: 400 }}>
            {t("modalSubmitProductSubtitle")}
          </Typography>
        </DialogTitle>

        <Box component="form" onSubmit={handleCreateProduct}>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            {submitError && <Alert severity="error">{submitError}</Alert>}

            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  size="small"
                  label={t("inputProductName")}
                  placeholder="e.g. CSIR-NEERI Eco Golden Shower Sparklers (10 Pcs)"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel id="category-select-label">{t("inputCategory")}</InputLabel>
                  <Select
                    labelId="category-select-label"
                    value={newProductCategory}
                    label={t("inputCategory")}
                    onChange={(e) => setNewProductCategory(e.target.value)}
                  >
                    <MenuItem value="sparklers">Sparklers</MenuItem>
                    <MenuItem value="ground-chakkars">Ground Chakkars</MenuItem>
                    <MenuItem value="flower-pots">Flower Pots (Anar)</MenuItem>
                    <MenuItem value="sound-crackers">Sound Crackers</MenuItem>
                    <MenuItem value="aerial-shells">Aerial Shells & Shots</MenuItem>
                    <MenuItem value="gift-boxes">Family Gift Boxes</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label={t("inputBasePrice")}
                  value={newProductBasePrice}
                  onChange={(e) => setNewProductBasePrice(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label={t("inputSalePrice")}
                  value={newProductSalePrice}
                  onChange={(e) => setNewProductSalePrice(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label={t("inputStockQty")}
                  value={newProductStock}
                  onChange={(e) => setNewProductStock(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={7}>
                <TextField
                  fullWidth
                  size="small"
                  label={t("inputNeeriCert")}
                  placeholder="e.g. CSIR-NEERI-2026-SPK-9014"
                  value={newProductNeeriCert}
                  onChange={(e) => setNewProductNeeriCert(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label={t("inputDecibelRating")}
                  value={newProductDecibels}
                  onChange={(e) => setNewProductDecibels(e.target.value)}
                  helperText="Supreme Court Statutory Cap: ≤ 125 dB at 4m"
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  label={t("inputChemicalFormula")}
                  multiline
                  rows={2}
                  value={newProductChemicals}
                  onChange={(e) => setNewProductChemicals(e.target.value)}
                  helperText="Zero toxic Barium, Antimony, Lithium, Mercury, Arsenic, or Lead allowed."
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="Product Description & Safety Instructions"
                  multiline
                  rows={2}
                  value={newProductDescription}
                  onChange={(e) => setNewProductDescription(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <Paper sx={{ p: 2, backgroundColor: isDark ? "rgba(16,185,129,0.08)" : "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={bariumCertConfirmed}
                        onChange={(e) => setBariumCertConfirmed(e.target.checked)}
                        color="success"
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ fontWeight: 600, color: isDark ? "#34d399" : "#065f46" }}>
                        {t("bariumFreeComplianceCert")}
                      </Typography>
                    }
                  />
                </Paper>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setIsProductModalOpen(false)} sx={{ textTransform: "none" }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!bariumCertConfirmed || !newProductName}
              sx={{ fontWeight: 700, px: 3 }}
            >
              {t("submitToAdminBtn")}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* MODAL 2: PHASE 2 SELLER ONBOARDING & KYC APPLICATION */}
      <Dialog
        open={isKycModalOpen}
        onClose={() => setIsKycModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: "16px", p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: "1.3rem" }}>
          {t("sellerOnboardingTitle")}
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5, fontWeight: 400 }}>
            {t("sellerOnboardingSubtitle")}
          </Typography>
        </DialogTitle>

        <Box component="form" onSubmit={handleRegisterKyc}>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            {kycError && <Alert severity="error">{kycError}</Alert>}

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  label={t("businessLegalName")}
                  placeholder="e.g. Sri Balaji Fireworks Private Limited"
                  value={kycBusinessName}
                  onChange={(e) => setKycBusinessName(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  label={t("tradeBrandName")}
                  placeholder="e.g. Balaji Sparklers (பாலாஜி பட்டாசு)"
                  value={kycTradeName}
                  onChange={(e) => setKycTradeName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  label={t("gstinLabel")}
                  placeholder="e.g. 33AAACS5555F1Z9"
                  value={kycGstin}
                  onChange={(e) => setKycGstin(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  label={t("panLabel")}
                  placeholder="e.g. AAACS5555F"
                  value={kycPan}
                  onChange={(e) => setKycPan(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="PESO License Number"
                  placeholder="e.g. E/SC/TN/20/77651(LE-1)"
                  value={kycPesoLicense}
                  onChange={(e) => setKycPesoLicense(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel id="form-type-label">{t("pesoFormTypeLabel")}</InputLabel>
                  <Select
                    labelId="form-type-label"
                    value={kycPesoFormType}
                    label={t("pesoFormTypeLabel")}
                    onChange={(e) => setKycPesoFormType(e.target.value)}
                  >
                    <MenuItem value="Form LE-1 (Wholesale Fireworks Storage)">Form LE-1 (Wholesale Fireworks Storage)</MenuItem>
                    <MenuItem value="Form LE-3 (Retail Shop & Temporary Shed)">Form LE-3 (Retail Shop & Temporary Shed)</MenuItem>
                    <MenuItem value="Form LE-5 (Explosives Carrier Van Transit)">Form LE-5 (Explosives Carrier Van Transit)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label={t("storageCapacityKgLabel")}
                  value={kycStorageKg}
                  onChange={(e) => setKycStorageKg(e.target.value)}
                  helperText="Statutory capacity limit in KG (e.g. 5,000 kg)"
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  label={t("policeNocNumberLabel")}
                  placeholder="e.g. POL/NOC/2026/9912"
                  value={kycPoliceNoc}
                  onChange={(e) => setKycPoliceNoc(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  label={t("magazineAddressLabel")}
                  placeholder="e.g. Survey No 182, Sattur Main Road, Sivakasi, Tamil Nadu 626124"
                  value={kycMagazineAddress}
                  onChange={(e) => setKycMagazineAddress(e.target.value)}
                  multiline
                  rows={2}
                  required
                />
              </Grid>

              {/* Simulated Statutory File Upload Preview */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "text.primary" }}>
                  இணைக்கப்படும் சட்டப்பூர்வ ஆவணங்கள் (Simulated Statutory Attachments):
                </Typography>
                <Grid container spacing={1.5}>
                  <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 1.5, textAlign: "center", border: "1px dashed #3b82f6", backgroundColor: isDark ? "rgba(59,130,246,0.05)" : "rgba(59,130,246,0.03)", borderRadius: "10px" }}>
                      <FileText size={22} color="#3b82f6" style={{ margin: "0 auto 4px" }} />
                      <Typography variant="caption" sx={{ fontWeight: 700, display: "block" }}>{t("uploadPesoDoc")}</Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>PESO_Form_LE1.pdf (2.8 MB)</Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 1.5, textAlign: "center", border: "1px dashed #10b981", backgroundColor: isDark ? "rgba(16,185,129,0.05)" : "rgba(16,185,129,0.03)", borderRadius: "10px" }}>
                      <ShieldCheck size={22} color="#10b981" style={{ margin: "0 auto 4px" }} />
                      <Typography variant="caption" sx={{ fontWeight: 700, display: "block" }}>{t("uploadPoliceNocDoc")}</Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>Police_NOC_Virudhunagar.pdf (1.4 MB)</Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Paper sx={{ p: 1.5, textAlign: "center", border: "1px dashed #f59e0b", backgroundColor: isDark ? "rgba(245,158,11,0.05)" : "rgba(245,158,11,0.03)", borderRadius: "10px" }}>
                      <Building size={22} color="#f59e0b" style={{ margin: "0 auto 4px" }} />
                      <Typography variant="caption" sx={{ fontWeight: 700, display: "block" }}>{t("uploadBlueprintDoc")}</Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>Godown_Safety_Map.pdf (3.5 MB)</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>

              {/* Statutory Affirmation */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, backgroundColor: isDark ? "rgba(59,130,246,0.08)" : "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={kycAffidavitConfirmed}
                        onChange={(e) => setKycAffidavitConfirmed(e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ fontWeight: 600, color: isDark ? "#60a5fa" : "#1d4ed8" }}>
                        வெடிபொருள் சட்டம் (1884), விதிகள் (2008) மற்றும் உச்ச நீதிமன்ற நெறிமுறைகளின்படி அனைத்து ஆவணங்களும் உண்மையானவை என சான்றளிக்கிறேன்.
                      </Typography>
                    }
                  />
                </Paper>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setIsKycModalOpen(false)}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!kycAffidavitConfirmed || !kycBusinessName}
              sx={{ fontWeight: 700, px: 3 }}
            >
              {t("submitKycBtn")}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* MODAL 3: OFFICIAL PESO FORM LE-1 CERTIFICATE PREVIEW */}
      <Dialog
        open={isCertPreviewOpen}
        onClose={() => setIsCertPreviewOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            p: 2,
            background: isDark
              ? "linear-gradient(135deg, #111827 0%, #1f2937 100%)"
              : "linear-gradient(135deg, #fefefe 0%, #f9fafb 100%)"
          }
        }}
      >
        <DialogTitle sx={{ textAlign: "center", pt: 2, pb: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                boxShadow: "0 4px 15px rgba(245, 158, 11, 0.4)"
              }}
            >
              <ShieldCheck size={32} />
            </Box>
          </Box>
          <Typography variant="caption" sx={{ letterSpacing: "0.15em", textTransform: "uppercase", color: "text.secondary", fontWeight: 700 }}>
            GOVERNMENT OF INDIA • MINISTRY OF COMMERCE & INDUSTRY
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 900, color: "text.primary", mt: 0.5 }}>
            PETROLEUM AND EXPLOSIVES SAFETY ORGANISATION (PESO)
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "primary.main", fontWeight: 700 }}>
            FORM LE-1 • LICENSE TO POSSESS AND SELL CLASS 7 EXPLOSIVES (FIREWORKS)
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ px: { xs: 2, md: 4 }, py: 2 }}>
          {selectedCertSeller && (
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "12px",
                border: "2px solid #f59e0b",
                backgroundColor: isDark ? "rgba(245, 158, 11, 0.03)" : "rgba(245, 158, 11, 0.04)"
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>License Number</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: "monospace", color: "#f59e0b" }}>
                    {selectedCertSeller.pesoLicenseNumber}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>Statutory Validity</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Valid until {selectedCertSeller.licenseExpiryDate || "31-12-2028"}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 0.5 }} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>Authorized Licensee</Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {selectedCertSeller.businessName}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    Trade: {selectedCertSeller.tradeName}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>Licensed Magazine Storage Limit</Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#10b981" }}>
                    {selectedCertSeller.storageCapacityKg.toLocaleString()} Kilograms (KG)
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    Class 7, Division 2, Sub-division 2 (Manufactured Fireworks)
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>Approved Magazine Coordinates & Site</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {selectedCertSeller.magazineAddress}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>District Police NOC Reference</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: "monospace" }}>
                    {selectedCertSeller.policeNocNumber}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>Regulatory Clearance Status</Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <Chip
                      label={selectedCertSeller.verificationStatus}
                      color={selectedCertSeller.verificationStatus === "APPROVED" ? "success" : "warning"}
                      size="small"
                      sx={{ fontWeight: 800 }}
                    />
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, pt: 2, borderTop: (theme) => `1px dashed ${theme.palette.divider}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <QrCode size={40} color="#10b981" />
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, display: "block" }}>
                      Digital Verification QR
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.7rem" }}>
                      PESO Central Database Reg #7721
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, display: "block", color: "text.secondary" }}>
                    Joint Chief Controller of Explosives
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.7rem" }}>
                    South Circle, Chennai / Sivakasi Sub-Circle
                  </Typography>
                </Box>
              </Box>
            </Paper>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2.5, justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsCertPreviewOpen(false)}
            sx={{ px: 4, fontWeight: 700 }}
          >
            சரி / முடிந்தது (Close)
          </Button>
        </DialogActions>
      </Dialog>

      {/* DIALOG: EDIT ORDER SHIPPING & DELIVERY STATUS */}
      <Dialog
        open={isEditShippingModalOpen}
        onClose={() => setIsEditShippingModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: "16px", p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, display: "flex", alignItems: "center", gap: 1 }}>
          <Truck size={22} color="#10b981" />
          ஷிப்பிங் விவரங்கள் & டெலிவரி நிலை மாற்றுக
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 1 }}>
          <Box sx={{ p: 1.5, borderRadius: "10px", backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
              ஆர்டர் எண்: #{editingOrder?.orderNumber} ({editingOrder?.customerName})
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              நிறுவனம்: {editingOrder?.sellerName}
            </Typography>
          </Box>

          <FormControl fullWidth size="small">
            <InputLabel id="edit-delivery-status-label">டெலிவரி நிலை (Delivery Status)</InputLabel>
            <Select
              labelId="edit-delivery-status-label"
              value={editStatus}
              label="டெலிவரி நிலை (Delivery Status)"
              onChange={(e) => setEditStatus(e.target.value as OrderStatusType)}
            >
              <MenuItem value="CONFIRMED">உறுதிசெய்யப்பட்டது (CONFIRMED)</MenuItem>
              <MenuItem value="READY_FOR_PICKUP">டெப்போவில் தயார் (READY FOR PICKUP)</MenuItem>
              <MenuItem value="DISPATCHED_LICENSED_CARRIER">வாகனத்தில் அனுப்பப்பட்டது (DISPATCHED LICENSED CARRIER)</MenuItem>
              <MenuItem value="COMPLETED">விநியோகிக்கப்பட்டது (COMPLETED)</MenuItem>
              <MenuItem value="CANCELLED">ரத்துசெய்யப்பட்டது (CANCELLED)</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel id="edit-carrier-type-label">போக்குவரத்து வகை (Carrier Type)</InputLabel>
            <Select
              labelId="edit-carrier-type-label"
              value={editCarrierType}
              label="போக்குவரத்து வகை (Carrier Type)"
              onChange={(e) => setEditCarrierType(e.target.value as any)}
            >
              <MenuItem value="PESO_LICENSED_CARRIER">பெசோ உரிமம் பெற்ற வெடிபொருள் வாகனம் (PESO Licensed Carrier)</MenuItem>
              <MenuItem value="LICENSED_DEPOT_PICKUP">அங்கீகரிக்கப்பட்ட கிடங்கில் நேரடி விநியோகம் (Depot Pickup)</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            size="small"
            label="வெடிபொருள் வாகன எண் (Licensed Vehicle Number)"
            value={editVehicleNum}
            onChange={(e) => setEditVehicleNum(e.target.value)}
            placeholder="எ.கா: TN-67-AB-4040"
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="ஓட்டுநர் பெயர் (Driver Name)"
                value={editDriverName}
                onChange={(e) => setEditDriverName(e.target.value)}
                placeholder="எ.கா: எம். முருகன்"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="ஓட்டுநர் அலைபேசி (Driver Phone)"
                value={editDriverPhone}
                onChange={(e) => setEditDriverPhone(e.target.value)}
                placeholder="9842109876"
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            size="small"
            multiline
            rows={2}
            label="விநியோக குறிப்புகள் (Delivery Notes)"
            value={editDeliveryNotes}
            onChange={(e) => setEditDeliveryNotes(e.target.value)}
            placeholder="தீயணைப்புக் கருவியுடன் அனுப்பப்பட்டுள்ளது."
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setIsEditShippingModalOpen(false)}>ரத்து செய்</Button>
          <Button variant="contained" color="primary" onClick={handleSaveShippingAndStatus} sx={{ fontWeight: 800 }}>
            சேமித்து புதுப்பிக்கவும்
          </Button>
        </DialogActions>
      </Dialog>

      {/* DIALOG: ADMIN ASSISTED CUSTOMER CART CREATION */}
      <Dialog
        open={isCustomerCartModalOpen}
        onClose={() => {
          setIsCustomerCartModalOpen(false);
          setAssistedOrderSuccess(null);
        }}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: "16px", p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, display: "flex", alignItems: "center", gap: 1 }}>
          <ShoppingCart size={22} color="#10b981" />
          வாடிக்கையாளருக்கு ஆர்டர் பதிவு / கார்ட் உருவாக்கு (Assisted Customer Booking)
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 1 }}>
          {assistedOrderSuccess ? (
            <Paper sx={{ p: 3, textAlign: "center", backgroundColor: isDark ? "rgba(16,185,129,0.1)" : "rgba(16,185,129,0.15)", border: "1px solid #10b981", borderRadius: "14px" }}>
              <Box sx={{ fontSize: "2.5rem", mb: 1 }}>🎉</Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: "#10b981", mb: 1 }}>
                வாடிக்கையாளர் ஆர்டர் பதிவு செய்யப்பட்டது!
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                ஆர்டர் எண்: #{assistedOrderSuccess.orderNumber}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
                வாடிக்கையாளர்: {assistedOrderSuccess.name} • மொத்தத் தொகை: ₹{assistedOrderSuccess.total.toFixed(2)}
              </Typography>

              <Box sx={{ my: 2.5, p: 2, borderRadius: "12px", backgroundColor: isDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.8)", border: "2px dashed #10b981", display: "inline-block" }}>
                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, display: "block" }}>
                  வாடிக்கையாளர் விநியோக PIN / OTP (Customer Collection PIN):
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: "0.25em", color: "#10b981", my: 0.5, fontFamily: "monospace" }}>
                  {assistedOrderSuccess.pin}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  வாடிக்கையாளர் நேரில் கிடங்கில்/டெலிவரியில் சமர்ப்பிக்க வேண்டிய ரகசிய குறியீடு.
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    setIsCustomerCartModalOpen(false);
                    setAssistedOrderSuccess(null);
                  }}
                  sx={{ fontWeight: 800, px: 3 }}
                >
                  ஆர்டர்கள் பட்டியலுக்கு செல்க
                </Button>
              </Box>
            </Paper>
          ) : (
            <>
              {assistedOrderError && <Alert severity="error">{assistedOrderError}</Alert>}

              {/* Step 1: Select Customer */}
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "primary.main" }}>
                1. வாடிக்கையாளர் தேர்வு (Customer Selection):
              </Typography>

              <FormControl fullWidth size="small">
                <InputLabel id="select-customer-cart-label">பதிவுசெய்த வாடிக்கையாளர் (Registered Customer)</InputLabel>
                <Select
                  labelId="select-customer-cart-label"
                  value={cartSelectedCustId}
                  label="பதிவுசெய்த வாடிக்கையாளர் (Registered Customer)"
                  onChange={(e) => setCartSelectedCustId(e.target.value)}
                >
                  {customers.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.fullName} - 📞 +91 {c.phone} ({c.email})
                    </MenuItem>
                  ))}
                  <MenuItem value="CUSTOM">➕ புதிய வாடிக்கையாளர் விவரங்களை உள்ளிடவும்</MenuItem>
                </Select>
              </FormControl>

              {cartSelectedCustId === "CUSTOM" && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="வாடிக்கையாளர் பெயர்"
                      value={cartCustomName}
                      onChange={(e) => setCartCustomName(e.target.value)}
                      placeholder="எ.கா: விஜய் ஆனந்த்"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="தொலைபேசி எண்"
                      value={cartCustomPhone}
                      onChange={(e) => setCartCustomPhone(e.target.value)}
                      placeholder="9842100000"
                      required
                    />
                  </Grid>
                </Grid>
              )}

              <Divider />

              {/* Step 2: Select Products */}
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "primary.main" }}>
                2. நிறுவனத்தின் பட்டாசுகள் & எண்ணிக்கை தேர்வு (Product Items & Quantities):
              </Typography>

              <Box sx={{ maxHeight: 220, overflowY: "auto", border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: "10px", p: 1 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>பட்டாசு பெயர்</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>சான்றிதழ்</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>விலை</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>இருப்பு</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700 }}>எண்ணிக்கை</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products
                      .filter((p) => p.approvalStatus === "APPROVED")
                      .map((p) => {
                        const curQty = cartProductQuantities[p.id] || 0;
                        return (
                          <TableRow key={p.id}>
                            <TableCell sx={{ fontWeight: 600 }}>{p.name}</TableCell>
                            <TableCell>
                              <Chip label={p.neeriCertNumber} size="small" sx={{ fontSize: "0.68rem" }} />
                            </TableCell>
                            <TableCell align="right">₹{p.salePrice}</TableCell>
                            <TableCell align="center">{p.stockQuantity}</TableCell>
                            <TableCell align="center">
                              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  onClick={() =>
                                    setCartProductQuantities((prev) => ({
                                      ...prev,
                                      [p.id]: Math.max(0, (prev[p.id] || 0) - 1)
                                    }))
                                  }
                                  sx={{ minWidth: 28, p: 0 }}
                                >
                                  -
                                </Button>
                                <Typography sx={{ minWidth: 28, textAlign: "center", fontWeight: 700 }}>
                                  {curQty}
                                </Typography>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  onClick={() =>
                                    setCartProductQuantities((prev) => ({
                                      ...prev,
                                      [p.id]: (prev[p.id] || 0) + 1
                                    }))
                                  }
                                  sx={{ minWidth: 28, p: 0 }}
                                >
                                  +
                                </Button>
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </Box>

              <Divider />

              {/* Step 3: Shipping & Delivery Info */}
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "primary.main" }}>
                3. விநியோக கிடங்கு & வெடிபொருள் வாகன விவரங்கள் (Shipping & Delivery):
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="கிடங்கு இருப்பிடம் (Depot Location)"
                    value={cartDepotLocation}
                    onChange={(e) => setCartDepotLocation(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="வெடிபொருள் வாகன எண் (Licensed Vehicle #)"
                    value={cartVehicleNum}
                    onChange={(e) => setCartVehicleNum(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="ஓட்டுநர் பெயர் (Driver Name)"
                    value={cartDriverName}
                    onChange={(e) => setCartDriverName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="ஓட்டுநர் அலைபேசி (Driver Phone)"
                    value={cartDriverPhone}
                    onChange={(e) => setCartDriverPhone(e.target.value)}
                  />
                </Grid>
              </Grid>

              {/* Live Cost Summary */}
              <Paper sx={{ p: 2, borderRadius: "10px", backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>பொருட்களின் மதிப்பு:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    ₹
                    {Object.entries(cartProductQuantities).reduce((acc, [id, qty]) => {
                      const p = products.find((x) => x.id === id);
                      return acc + (p ? p.salePrice * qty : 0);
                    }, 0).toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>ஜிஎஸ்டி (18% GST):</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    ₹
                    {(
                      Object.entries(cartProductQuantities).reduce((acc, [id, qty]) => {
                        const p = products.find((x) => x.id === id);
                        return acc + (p ? p.salePrice * qty : 0);
                      }, 0) * 0.18
                    ).toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>பெசோ பாதுகாப்பு & பேக்கிங் கட்டணம்:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>₹49.00</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>மொத்தத் தொகை:</Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "primary.main" }}>
                    ₹
                    {(
                      Object.entries(cartProductQuantities).reduce((acc, [id, qty]) => {
                        const p = products.find((x) => x.id === id);
                        return acc + (p ? p.salePrice * qty : 0);
                      }, 0) * 1.18 + 49
                    ).toFixed(2)}
                  </Typography>
                </Box>
              </Paper>
            </>
          )}
        </DialogContent>
        {!assistedOrderSuccess && (
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setIsCustomerCartModalOpen(false)}>ரத்து செய்</Button>
            <Button variant="contained" color="success" onClick={handleCreateCustomerOrder} sx={{ fontWeight: 800 }}>
              ஆர்டரை உறுதிசெய் & OTP PIN உருவாக்கு
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </Box>
  );
};
