import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import {
  Container, AppBar, Snackbar,
  Button,
  Typography,
  Dialog, DialogTitle, DialogContent,DialogActions,
  TextField, Toolbar, Grid, Card, CardContent
} from '@mui/material';
import { useSpring, animated } from 'react-spring';
import { FaBell, FaCloudSun, FaChartLine, FaStar } from 'react-icons/fa';
import SetAlertPage from './SetAlertPage'; 
import AnalyticsPage from './AnalyticsPage'; 

const style = {
  appBar: {
    backgroundColor: '#6499E9',
    boxShadow: 'none',
    position: 'relative',
    alignItems: 'center',
    borderRadius: '20px 20px 20px 20px',
  },
  header: {
    flexGrow: 1,
    fontWeight: 'bold',
    fontSize: '2rem',
    letterSpacing: '2px',
    fontFamily: 'cursive',
    color: '#fff',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
  },
  sectionButton: {
    fontSize: '1rem',
    marginLeft: '2rem',
    color: '#fff',
  },
  mainContent: {
    paddingTop: '3rem',
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  descriptionText: {
    fontSize: '1.2rem',
    marginBottom: '1.5rem',
  },
  getStartedButton: {
    fontSize: '1.2rem',
  },
  landingImage: {
    width: '100%',
    height: 'auto',
    maxHeight: '400px',
    objectFit: 'cover',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  aboutOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    padding: '1rem',
    borderRadius: '8px',
  },
  gridContainer: {
    // marginTop: '1rem',
    padding: '50px',
    color: '#6499E9',
    marginBottom: '1rem',
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    maxWidth: '300px',
    margin: '1rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  cardContent: {
    textAlign: 'center',
  },
  featureIcon: {
    fontSize: '3rem',
    color: '#6499E9',
  },
  featureTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginTop: '1rem',
  },
  featureDescription: {
    fontSize: '1rem',
    marginTop: '0.5rem',
  },
  footer: {
    backgroundColor: '#6499E9',
    color: '#fff',
    padding: '2rem 0',
    textAlign: 'center',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
  },

  feedbackInputContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', 
    gap: '1rem', 
  },
  feedbackContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '2rem',
    position: 'relative',
    zIndex: 1,
  },

  feedbackTextField: {
    width: '100%',

    marginBottom: '1rem',
  },

  feedbackButton: {
    width: '100%',
  },

  imageContainer: {
    position: 'relative',
  },

  image: {
    width: '100%',
    height: 'auto',
    maxHeight: '400px',
    objectFit: 'cover',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },

  feedbackForm: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '80%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  
};

const HomePage = () => {
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [openAnalyticsModal, setOpenAnalyticsModal] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    feedback: '',
  });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);

  const springProps = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 },
  });

  const handleSetAlertClick = () => {
    setOpenAlertModal(true);
  };

  const handleCloseAlertModal = () => {
    setOpenAlertModal(false);
  };

  const handleCheckWeatherClick = () => {
    setOpenAnalyticsModal(true);
  };

  const handleCloseAnalyticsModal = () => {
    setOpenAnalyticsModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData({
      ...feedbackData,
      [name]: value,
    });
  };

  const handleSubmitFeedback = () => {
    setShowSnackbar(true);

    setFeedbackData({
      name: '',
      email: '',
      phoneNumber: '',
      feedback: '',
    });

   
    setShowFeedbackDialog(true);
  };

  const handleCloseSnackbar = () => {
    
    setShowSnackbar(false);
  };

  const handleCloseFeedbackDialog = () => {
    
    setShowFeedbackDialog(false);
  };

  return (
    <div>
      <AppBar position="static" style={style.appBar}>
        <Toolbar>
          <animated.div style={springProps}>
            <Typography variant="h6" style={style.header}>
              Temp Ai!
            </Typography>
          </animated.div>
          <Button color="inherit" style={style.sectionButton}>
            About
          </Button>
          <Button color="inherit" style={style.sectionButton} onClick={handleSetAlertClick}>
            Set Alert
          </Button>
          <ScrollLink to="analytics" smooth={true} duration={500}>
            <Button color="inherit" style={style.sectionButton}>
              Check Weather
            </Button>
          </ScrollLink>
          <Button color="inherit" style={style.sectionButton}>
            Notification
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" style={style.mainContent}>
        <animated.div style={springProps}>
          <div style={{ position: 'relative', marginBottom: '2rem' }}>
            <img
              src="https://images.unsplash.com/photo-1579003593419-98f949b9398f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
              alt="Landing Page Image"
              style={style.landingImage}
            />
            <div style={style.aboutOverlay}>
              <Typography variant="h4">Temperature Alert Agent</Typography>
              <Typography variant="body1">
                Temperature Alert Agent is a cutting-edge weather monitoring and alerting application. Our mission is to provide you with real-time temperature data for your chosen location and ensure that you are always informed about temperature changes.
              </Typography>
            </div>
          </div>
          <Typography variant="h3" style={style.welcomeText}>
            Welcome to Temperature Alert Agent
          </Typography>
          <Typography variant="body1" style={style.descriptionText}>
            Stay informed about temperature changes in your area. Set personalized alerts, stay informed, and be prepared for any weather conditions. With Temperature Alert Agent, you're in control of your weather experience.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={style.getStartedButton}
          >
            Get Started
          </Button>
        </animated.div>
      </Container>

      <Container style={style.container} id="analytics">
        <AnalyticsPage />
      </Container>

      { /* Display AnalyticsPage component when openAnalyticsModal is true */}
      {openAnalyticsModal && <AnalyticsPage onClose={handleCloseAnalyticsModal} />}

      {/* Key Features Section */}
      {/* ... (rest of the key features section) ... */}

      {/* Feedback Form */}
      <div style={style.feedbackContainer}>
        <div style={style.imageContainer}>
          <img
            src="https://images.unsplash.com/photo-1579003593419-98f949b9398f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
            alt=""
            style={style.image}
          />
        </div>
        <div style={style.feedbackForm}>
          <Typography variant="h6" style={style.feedbackTitle}>
            Provide Feedback
          </Typography>
          <div style={style.feedbackInputContainer}>
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              value={feedbackData.name}
              onChange={handleInputChange}
              style={style.feedbackTextField}
            />
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={feedbackData.email}
              onChange={handleInputChange}
              style={style.feedbackTextField}
            />
          </div>
          <div style={style.feedbackInputContainer}>
            <TextField
              label="Phone Number"
              variant="outlined"
              name="phoneNumber"
              value={feedbackData.phoneNumber}
              onChange={handleInputChange}
              style={style.feedbackTextField}
            />
            <TextField
              label="Feedback"
              variant="outlined"
              multiline
              rows={2} 
              name="feedback"
              value={feedbackData.feedback}
              onChange={handleInputChange}
              style={style.feedbackTextField}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitFeedback}
            style={style.feedbackButton}
          >
            Submit Feedback
          </Button>
        </div>
      </div>

      
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Thank you for your valuable feedback!"
      />

      
      <Dialog
        open={showFeedbackDialog}
        onClose={handleCloseFeedbackDialog}
        aria-labelledby="feedback-dialog-title"
      >
        <DialogTitle id="feedback-dialog-title">Feedback Submitted</DialogTitle>
        <DialogContent>
          <Typography>
            Thank you for your valuable feedback!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFeedbackDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Footer */}
      <footer style={style.footer}>
        <Typography variant="body2">
          © {new Date().getFullYear()} Temperature Alert Agent
        </Typography>
      </footer>

      
      {openAlertModal && <SetAlertPage onClose={handleCloseAlertModal} />}
    </div>
  );
};

export default HomePage;
