import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
  Box,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { Room, Refresh, CenterFocusStrong } from '@mui/icons-material';
import { WiThermometer, WiHumidity, WiBarometer, WiFog, WiStrongWind, WiCloudy, WiSunrise, WiSunset, WiRaindrop } from 'react-icons/wi';

const apiKey = 'API_KEY_HERE';

const styles = {
  container: {
    maxWidth: '90%',
    padding: '1rem',
  },
  paper: {
    padding: '1rem',
    marginTop: '1rem',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    marginTop: '2rem',
    marginBottom: '1rem',
    fontSize: '2rem',
    fontWeight: 'bold',
    alignItems: 'center',
    // color: '#6499E9',
  },
  locationBox: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '1rem',
  },
  textField: {
    flex: 1,
    marginRight: '1rem',
  },
  button: {
    marginRight: '1rem',
  },
  loading: {
    marginLeft: '1rem',
  },
  locationInfo: {
    marginTop: '1rem',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: '0.5rem',
    fontSize: '2.5rem',
    color: '#6499E9',
  },
  tableHeader: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    // color: '#6499E9',
  },
  weatherIconContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '1rem',
  },
  weatherIcon: {
    width: '50px',
    height: '50px',
    marginRight: '1rem',
  },
  weatherDescription: {
    fontSize: '1.2rem',
    color: '#333',
  },
  recommendation: {
    marginTop: '1rem',
    fontSize: '1.2rem',
    color: '#333',
  },
};

const AnalyticsPage = () => {
  const [city, setCity] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [suggestion, setSuggestion] = useState('');
  
  const getWeatherSuggestion = (data) => {

    const temperature = data.main.temp;
    const description = data.weather[0].description.toLowerCase();

    if (temperature > 30) {
      return 'It\'s a hot day! You might want to stay indoors or go swimming.';
    } else if (temperature < 10) {
      return 'It\'s quite cold out there. Dress warmly and enjoy some hot cocoa.';
    } else if (description.includes('rain')) {
      return 'It\'s raining! Don\'t forget your umbrella.';
    } else {
      return 'Enjoy the weather!';
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lon: longitude });
        fetchLocationName(latitude, longitude);
        setLoading(false);
      });
    }
  }, []);

  const fetchLocationName = async (lat, lon) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedLocation({
          name: data.name,
          lat: data.coord.lat,
          lon: data.coord.lon,
        });
      }
    } catch (error) {
      console.error('Error fetching location name:', error);
    }
  };

  const handleFetchLocation = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.lat}&lon=${userLocation.lon}&appid=${apiKey}`);
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
        setSelectedLocation({
          name: data.name,
          lat: data.coord.lat,
          lon: data.coord.lon,
        });
        const newSuggestion = getWeatherSuggestion(data);
        setSuggestion(newSuggestion);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCityInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmitCity = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
        setSelectedLocation({
          name: data.name,
          lat: data.coord.lat,
          lon: data.coord.lon,
        });
        const newSuggestion = getWeatherSuggestion(data);
        setSuggestion(newSuggestion);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const weatherDataTable = [
    { name: 'Temperature', value: weatherData ? `${weatherData.main.temp} °C` : '', icon: <WiThermometer /> },
    { name: 'Humidity', value: weatherData ? `${weatherData.main.humidity} %` : '', icon: <WiHumidity /> },
    { name: 'Pressure', value: weatherData ? `${weatherData.main.pressure} hPa` : '', icon: <WiBarometer /> },
    { name: 'Visibility', value: weatherData ? `${weatherData.visibility} meters` : '', icon: <WiFog /> },
    { name: 'Wind Speed', value: weatherData ? `${weatherData.wind.speed} m/s` : '', icon: <WiStrongWind /> },
    { name: 'Cloudiness', value: weatherData ? `${weatherData.clouds.all}%` : '', icon: <WiCloudy /> },
    { name: 'Sunrise', value: weatherData ? new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString() : '', icon: <WiSunrise /> },
    { name: 'Sunset', value: weatherData ? new Date(weatherData.sys.sunset * 1000).toLocaleTimeString() : '', icon: <WiSunset /> },
    { name: 'Feels Like', value: weatherData ? `${weatherData.main.feels_like} °C` : '', icon: <WiThermometer /> },
    { name: 'Dew Point', value: weatherData ? `${weatherData.main.dew_point} °C` : '', icon: <WiThermometer /> },
    { name: 'Rain', value: weatherData ? (weatherData.weather[0].description.includes('rain') ? 'Yes' : 'No'): '', icon: <WiRaindrop /> },
  ];

  return (
    <Container style={styles.container}>
      <Typography variant="h4" style={{ ...styles.header, textAlign: 'center' }}>
  Weather Analytics
</Typography>

      <Paper elevation={3} style={styles.paper}>
        <Typography variant="h6">Location:</Typography>
        <Box style={styles.locationBox}>
          <TextField
            label="Enter City"
            variant="outlined"
            fullWidth
            value={city}
            onChange={handleCityInputChange}
            style={styles.textField}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitCity}
            style={styles.button}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFetchLocation}
            style={styles.button}
          >
            Fetch My Location
          </Button>
          {loading && (
            <CircularProgress style={styles.loading} size={30} thickness={5} />
          )}
          <IconButton color="primary" onClick={handleFetchLocation} style={{ marginLeft: '1rem' }}>
            <Refresh />
          </IconButton>
        </Box>
        {weatherData && (
          <Typography variant="body1" style={styles.locationInfo}>
            <Room fontSize="inherit" style={styles.icon} /> Location: {selectedLocation.name}, Latitude {weatherData.coord.lat}, Longitude {weatherData.coord.lon}
          </Typography>
        )}
        {weatherData && (
          <div style={styles.weatherIconContainer}>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt="Weather Icon"
              style={styles.weatherIcon}
            />
            <Typography variant="body1" style={styles.weatherDescription}>
              {weatherData.weather[0].description}
            </Typography>
          </div>
        )}
        {suggestion && (
          <Typography variant="body1" style={styles.recommendation}>
            Recommendation: {suggestion}
          </Typography>
        )}
        <TableContainer style={{ marginTop: '1rem' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={styles.tableHeader}>Weather Parameter</TableCell>
                <TableCell style={styles.tableHeader}>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {weatherDataTable.map((item, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={styles.icon}>{item.icon}</span>
                      {item.name}
                    </span>
                  </TableCell>
                  <TableCell>{item.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default AnalyticsPage;
