from flask import Flask, request, jsonify
from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low
import requests
import threading
import asyncio
from flask_cors import CORS
from flask_cors import cross_origin


app = Flask(__name__)
CORS(app)

CORS(app, origins=["http://localhost:3000"])

class Message(Model):
    message: str

temperature_agent = Agent(
    name="temperature_agent",
    port=8000,
    seed="temperature agent's secret phrase",
    endpoint=["http://127.0.0.1:8000/submit"],
)

fund_agent_if_low(temperature_agent.wallet.address())


async def notify_userSMS(message):
    servicePlanId = "your string here"
    apiToken = "your string here"
    sinchNumber = "your sinch number without country code"
    toNumber = "your number without country code"
    url = "https://us.sms.api.sinch.com/xms/v1/" + servicePlanId + "/batches"

    payload = {
    "from": sinchNumber,
    "to": [
        toNumber
    ],
    "body": message
    }
    headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + apiToken
    }
    response = requests.post(url, json=payload, headers=headers)
    data = response.json()
    print(data)

def run_agent():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    temperature_agent.run()

@app.route('/start_monitoring', methods=['POST'])
@cross_origin(origins=["http://localhost:3000"]) 
def start_monitoring():
    # Extract data from the request
    data = request.get_json()
    selected_location = data.get('selected_location')
    desired_min_temp = data.get('desired_min_temp')
    desired_max_temp = data.get('desired_max_temp')
    
    # Your logic to set the monitoring parameters here
    url = f'https://api.openweathermap.org/data/2.5/weather?q={selected_location}&appid=ENTER_API_KEY_HERE'

    try:
        # Send a GET request to the API
        response = requests.get(url)

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Parse the JSON response
            data = response.json()

            # Extract and print relevant weather information
            temperature_kelvin = data['main']['temp']
            temperature_celsius = temperature_kelvin - 273.15  # Convert to Celsius

        else:
            print(f"Request failed with status code {response.status_code}")

    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")

    current_temperature = temperature_celsius
    def monitor_temperature():
        if current_temperature < desired_min_temp:
            return (f"Brr! It's chilly in {selected_location} today. The temperature "
                    f"is below the desired {desired_min_temp}°C, so bundle up and stay warm! - React Fledglings")
        elif current_temperature > desired_max_temp:
            return (f"It's a scorcher in {selected_location} today! The temperature is "
                    f"above the desired {desired_max_temp}°C, so stay hydrated and seek shade whenever possible. - React Fledglings")
        else:
            return (f"The weather in {selected_location} is just right today! The temperature "
                    f"is within the desired range of {desired_min_temp}-{desired_max_temp}°C, so you can enjoy all your favorite outdoor activities without getting too hot or too cold. - React Fledglings")
    
    @temperature_agent.on_interval(period=900.0)  # Check every 15 minutes
    async def temperature_monitor(ctx: Context):
        temperature_status = monitor_temperature()
        ctx.logger.info(temperature_status)
        if "below" in temperature_status or "above" in temperature_status:
            await notify_userSMS(temperature_status)
    
    
    # Start the agent in a new thread
    agent_thread = threading.Thread(target=run_agent)
    agent_thread.start()
    
    return jsonify({'status': 'success', 'message': 'Monitoring started'}), 200

if __name__ == '__main__':
    app.run(port=5001)
