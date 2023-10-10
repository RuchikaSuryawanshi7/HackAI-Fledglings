# Temperature Monitoring Server

### Overview

This Python server application utilizes Flask, a lightweight WSGI web application framework, to monitor the temperature of a specified location and notify the user via SMS if the temperature goes above or below the desired range. The application uses the OpenWeatherMap API to retrieve the current temperature and the Sinch API to send SMS notifications. It also employs an agent-based approach using the `uagents` library to periodically check the temperature and send notifications.

### Prerequisites

- Python 3.8+
- A Sinch API account for sending SMS
- An OpenWeatherMap API key for fetching weather data

### Dependencies

The following Python packages are required to run the server:

- Flask
- requests
- uagents
- flask_cors
- asyncio
- threading

### Installation

1. **Clone the Repository**

   ```
   git clone github.com/ RUCHIKA
   cd [your-repo-directory] RUCHIKA
   ```
2. **Set Up a Virtual Environment (Optional)**
   ```
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install Dependencies**
   ```
   pip install Flask requests uagents flask_cors asyncio threading
   ```

4. **Configure API Keys**

    Replace the placeholder API keys and tokens in the code with your actual keys.

    OpenWeatherMap API key: Replace the appid parameter in the URL in the start_monitoring function.
    ```
    url = f'https://api.openweathermap.org/data/2.5/weather?q {selected_location}&appid=ENTER_API_KEY_HERE'
    ```

    Sinch API: Replace servicePlanId and apiToken in the notify_userSMS function.
    ```
    servicePlanId = "enter string here"
    apiToken = "enter string here"
    ```

5. **Configure Phone Numbers**

    Replace the sinchNumber and toNumber in the notify_userSMS function with the actual numbers.
    ```
    sinchNumber = "enter number here without country code"
    toNumber = "enter number here without country code"
    ```

### Usage

1. **Start the Server**
    Run the server using the following command:
    ```
    python server.py
    ```
    The server will start on port 5001

2. **API Endpoints**
    Endpoint: /start_monitoring
    Method: POST
    Payload Example:
    ```json
    {
        "selected_location": "Pune",
        "desired_min_temp": 20,
        "desired_max_temp": 30
    }
    ```
    This endpoint starts the temperature monitoring for the specified location and desired temperature range.

**Notes**
- Ensure that the server is running when you want to monitor the temperature.
- The temperature is checked every 15 minutes as per the agent's configuration.
- SMS notifications will be sent when the temperature is below the desired_min_temp or above the desired_max_temp.

**Contributing**
- If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.