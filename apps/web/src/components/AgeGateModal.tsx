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
          backgroundColor: "#0d1322",
          color: "#f8fafc",
          borderRadius: "16px",
          border: "1px solid rgba(245, 158, 11, 0.3)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)"
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
            color: "#f59e0b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Scale size={24} />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
            Statutory Age Verification
          </Typography>
          <Typography variant="caption" sx={{ color: "#94a3b8" }}>
            The Explosives Act (1884) & Explosives Rules (2008)
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 2 }}>
        <Alert
          severity="warning"
          icon={<ShieldAlert size={20} />}
          sx={{
            backgroundColor: "rgba(245, 158, 11, 0.1)",
            color: "#fbbf24",
            border: "1px solid rgba(245, 158, 11, 0.25)",
            mb: 2.5,
            "& .MuiAlert-icon": { color: "#f59e0b" }
          }}
        >
          Selling, delivering, or supplying fireworks to persons under <strong>18 years of age</strong> is strictly prohibited by law in India.
        </Alert>

        <Typography variant="body2" sx={{ color: "#cbd5e1", mb: 2, lineHeight: 1.6 }}>
          All purchases on this platform are fulfilled through licensed <strong>Click-and-Collect Depots</strong> or verified PESO transport. You will be required to present valid Government Photo Identification (Aadhaar, Voter ID, Driving License) upon physical collection.
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, my: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={agreed18}
                onChange={(e) => setAgreed18(e.target.checked)}
                sx={{ color: "#f59e0b", "&.Mui-checked": { color: "#f59e0b" } }}
              />
            }
            label={
              <Typography variant="body2" sx={{ color: "#f8fafc", fontWeight: 500 }}>
                I hereby declare that I am <strong>18 years of age or older</strong>.
              </Typography>
            }
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={agreedDepot}
                onChange={(e) => setAgreedDepot(e.target.checked)}
                sx={{ color: "#f59e0b", "&.Mui-checked": { color: "#f59e0b" } }}
              />
            }
            label={
              <Typography variant="body2" sx={{ color: "#f8fafc", fontWeight: 500 }}>
                I understand that collection requires physical verification at an authorized PESO godown.
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
          Confirm Age & Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};
