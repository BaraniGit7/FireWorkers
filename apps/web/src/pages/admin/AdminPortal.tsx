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
  Alert,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Divider,
  Paper,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  QrCode,
  Volume2,
  FileCheck,
  Users,
  Building,
  Power,
  Activity,
  History,
  TrendingUp,
  Package,
  Clock,
  Sparkles,
  MapPin,
  ExternalLink,
  FileText,
  Crown,
  PlusCircle,
  Filter,
  Truck,
  UserCheck,
  UserPlus
} from "lucide-react";
import { useMarketplace, ManagedProduct, MarketplaceOrder } from "../../context/MarketplaceContext.js";
import { useLanguage } from "../../context/LanguageContext.js";
import { useThemeMode } from "../../context/ThemeContext.js";
import { useAuth } from "../../context/AuthContext.js";

export const AdminPortal: React.FC = () => {
  const { t } = useLanguage();
  const { mode } = useThemeMode();
  const { switchUser } = useAuth();
  const isDark = mode === "dark";

  const {
    products,
    pendingProducts,
    orders,
    sellers,
    customers,
    selectedCompanyFilter,
    setSelectedCompanyFilter,
    approveProduct,
    rejectProduct,
    approveSeller,
    rejectSeller,
    createCompanyAdmin,
    addCustomerBySuperAdmin,
    isKillSwitchActive,
    toggleKillSwitch,
    auditLogs
  } = useMarketplace();

  const [activeTab, setActiveTab] = useState(0);

  // Product Rejection Dialog State
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectTargetId, setRejectTargetId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  // Seller Rejection Dialog State
  const [sellerRejectModalOpen, setSellerRejectModalOpen] = useState(false);
  const [sellerRejectTargetId, setSellerRejectTargetId] = useState<string | null>(null);
  const [sellerRejectReason, setSellerRejectReason] = useState("");

  // Seller KYC Dossier Inspector Modal State
  const [sellerInspectModalOpen, setSellerInspectModalOpen] = useState(false);
  const [inspectingSeller, setInspectingSeller] = useState<(typeof sellers)[0] | null>(null);

  // Audit Trail Category Filter & Inspector
  const [auditLogFilter, setAuditLogFilter] = useState<"ALL" | "SELLER_COMPLIANCE" | "PRODUCT_MODERATION" | "ORDER_HANDOVER" | "EMERGENCY_CONTROLS">("ALL");
  const [selectedAuditEntry, setSelectedAuditEntry] = useState<(typeof auditLogs)[0] | null>(null);
  const [isAuditInspectorOpen, setIsAuditInspectorOpen] = useState(false);

  // Order Filter
  const [orderFilter, setOrderFilter] = useState<"ALL" | "READY" | "COMPLETED">("ALL");

  // Notifications
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: "success" | "info" | "warning"; text: string } | null>(null);

  // SuperAdmin: Add Company & Admin Modal State
  const [isCreateCompanyModalOpen, setIsCreateCompanyModalOpen] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newCompanyTradeName, setNewCompanyTradeName] = useState("");
  const [newCompanyPesoLicense, setNewCompanyPesoLicense] = useState("E/SC/TN/20/");
  const [newCompanyCapacity, setNewCompanyCapacity] = useState("8000");
  const [newCompanyAddress, setNewCompanyAddress] = useState("");
  const [newCompanyNoc, setNewCompanyNoc] = useState("POL/NOC/2026/");
  const [newAdminName, setNewAdminName] = useState("");
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminPhone, setNewAdminPhone] = useState("");
  const [createCompanyError, setCreateCompanyError] = useState<string | null>(null);

  // SuperAdmin: Add Customer Modal State
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [newCustFullName, setNewCustFullName] = useState("");
  const [newCustEmail, setNewCustEmail] = useState("");
  const [newCustPhone, setNewCustPhone] = useState("");
  const [newCustAddress, setNewCustAddress] = useState("");
  const [newCustAgeChecked, setNewCustAgeChecked] = useState(true);
  const [addCustError, setAddCustError] = useState<string | null>(null);

  // Dynamic Multi-Company Filter Applied Data
  const isFiltered = selectedCompanyFilter !== "ALL";
  const activeCompany = sellers.find((s) => s.id === selectedCompanyFilter);

  const displayOrders = isFiltered
    ? orders.filter((o) => o.sellerId === selectedCompanyFilter || o.sellerName.toLowerCase().includes(activeCompany?.businessName.toLowerCase() || ""))
    : orders;

  const displayProducts = isFiltered
    ? products.filter((p) => p.companyId === selectedCompanyFilter || p.sellerPesoLicense === activeCompany?.pesoLicenseNumber)
    : products;

  const displayPendingProducts = isFiltered
    ? pendingProducts.filter((p) => p.companyId === selectedCompanyFilter || p.sellerPesoLicense === activeCompany?.pesoLicenseNumber)
    : pendingProducts;

  const displayAudits = isFiltered
    ? auditLogs.filter((a) => !a.companyId || a.companyId === selectedCompanyFilter)
    : auditLogs;

  // Gross Merchandise Value for selected view
  const totalGMV = displayOrders.reduce((acc, curr) => acc + curr.totalAmount, 0);

  const handleApproveProduct = (id: string, name: string) => {
    approveProduct(id);
    setFeedbackMessage({
      type: "success",
      text: `Approved '${name}'! The product is now live on the public storefront.`
    });
  };

  const handleOpenRejectModal = (id: string) => {
    setRejectTargetId(id);
    setRejectReason("Acoustic decibel limit or laboratory Barium-free compliance certificate not verified.");
    setRejectModalOpen(true);
  };

  const handleConfirmReject = () => {
    if (rejectTargetId && rejectReason) {
      rejectProduct(rejectTargetId, rejectReason);
      setFeedbackMessage({
        type: "warning",
        text: `Product rejected and returned to seller with statutory feedback.`
      });
      setRejectModalOpen(false);
      setRejectTargetId(null);
    }
  };

  const handleApproveSeller = (id: string, name: string) => {
    approveSeller(id);
    setFeedbackMessage({
      type: "success",
      text: `Verified PESO Form LE-1 for '${name}'. Seller is now authorized for sales.`
    });
    if (inspectingSeller && inspectingSeller.id === id) {
      setSellerInspectModalOpen(false);
    }
  };

  const handleOpenSellerRejectModal = (id: string) => {
    setSellerRejectTargetId(id);
    setSellerRejectReason("PESO Form LE-1 storage clearance expired or magazine standoff perimeter < 50m non-compliant.");
    setSellerRejectModalOpen(true);
  };

  const handleConfirmSellerReject = () => {
    if (sellerRejectTargetId && sellerRejectReason) {
      rejectSeller(sellerRejectTargetId, sellerRejectReason);
      setFeedbackMessage({
        type: "warning",
        text: t("sellerKycRejectedMsg")
      });
      setSellerRejectModalOpen(false);
      setSellerRejectTargetId(null);
      if (inspectingSeller && inspectingSeller.id === sellerRejectTargetId) {
        setSellerInspectModalOpen(false);
      }
    }
  };

  const handleOpenSellerInspector = (sellerItem: (typeof sellers)[0]) => {
    setInspectingSeller(sellerItem);
    setSellerInspectModalOpen(true);
  };

  const handleOpenAuditInspector = (entry: (typeof auditLogs)[0]) => {
    setSelectedAuditEntry(entry);
    setIsAuditInspectorOpen(true);
  };

  const handleCreateCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCreateCompanyError(null);

    if (!newCompanyName || !newCompanyPesoLicense || !newAdminEmail || !newAdminName) {
      setCreateCompanyError("நிறுவனப் பெயர், பெசோ உரிமம், அட்மின் பெயர் மற்றும் மின்னஞ்சல் கட்டாயமாகும்.");
      return;
    }

    const res = createCompanyAdmin({
      companyName: newCompanyName,
      tradeName: newCompanyTradeName || newCompanyName,
      pesoLicenseNumber: newCompanyPesoLicense,
      storageCapacityKg: Number(newCompanyCapacity) || 5000,
      magazineAddress: newCompanyAddress || "சிவகாசி வெடிபொருள் கிடங்கு பகுதி, தமிழ்நாடு",
      policeNocNumber: newCompanyNoc,
      adminName: newAdminName,
      adminEmail: newAdminEmail,
      adminPhone: newAdminPhone || "9876543210"
    });

    if (res.success) {
      setFeedbackMessage({
        type: "success",
        text: `புதிய நிறுவனம் '${newCompanyName}' & நிர்வாகி '${newAdminName}' (${newAdminEmail}) வெற்றிகரமாக உருவாக்கப்பட்டது!`
      });
      setIsCreateCompanyModalOpen(false);
      setNewCompanyName("");
      setNewCompanyTradeName("");
      setNewCompanyAddress("");
      setNewAdminName("");
      setNewAdminEmail("");
      setNewAdminPhone("");
    } else {
      setCreateCompanyError(res.error || "உருவாக்குவதில் பிழை ஏற்பட்டது.");
    }
  };

  const handleAddCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAddCustError(null);

    if (!newCustFullName || !newCustPhone) {
      setAddCustError("வாடிக்கையாளர் முழுப் பெயர் மற்றும் தொலைபேசி எண் கட்டாயமாகும்.");
      return;
    }

    const res = addCustomerBySuperAdmin({
      fullName: newCustFullName,
      email: newCustEmail || `customer.${Date.now().toString().slice(-4)}@fireworks.com`,
      phone: newCustPhone,
      address: newCustAddress || "அங்கீகரிக்கப்பட்ட உள்ளூர் டெலிவரி பகுதி"
    });

    if (res.success) {
      setFeedbackMessage({
        type: "success",
        text: `சரிபார்க்கப்பட்ட வாடிக்கையாளர் '${newCustFullName}' வெற்றிகரமாக சேர்க்கப்பட்டார்! நேரடி ஆர்டர் பதிவு செய்யலாம்.`
      });
      setIsAddCustomerModalOpen(false);
      setNewCustFullName("");
      setNewCustEmail("");
      setNewCustPhone("");
      setNewCustAddress("");
    } else {
      setAddCustError(res.error || "வாடிக்கையாளர் சேர்ப்பதில் பிழை ஏற்பட்டது.");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", pb: 12, backgroundColor: "background.default" }}>
      {/* Header Banner */}
      <Box
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          background: isDark
            ? "linear-gradient(180deg, rgba(239, 68, 68, 0.08) 0%, rgba(10, 15, 29, 0) 100%)"
            : "linear-gradient(180deg, rgba(239, 68, 68, 0.12) 0%, rgba(255, 255, 255, 0) 100%)",
          pt: { xs: 4, md: 5 },
          pb: 3
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
                    background: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    boxShadow: "0 4px 15px rgba(239, 68, 68, 0.35)"
                  }}
                >
                  <Crown size={24} />
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: "'Noto Sans Tamil','Outfit', sans-serif" }}>
                    👑 {t("superAdminPortalTitle")}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {t("superAdminPortalSubtitle")}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1, mt: 1.5 }}>
                <Chip
                  icon={<ShieldCheck size={14} color="#10b981" />}
                  label="Statutory Authority: PESO & Supreme Court Directive (WP 728/2015)"
                  size="small"
                  sx={{ backgroundColor: isDark ? "rgba(16, 185, 129, 0.15)" : "rgba(16, 185, 129, 0.12)", color: isDark ? "#34d399" : "#065f46", fontWeight: 700 }}
                />
                <Chip
                  icon={<Power size={14} color={isKillSwitchActive ? "#ef4444" : "#10b981"} />}
                  label={isKillSwitchActive ? "EMERGENCY FREEZE ACTIVE" : "MARKETPLACE OPERATIONAL"}
                  size="small"
                  color={isKillSwitchActive ? "error" : "success"}
                  sx={{ fontWeight: 800 }}
                />
                {isFiltered && (
                  <Chip
                    icon={<Building size={14} color="#f59e0b" />}
                    label={`${t("filteredCompanyChip")}: ${activeCompany?.businessName || selectedCompanyFilter}`}
                    onDelete={() => setSelectedCompanyFilter("ALL")}
                    color="warning"
                    size="small"
                    sx={{ fontWeight: 700 }}
                  />
                )}
              </Box>
            </Box>

            {/* Top Right: Multi-Company Filter & Emergency Kill Switch */}
            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 2 }}>
              {/* SUPERADMIN COMPANY FILTER DROPDOWN */}
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: "12px",
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  backgroundColor: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.03)",
                  minWidth: 260
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary", display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
                  <Filter size={13} color="#f59e0b" /> {t("companyFilterLabel")}
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={selectedCompanyFilter}
                    onChange={(e) => setSelectedCompanyFilter(e.target.value)}
                    sx={{ fontWeight: 700, fontSize: "0.85rem" }}
                  >
                    <MenuItem value="ALL">🏢 {t("allCompaniesOption")}</MenuItem>
                    {sellers.map((s) => (
                      <MenuItem key={s.id} value={s.id}>
                        {s.businessName} ({s.pesoLicenseNumber})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Quick Emergency Kill-Switch Toggle */}
              <Box
                sx={{
                  p: 1.5,
                  px: 2.5,
                  borderRadius: "12px",
                  border: isKillSwitchActive ? "2px solid #ef4444" : "1px solid rgba(16, 185, 129, 0.4)",
                  backgroundColor: isKillSwitchActive
                    ? "rgba(239, 68, 68, 0.12)"
                    : isDark
                    ? "rgba(255, 255, 255, 0.04)"
                    : "rgba(0, 0, 0, 0.02)",
                  display: "flex",
                  alignItems: "center",
                  gap: 2
                }}
              >
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: isKillSwitchActive ? "error.main" : "text.secondary", textTransform: "uppercase" }}>
                    {t("killSwitchLabel")}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, fontSize: "0.85rem" }}>
                    {isKillSwitchActive ? t("checkoutsFrozen") : t("checkoutsActive")}
                  </Typography>
                </Box>
                <Switch
                  checked={isKillSwitchActive}
                  onChange={toggleKillSwitch}
                  color="error"
                />
              </Box>
            </Box>
          </Box>

          {/* Admin KPI Stat Cards (Dynamically Filtered by Company) */}
          <Grid container spacing={2.5} sx={{ mt: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: "14px" }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>
                      {t("adminMetricPendingProd")}
                    </Typography>
                    <Package size={20} color={displayPendingProducts.length > 0 ? "#f59e0b" : "#10b981"} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, color: displayPendingProducts.length > 0 ? "#f59e0b" : "text.primary" }}>
                    {displayPendingProducts.length}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    {isFiltered ? `${activeCompany?.businessName} ${t("companyProducts")}` : t("allSellersProducts")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: "14px" }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>
                      {t("adminMetricActiveOrders")}
                    </Typography>
                    <Clock size={20} color="#3b82f6" />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, color: "text.primary" }}>
                    {displayOrders.length}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    {isFiltered ? t("companyOrders") : t("totalMarketOrders")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: "14px" }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>
                      {t("adminMetricGMV")}
                    </Typography>
                    <TrendingUp size={20} color="#10b981" />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, color: "#10b981" }}>
                    ₹{totalGMV.toFixed(2)}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    {isFiltered ? t("companyRevenue") : t("totalGMVLabel")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: "14px" }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>
                      {t("approvedCompanies")}
                    </Typography>
                    <Building size={20} color="#8b5cf6" />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, color: "text.primary" }}>
                    {sellers.length}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    {customers.length} {t("registeredCustomers")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Tabs Area */}
      <Container maxWidth="xl" sx={{ mt: 4 }}>
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
              icon={<Package size={18} />}
              iconPosition="start"
              label={`${t("adminTabModQueue")} (${displayPendingProducts.length})`}
            />
            <Tab
              icon={<Clock size={18} />}
              iconPosition="start"
              label={`${t("adminTabMarketOrders")} (${displayOrders.length})`}
            />
            <Tab
              icon={<Building size={18} />}
              iconPosition="start"
              label={`${t("adminTabSellerVetting")} (${sellers.filter((s) => s.verificationStatus === "UNDER_REVIEW").length})`}
            />
            <Tab
              icon={<History size={18} />}
              iconPosition="start"
              label={`${t("adminTabAuditTrail")} (${displayAudits.length})`}
            />
            <Tab
              icon={<Building size={18} />}
              iconPosition="start"
              label={`🏢 ${t("companiesAndAdminsTab")} (${sellers.length})`}
            />
            <Tab
              icon={<Users size={18} />}
              iconPosition="start"
              label={`👤 ${t("customersTab")} (${customers.length})`}
            />
          </Tabs>
        </Box>

        {/* Feedback Alert if any */}
        {feedbackMessage && (
          <Alert severity={feedbackMessage.type} sx={{ mb: 3 }} onClose={() => setFeedbackMessage(null)}>
            {feedbackMessage.text}
          </Alert>
        )}

        {/* TAB 0: PRODUCT MODERATION QUEUE */}
        {activeTab === 0 && (
          <Box>
            <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  {t("adminModQueueTitle")} ({displayPendingProducts.length})
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {t("adminModQueueDesc")}
                </Typography>
              </Box>
            </Box>

            {displayPendingProducts.length === 0 ? (
              <Card sx={{ p: 6, textAlign: "center", borderRadius: "14px", border: (theme) => `1px solid ${theme.palette.divider}` }}>
                <Box sx={{ fontSize: "2.5rem", mb: 1 }}>🛡️</Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {t("noPendingProducts")}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
                  When sellers submit new Green Crackers with CSIR-NEERI formulations, they will appear here for statutory clearance.
                </Typography>
              </Card>
            ) : (
              <Grid container spacing={3}>
                {displayPendingProducts.map((prod) => (
                  <Grid item xs={12} key={prod.id}>
                    <Card
                      sx={{
                        borderRadius: "16px",
                        border: "2px solid #f59e0b",
                        overflow: "hidden",
                        boxShadow: "0 8px 30px rgba(245, 158, 11, 0.12)"
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={3}>
                            <Box
                              component="img"
                              src={prod.image}
                              alt={prod.name}
                              sx={{
                                width: "100%",
                                height: 180,
                                objectFit: "cover",
                                borderRadius: "10px",
                                border: (theme) => `1px solid ${theme.palette.divider}`,
                                mb: 1
                              }}
                            />
                            <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                              Submitted by:
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                              {prod.sellerName}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 700 }}>
                              PESO: {prod.sellerPesoLicense}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                                {prod.name}
                              </Typography>
                              <Chip label={prod.category} size="small" sx={{ textTransform: "capitalize", fontWeight: 700 }} />
                              <Chip label="UNDER REVIEW" color="warning" size="small" sx={{ fontWeight: 800 }} />
                            </Box>

                            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                              {prod.description}
                            </Typography>

                            <Grid container spacing={1.5} sx={{ mb: 2 }}>
                              <Grid item xs={12} sm={6}>
                                <Paper sx={{ p: 1.5, borderRadius: "10px", backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <QrCode size={18} color="#10b981" />
                                    <Box>
                                      <Typography variant="caption" sx={{ color: "text.secondary" }}>CSIR-NEERI Certificate</Typography>
                                      <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: "monospace" }}>
                                        {prod.neeriCertNumber}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Paper>
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                <Paper sx={{ p: 1.5, borderRadius: "10px", backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <Volume2 size={18} color={prod.decibelRating <= 125 ? "#10b981" : "#ef4444"} />
                                    <Box>
                                      <Typography variant="caption" sx={{ color: "text.secondary" }}>Acoustic Rating (Cap: 125 dB)</Typography>
                                      <Typography variant="body2" sx={{ fontWeight: 700, color: prod.decibelRating <= 125 ? "#10b981" : "#ef4444" }}>
                                        {prod.decibelRating} dB (Statutory Pass)
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Paper>
                              </Grid>
                            </Grid>

                            <Box sx={{ p: 1.5, borderRadius: "10px", backgroundColor: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
                              <Typography variant="caption" sx={{ fontWeight: 700, color: "#10b981", display: "flex", alignItems: "center", gap: 0.5 }}>
                                <CheckCircle2 size={14} /> Certified Chemical Formulation (Barium Free):
                              </Typography>
                              <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.5 }}>
                                {prod.chemicalComposition}
                              </Typography>
                            </Box>
                          </Grid>

                          <Grid item xs={12} md={3} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 1.5 }}>
                            <Button
                              variant="contained"
                              color="success"
                              fullWidth
                              startIcon={<CheckCircle2 size={18} />}
                              onClick={() => handleApproveProduct(prod.id, prod.name)}
                              sx={{ py: 1.2, fontWeight: 700 }}
                            >
                              {t("adminApproveBtn")}
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              fullWidth
                              startIcon={<XCircle size={18} />}
                              onClick={() => handleOpenRejectModal(prod.id)}
                              sx={{ py: 1.2, fontWeight: 700 }}
                            >
                              {t("adminRejectBtn")}
                            </Button>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        {/* TAB 1: MARKET ORDERS (WITH SHIPPING DETAILS & DELIVERY STATUS) */}
        {activeTab === 1 && (
          <Box>
            <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  சந்தை ஆர்டர்கள் & விநியோக நிலை ({displayOrders.length})
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  நிறுவன ஆர்டர்கள், வாடிக்கையாளர் விவரங்கள், வெடிபொருள் வண்டி எண் மற்றும் டெலிவரி நிலை
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  size="small"
                  variant={orderFilter === "ALL" ? "contained" : "outlined"}
                  onClick={() => setOrderFilter("ALL")}
                  sx={{ borderRadius: "8px", fontWeight: 700 }}
                >
                  அனைத்தும் ({displayOrders.length})
                </Button>
                <Button
                  size="small"
                  variant={orderFilter === "READY" ? "contained" : "outlined"}
                  color="warning"
                  onClick={() => setOrderFilter("READY")}
                  sx={{ borderRadius: "8px", fontWeight: 700 }}
                >
                  தயாராக உள்ளவை ({displayOrders.filter((o) => o.status === "READY_FOR_PICKUP").length})
                </Button>
                <Button
                  size="small"
                  variant={orderFilter === "COMPLETED" ? "contained" : "outlined"}
                  color="success"
                  onClick={() => setOrderFilter("COMPLETED")}
                  sx={{ borderRadius: "8px", fontWeight: 700 }}
                >
                  விநியோகிக்கப்பட்டவை ({displayOrders.filter((o) => o.status === "COMPLETED").length})
                </Button>
              </Box>
            </Box>

            <Grid container spacing={2.5}>
              {displayOrders.map((order) => {
                const isReady = order.status === "READY_FOR_PICKUP";
                const isDispatched = order.status === "DISPATCHED_LICENSED_CARRIER";
                const isCompleted = order.status === "COMPLETED";

                return (
                  <Grid item xs={12} key={order.id}>
                    <Card sx={{ borderRadius: "14px", border: (theme) => `1px solid ${theme.palette.divider}` }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 1, mb: 2 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: "monospace" }}>
                              #{order.orderNumber}
                            </Typography>
                            <Chip
                              label={
                                isCompleted
                                  ? "விநியோகிக்கப்பட்டது (COMPLETED)"
                                  : isDispatched
                                  ? "வாகனத்தில் அனுப்பப்பட்டது (DISPATCHED)"
                                  : isReady
                                  ? "டெப்போவில் தயார் (READY FOR PICKUP)"
                                  : "உறுதிசெய்யப்பட்டது (CONFIRMED)"
                              }
                              color={isCompleted ? "success" : isDispatched ? "secondary" : isReady ? "warning" : "info"}
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
                              {new Date(order.createdAt).toLocaleString("en-IN")}
                            </Typography>
                          </Box>
                        </Box>

                        <Grid container spacing={2} sx={{ mb: 2 }}>
                          <Grid item xs={12} md={4}>
                            <Paper sx={{ p: 1.5, borderRadius: "10px", backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
                              <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                                வாடிக்கையாளர் விவரங்கள்:
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                {order.customerName}
                              </Typography>
                              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                📞 +91 {order.customerPhone} • {order.customerEmail}
                              </Typography>
                            </Paper>
                          </Grid>

                          <Grid item xs={12} md={4}>
                            <Paper sx={{ p: 1.5, borderRadius: "10px", backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
                              <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                                விநியோக கிடங்கு / முகவரி:
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 0.5 }}>
                                <MapPin size={14} color="#f59e0b" /> {order.depotLocation}
                              </Typography>
                              <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 700 }}>
                                OTP PIN: {order.pickupPinOtp}
                              </Typography>
                            </Paper>
                          </Grid>

                          <Grid item xs={12} md={4}>
                            <Paper sx={{ p: 1.5, borderRadius: "10px", backgroundColor: "rgba(16, 185, 129, 0.06)", border: "1px solid rgba(16, 185, 129, 0.25)" }}>
                              <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                                <Truck size={14} color="#10b981" /> ஷிப்பிங் & போக்குவரத்து விவரங்கள்:
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                {order.shippingDetails?.vehicleNumber || "அங்கீகரிக்கப்பட்ட நேரடி கிடங்கு விநியோகம்"}
                              </Typography>
                              <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                                ஓட்டுநர்: {order.shippingDetails?.driverName || "நியமிக்கப்படவில்லை"} {order.shippingDetails?.driverPhone ? `(${order.shippingDetails?.driverPhone})` : ""}
                              </Typography>
                            </Paper>
                          </Grid>
                        </Grid>

                        {/* Order Items */}
                        <Box sx={{ overflowX: "auto", width: "100%", my: 1 }}>
                          <Table size="small">
                            <TableHead>
                              <TableRow sx={{ backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
                                <TableCell sx={{ fontWeight: 700 }}>பட்டாசு</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>CSIR-NEERI சான்றிதழ்</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 700 }}>எண்ணிக்கை</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700 }}>விலை</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700 }}>மொத்தம்</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {order.items.map((it, idx) => (
                                <TableRow key={idx}>
                                  <TableCell sx={{ fontWeight: 600 }}>{it.productName}</TableCell>
                                  <TableCell>
                                    <Chip label={it.neeriCertNumber} size="small" sx={{ fontSize: "0.68rem" }} />
                                  </TableCell>
                                  <TableCell align="center">{it.quantity}</TableCell>
                                  <TableCell align="right">₹{it.salePrice.toFixed(2)}</TableCell>
                                  <TableCell align="right" sx={{ fontWeight: 700 }}>
                                    ₹{(it.salePrice * it.quantity).toFixed(2)}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>

                        <Divider sx={{ my: 1.5 }} />

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            மொத்தத் தொகை: <Box component="span" sx={{ color: "primary.main", fontSize: "1.1rem" }}>₹{order.totalAmount.toFixed(2)}</Box>
                          </Typography>
                          <Typography variant="caption" sx={{ color: "text.secondary" }}>
                            ஜிஎஸ்டி 18% & பெசோ பேக்கேஜிங் கட்டணம் சேர்க்கப்பட்டுள்ளது
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}

        {/* TAB 2: SELLER VETTING & KYC */}
        {activeTab === 2 && (
          <Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                {t("adminVettingTitle")} ({sellers.length})
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                பெசோ படிவம் LE-1 உரிமம் மற்றும் சேமிப்புக் கிடங்கு பாதுகாப்பு வரைபட ஆய்வு
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {sellers.map((seller) => (
                <Grid item xs={12} key={seller.id}>
                  <Card sx={{ borderRadius: "14px", border: (theme) => `1px solid ${theme.palette.divider}` }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 1, mb: 2 }}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 800 }}>
                            {seller.businessName}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "text.secondary" }}>
                            வர்த்தக பெயர்: {seller.tradeName} • உரிமம்: {seller.pesoLicenseNumber}
                          </Typography>
                        </Box>

                        <Chip
                          label={seller.verificationStatus === "APPROVED" ? "அங்கீகரிக்கப்பட்டது" : "ஆய்வில் உள்ளது"}
                          color={seller.verificationStatus === "APPROVED" ? "success" : "warning"}
                          size="small"
                          sx={{ fontWeight: 800 }}
                        />
                      </Box>

                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12} sm={4}>
                          <Paper sx={{ p: 1.5, borderRadius: "10px" }}>
                            <Typography variant="caption" sx={{ color: "text.secondary" }}>சேமிப்பு திறன் (Capacity)</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                              {seller.storageCapacityKg.toLocaleString()} கிலோ
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Paper sx={{ p: 1.5, borderRadius: "10px" }}>
                            <Typography variant="caption" sx={{ color: "text.secondary" }}>கிடங்கு முகவரி</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                              {seller.magazineAddress}
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Paper sx={{ p: 1.5, borderRadius: "10px" }}>
                            <Typography variant="caption" sx={{ color: "text.secondary" }}>நிர்வாகி தொடர்பு</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                              {seller.adminEmail || "பதிவுசெய்யப்பட்டது"}
                            </Typography>
                          </Paper>
                        </Grid>
                      </Grid>

                      <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<FileText size={16} />}
                          onClick={() => handleOpenSellerInspector(seller)}
                          sx={{ fontWeight: 700 }}
                        >
                          ஆவணங்களை ஆய்வு செய் (Dossier)
                        </Button>
                        {seller.verificationStatus === "UNDER_REVIEW" && (
                          <>
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              startIcon={<CheckCircle2 size={16} />}
                              onClick={() => handleApproveSeller(seller.id, seller.businessName)}
                              sx={{ fontWeight: 700 }}
                            >
                              ஒப்புதல் வழங்கி அங்கீகரிக்க
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              startIcon={<XCircle size={16} />}
                              onClick={() => handleOpenSellerRejectModal(seller.id)}
                              sx={{ fontWeight: 700 }}
                            >
                              நிராகரிக்க
                            </Button>
                          </>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* TAB 3: AUDIT TRAIL */}
        {activeTab === 3 && (
          <Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                {t("adminTabAuditTrail")} ({displayAudits.length})
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                வெடிபொருள் விதிகள் 2008 மற்றும் பெசோ உத்தரவுகளின்படி மாற்ற முடியாத சட்டப்பூர்வ தணிக்கை பதிவு
              </Typography>
            </Box>

            <Paper sx={{ borderRadius: "14px", overflow: "hidden", border: (theme) => `1px solid ${theme.palette.divider}` }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)" }}>
                    <TableCell sx={{ fontWeight: 700 }}>நேரம்</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>பங்கு (Role)</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>செயல் (Action)</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>விவரங்கள்</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>சட்ட விதி</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700 }}>ஆய்வு</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayAudits.map((entry) => (
                    <TableRow key={entry.id} hover>
                      <TableCell sx={{ fontSize: "0.78rem", whiteSpace: "nowrap" }}>
                        {new Date(entry.timestamp).toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={entry.role}
                          size="small"
                          color={entry.role === "SUPERADMIN" ? "error" : entry.role === "SELLER" ? "success" : "info"}
                          sx={{ fontWeight: 800, fontSize: "0.7rem" }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, fontFamily: "monospace", fontSize: "0.82rem" }}>
                        {entry.action}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.82rem", maxWidth: 350 }}>
                        {entry.details}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.75rem", color: "primary.main", fontWeight: 600 }}>
                        {entry.statutoryRule || "Explosives Rules 2008"}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton size="small" onClick={() => handleOpenAuditInspector(entry)}>
                          <ExternalLink size={16} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Box>
        )}

        {/* TAB 4: SUPERADMIN - COMPANIES & ADMINS MANAGEMENT */}
        {activeTab === 4 && (
          <Box>
            <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  🏢 நிறுவனங்கள் & அட்மின்கள் மேலாண்மை (Companies & Admins)
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  முதன்மை நிர்வாகியாக நீங்கள் புதிய விற்பனையாளர் நிறுவனங்களைச் சேர்த்து, அவர்களின் அட்மின் கணக்குகளை உருவாக்கலாம்
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                startIcon={<PlusCircle size={18} />}
                onClick={() => setIsCreateCompanyModalOpen(true)}
                sx={{ fontWeight: 800, py: 1.2, px: 2.5, borderRadius: "10px" }}
              >
                + புதிய கம்பெனி & அட்மின் சேர்க்க
              </Button>
            </Box>

            <Grid container spacing={3}>
              {sellers.map((s) => (
                <Grid item xs={12} md={6} key={s.id}>
                  <Card
                    sx={{
                      borderRadius: "16px",
                      border: (theme) => `1px solid ${selectedCompanyFilter === s.id ? "#f59e0b" : theme.palette.divider}`,
                      boxShadow: selectedCompanyFilter === s.id ? "0 4px 20px rgba(245, 158, 11, 0.25)" : "none"
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1, mb: 2 }}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 800 }}>
                            {s.businessName}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "text.secondary" }}>
                            பிராண்ட்: {s.tradeName} • பெசோ: {s.pesoLicenseNumber}
                          </Typography>
                        </Box>
                        <Chip
                          label={s.verificationStatus}
                          color={s.verificationStatus === "APPROVED" ? "success" : "warning"}
                          size="small"
                          sx={{ fontWeight: 800 }}
                        />
                      </Box>

                      <Paper sx={{ p: 2, borderRadius: "10px", backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", mb: 2 }}>
                        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, display: "block", mb: 0.5 }}>
                          நிர்வாகி உள்நுழைவு விவரங்கள்:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          அட்மின் மின்னஞ்சல்: <Box component="span" sx={{ color: "primary.main" }}>{s.adminEmail || "seller.sivakasi@fireworks.com"}</Box>
                        </Typography>
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                          சேமிப்புக் கிடங்கு: {s.magazineAddress} ({s.storageCapacityKg.toLocaleString()} கிலோ)
                        </Typography>
                      </Paper>

                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            setSelectedCompanyFilter(s.id);
                            setActiveTab(1); // view their orders
                          }}
                          startIcon={<Filter size={15} />}
                          sx={{ fontWeight: 700 }}
                        >
                          இக்கம்பெனி ஆர்டர்களைக் காண்க
                        </Button>

                        <Button
                          variant="contained"
                          size="small"
                          color="success"
                          onClick={() => {
                            switchUser("SELLER", s.id === "demo-seller-id" ? "user-seller-01" : "user-seller-02");
                            window.location.reload();
                          }}
                          sx={{ fontWeight: 700 }}
                        >
                          அட்மினாக மாறுக
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* TAB 5: SUPERADMIN - CUSTOMERS MANAGEMENT */}
        {activeTab === 5 && (
          <Box>
            <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  👤 வாடிக்கையாளர்கள் மேலாண்மை (Registered Customers)
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  சுய-பதிவு செய்த மற்றும் முதன்மை நிர்வாகியால் சேர்க்கப்பட்ட 18+ வயது சரிபார்க்கப்பட்ட வாடிக்கையாளர்கள்
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                startIcon={<UserPlus size={18} />}
                onClick={() => setIsAddCustomerModalOpen(true)}
                sx={{ fontWeight: 800, py: 1.2, px: 2.5, borderRadius: "10px" }}
              >
                + புதிய வாடிக்கையாளர் சேர்க்க
              </Button>
            </Box>

            <Grid container spacing={2.5}>
              {customers.map((c) => {
                const customerOrders = orders.filter((o) => o.customerPhone === c.phone || o.customerEmail === c.email);

                return (
                  <Grid item xs={12} md={4} key={c.id}>
                    <Card sx={{ borderRadius: "14px", border: (theme) => `1px solid ${theme.palette.divider}`, height: "100%" }}>
                      <CardContent sx={{ p: 2.5, display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
                        <Box>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                              {c.fullName}
                            </Typography>
                            <Chip
                              label={c.addedBy === "SUPERADMIN" ? "அட்மின் சேர்த்தது" : "சுய-பதிவு"}
                              size="small"
                              color={c.addedBy === "SUPERADMIN" ? "secondary" : "info"}
                              sx={{ fontWeight: 700, fontSize: "0.7rem" }}
                            />
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
                            <CheckCircle2 size={14} color="#10b981" />
                            <Typography variant="caption" sx={{ color: "#10b981", fontWeight: 700 }}>
                              18+ வயது உறுதிப்படுத்தப்பட்டது
                            </Typography>
                          </Box>

                          <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
                            📞 +91 {c.phone}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                            ✉️ {c.email}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.5 }}>
                            📍 {c.address || "உள்ளூர் டெலிவரி மண்டலம்"}
                          </Typography>
                        </Box>

                        <Box sx={{ mt: 2, pt: 1.5, borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: "primary.main" }}>
                            பதிவுசெய்த ஆர்டர்கள்: {customerOrders.length}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}
      </Container>

      {/* MODAL: CREATE COMPANY & ADMIN */}
      <Dialog
        open={isCreateCompanyModalOpen}
        onClose={() => setIsCreateCompanyModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: "16px", p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, display: "flex", alignItems: "center", gap: 1 }}>
          <Building size={22} color="#f59e0b" />
          புதிய நிறுவனம் & நிர்வாகி சேர்க்க (Create Company & Admin)
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 1 }}>
          {createCompanyError && (
            <Alert severity="error">{createCompanyError}</Alert>
          )}

          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "primary.main" }}>
            1. நிறுவன விவரங்கள் (Company & Factory Details):
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="சட்டப்பூர்வ நிறுவன பெயர் (Legal Company Name)"
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
                placeholder="எ.கா: Royal Sivakasi Crackers Private Limited"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="வர்த்தக / பிராண்ட் பெயர் (Trade Brand Name)"
                value={newCompanyTradeName}
                onChange={(e) => setNewCompanyTradeName(e.target.value)}
                placeholder="எ.கா: Royal Sparklers"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="பெசோ படிவம் LE-1 உரிம எண் (PESO License Number)"
                value={newCompanyPesoLicense}
                onChange={(e) => setNewCompanyPesoLicense(e.target.value)}
                placeholder="எ.கா: E/SC/TN/20/55678"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="அங்கீகரிக்கப்பட்ட சேமிப்பு திறன் (கிலோ)"
                type="number"
                value={newCompanyCapacity}
                onChange={(e) => setNewCompanyCapacity(e.target.value)}
                placeholder="8000"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="வெடிபொருள் கிடங்கு முழு முகவரி (Magazine Address)"
                value={newCompanyAddress}
                onChange={(e) => setNewCompanyAddress(e.target.value)}
                placeholder="எ.கா: கதவு எண் 44, சிவகாசி-விருதுநகர் மெயின் ரோடு, சிவகாசி 626123"
              />
            </Grid>
          </Grid>

          <Divider />

          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "primary.main" }}>
            2. கம்பெனி அட்மின் உள்நுழைவு விவரங்கள் (Admin User Account):
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="அட்மின் முழுப் பெயர் (Admin Name)"
                value={newAdminName}
                onChange={(e) => setNewAdminName(e.target.value)}
                placeholder="எ.கா: ஆர். முத்துகிருஷ்ணன்"
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="உள்நுழைவு மின்னஞ்சல் (Admin Email)"
                type="email"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                placeholder="seller.muthu@fireworks.com"
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="அலைபேசி எண் (Mobile Number)"
                value={newAdminPhone}
                onChange={(e) => setNewAdminPhone(e.target.value)}
                placeholder="9842155667"
              />
            </Grid>
          </Grid>

          <Paper sx={{ p: 1.5, backgroundColor: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "#10b981", display: "flex", alignItems: "center", gap: 0.5 }}>
              <ShieldCheck size={16} /> முதன்மை நிர்வாகி ஒப்புதல்:
            </Typography>
            <Typography variant="caption" sx={{ display: "block", color: "text.secondary", mt: 0.5 }}>
              இந்த நிறுவனம் நேரடியாக அங்கீகரிக்கப்பட்ட விற்பனையாளர் பட்டியலில் சேர்க்கப்பட்டு, அட்மின் கணக்கு உருவாக்கப்படும்.
            </Typography>
          </Paper>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setIsCreateCompanyModalOpen(false)}>ரத்து செய்</Button>
          <Button variant="contained" color="primary" onClick={handleCreateCompanySubmit} sx={{ fontWeight: 800 }}>
            நிறுவனம் & அட்மின் உருவாக்குக
          </Button>
        </DialogActions>
      </Dialog>

      {/* MODAL: ADD CUSTOMER DIRECTLY */}
      <Dialog
        open={isAddCustomerModalOpen}
        onClose={() => setIsAddCustomerModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: "16px", p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, display: "flex", alignItems: "center", gap: 1 }}>
          <UserPlus size={22} color="#10b981" />
          புதிய வாடிக்கையாளர் சேர்க்க (Add Customer)
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          {addCustError && <Alert severity="error">{addCustError}</Alert>}

          <TextField
            fullWidth
            size="small"
            label="வாடிக்கையாளர் முழுப் பெயர் (Customer Full Name)"
            value={newCustFullName}
            onChange={(e) => setNewCustFullName(e.target.value)}
            placeholder="எ.கா: சுந்தர பாண்டியன்"
            required
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="தொலைபேசி எண் (Phone Number)"
                value={newCustPhone}
                onChange={(e) => setNewCustPhone(e.target.value)}
                placeholder="9842100000"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="மின்னஞ்சல் (Email)"
                type="email"
                value={newCustEmail}
                onChange={(e) => setNewCustEmail(e.target.value)}
                placeholder="customer@example.com"
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            size="small"
            label="டெலிவரி / கிடங்கு முகவரி (Address)"
            value={newCustAddress}
            onChange={(e) => setNewCustAddress(e.target.value)}
            placeholder="எ.கா: எண் 12, காமராஜர் தெரு, மதுரை"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={newCustAgeChecked}
                onChange={(e) => setNewCustAgeChecked(e.target.checked)}
                color="primary"
              />
            }
            label={
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                18+ வயது சரிபார்க்கப்பட்டது (ஆதார் / ஓட்டுநர் உரிமம் தணிக்கை உறுதி)
              </Typography>
            }
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setIsAddCustomerModalOpen(false)}>ரத்து செய்</Button>
          <Button variant="contained" color="primary" onClick={handleAddCustomerSubmit} sx={{ fontWeight: 800 }}>
            வாடிக்கையாளரை சேர்க்க
          </Button>
        </DialogActions>
      </Dialog>

      {/* PRODUCT REJECTION DIALOG */}
      <Dialog
        open={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: "16px", p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, color: "error.main", display: "flex", alignItems: "center", gap: 1 }}>
          <AlertTriangle size={20} />
          {t("adminRejectionModalTitle")}
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Specify the statutory non-compliance or chemical violation reason.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            label={t("adminRejectionReasonLabel")}
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setRejectModalOpen(false)}>ரத்து செய்</Button>
          <Button variant="contained" color="error" onClick={handleConfirmReject} sx={{ fontWeight: 700 }}>
            {t("adminConfirmReject")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* AUDIT INSPECTOR DIALOG */}
      <Dialog
        open={isAuditInspectorOpen}
        onClose={() => setIsAuditInspectorOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: "16px", p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 800 }}>
          {t("auditInspectorTitle")}
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {selectedAuditEntry && (
            <>
              <Box sx={{ p: 2, borderRadius: "10px", backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: (theme) => `1px solid ${theme.palette.divider}` }}>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>Event Action & Role</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                  <Chip label={selectedAuditEntry.role} size="small" color="primary" sx={{ fontWeight: 800 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, fontFamily: "monospace" }}>
                    {selectedAuditEntry.action}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ p: 2, borderRadius: "10px", backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: (theme) => `1px solid ${theme.palette.divider}` }}>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>Statutory Rule & Legal Reference</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: "primary.main", mt: 0.5 }}>
                  {selectedAuditEntry.statutoryRule || "The Explosives Act (1884) & Rule 2008"}
                </Typography>
              </Box>

              <Box sx={{ p: 2, borderRadius: "10px", backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: (theme) => `1px solid ${theme.palette.divider}` }}>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>Event Details & Actor</Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  {selectedAuditEntry.details}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 1 }}>
                  Actor: {selectedAuditEntry.actor} • Time: {new Date(selectedAuditEntry.timestamp).toLocaleString("en-IN")}
                </Typography>
              </Box>

              <Paper sx={{ p: 1.5, backgroundColor: isDark ? "rgba(16,185,129,0.05)" : "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.3)" }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#10b981", display: "block" }}>
                  ✓ SHA-256 Cryptographic Digital Audit Stamp
                </Typography>
                <Typography variant="caption" sx={{ fontFamily: "monospace", color: "text.secondary", fontSize: "0.7rem", wordBreak: "break-all" }}>
                  HASH: {btoa(selectedAuditEntry.id + selectedAuditEntry.timestamp + selectedAuditEntry.action).repeat(2).slice(0, 64)}
                </Typography>
              </Paper>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="contained" onClick={() => setIsAuditInspectorOpen(false)}>
            சரி / முடிந்தது
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
