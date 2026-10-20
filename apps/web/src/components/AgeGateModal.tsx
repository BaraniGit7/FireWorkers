import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  Alert
} from "@mui/material";
import { ShieldAlert, CheckCircle, Scale } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.js";

interface AgeGateModalProps {
  open: boolean;
  onClose: () => void;
  onVerified: () => void;
}

export const AgeGateModal: React.FC<AgeGateModalProps> = ({
  open,
  onClose,
  onVerified
}) => {
  const { t } = useLanguage();
  const [agreed18, setAgreed18] = useState(true);
  const [agreedDepot, setAgreedDepot] = useState(true);

  const handleConfirm = () => {
    if (agreed18 && agreedDepot) {
      onVerified();
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "background.paper",
          color: "text.primary",
          borderRadius: "16px",
          border: (theme) => `1px solid ${theme.palette.divider}`,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
        }
      }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1.5, pb: 1, pt: 3, px: 3 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "10px",
            backgroundColor: "rgba(245, 158, 11, 0.15)",
            color: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Scale size={24} />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: "'Outfit', 'Noto Sans Tamil', sans-serif" }}>
            {t("ageGateTitle")}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {t("ageGateAct")}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 2 }}>
        <Alert
          severity="warning"
          icon={<ShieldAlert size={20} />}
          sx={{
            backgroundColor: "rgba(245, 158, 11, 0.1)",
            color: "primary.main",
            border: (theme) => `1px solid ${theme.palette.divider}`,
            mb: 2.5,
            "& .MuiAlert-icon": { color: "primary.main" }
          }}
        >
          {t("ageGateAlert")}
        </Alert>

        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2, lineHeight: 1.6 }}>
          {t("ageGateText")}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, my: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={agreed18}
                onChange={(e) => setAgreed18(e.target.checked)}
                sx={{ color: "primary.main", "&.Mui-checked": { color: "primary.main" } }}
              />
            }
            label={
              <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 500 }}>
                {t("ageGateCheck1")}
              </Typography>
            }
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={agreedDepot}
                onChange={(e) => setAgreedDepot(e.target.checked)}
                sx={{ color: "primary.main", "&.Mui-checked": { color: "primary.main" } }}
              />
            }
            label={
              <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 500 }}>
                {t("ageGateCheck2")}
              </Typography>
            }
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={!agreed18 || !agreedDepot}
          onClick={handleConfirm}
          startIcon={<CheckCircle size={18} />}
          sx={{ py: 1.2, fontWeight: 700 }}
        >
          {t("ageGateConfirmBtn")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
