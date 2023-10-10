import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  IconButton,
  Snackbar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  dialogTitle: {
    textAlign: 'center',
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  inputField: {
    width: '100%',
    marginBottom: '16px',
  },
  saveButton: {
    marginTop: '16px',
    alignSelf: 'center',
  },
  errorMessage: {
    color: 'red',
    marginTop: '16px',
    alignSelf: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: '8px',
    right: '8px',
  },
};

function SetAlertPage({ open, onClose }) {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [desiredMinTemp, setDesiredMinTemp] = useState('');
  const [desiredMaxTemp, setDesiredMaxTemp] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('alertSettings'));
    if (savedData) {
      setSelectedLocation(savedData.selectedLocation || '');
      setDesiredMinTemp(savedData.desiredMinTemp || '');
      setDesiredMaxTemp(savedData.desiredMaxTemp || '');
    }
  }, []);

  const startMonitoring = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5001/start_monitoring', {
        selected_location: selectedLocation,
        desired_min_temp: parseFloat(desiredMinTemp),
        desired_max_temp: parseFloat(desiredMaxTemp),
      });

      
      const minTemp = parseFloat(desiredMinTemp);
      const maxTemp = parseFloat(desiredMaxTemp);

      const message = `Alert settings are saved. Your temperature limit is set to Min: ${minTemp}°C and Max: ${maxTemp}°C, and you'll be notified if it exceeds the limit with a message on your phone.`;

      setStatusMessage(message);
      setSnackbarOpen(true);

      
      const alertSettings = {
        selectedLocation,
        desiredMinTemp,
        desiredMaxTemp,
      };
      localStorage.setItem('alertSettings', JSON.stringify(alertSettings));
    } catch (error) {
      console.error("An error occurred while sending the request", error);
      setStatusMessage("An error occurred. Please try again.");
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Dialog open={true} maxWidth="md" fullWidth>
      <DialogTitle style={style.dialogTitle}>Set Alert</DialogTitle>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="close"
        onClick={onClose}
        style={style.closeButton}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent style={style.dialogContent}>
        <div>
          <Typography variant="body1">
            Set your preferred temperature range and location to receive alerts when the temperature goes beyond the specified limits.
          </Typography>
        </div>
        <TextField
          label="Location"
          variant="outlined"
          style={style.inputField}
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        />
        <TextField
          label="Desired Min Temperature (°C)"
          type="number"
          variant="outlined"
          style={style.inputField}
          value={desiredMinTemp}
          onChange={(e) => setDesiredMinTemp(e.target.value)}
        />
        <TextField
          label="Desired Max Temperature (°C)"
          type="number"
          variant="outlined"
          style={style.inputField}
          value={desiredMaxTemp}
          onChange={(e) => setDesiredMaxTemp(e.target.value)}
        />
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={startMonitoring}
            style={style.saveButton}
          >
            Start Monitoring
          </Button>
          {statusMessage && <Typography style={style.errorMessage}>{statusMessage}</Typography>}
        </DialogActions>
      </DialogContent>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={statusMessage}
      />
    </Dialog>
  );
}

export default SetAlertPage;
