const express = require('express');
const axios = require('axios');
const schedule = require('node-schedule');

const credentials = {
    apiKey: 'd70b4a1bd8a2b35a46fbe2f0c641588bf930235ac6bf021e95730963cae8c111',
    username: 'codemunity',
};

const AfricasTalking = require('africastalking')(credentials);

// Function to fetch phone numbers and send SMS for each city
const fetchPhoneNumbers = async () => {
    try {
        // Make HTTP GET request to fetch phone numbers
        const response = await axios.get('http://localhost:5000/api/v2/user/activenumbers');
        const data = response.data;
        data.forEach(async (item) => {
            const cityName = item.location;
            const phoneNumber = item.phone;
            await SendMessage(cityName, phoneNumber);
        });

        // Schedule the job to run again after 2 minutes
        schedule.scheduleJob('*/2 * * * *', fetchPhoneNumbers);

        //fetch the cron after 24 hours
        // Schedule the initial job to fetch phone numbers and start the process
        // schedule.scheduleJob('0 0 * * *', fetchPhoneNumbers);


    } catch (error) {
        console.error('Error fetching phone numbers:', error);
        throw new Error('Failed to fetch phone numbers');
    }
}

// Function to fetch weather forecast for a city
const fetchWeatherForecast = async (cityName) => {
    const apiKey = '8f44217aed64ca33f252a1a9013e35cd';
    const forecastEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    try {
        const response = await axios.get(forecastEndpoint);
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error fetching weather forecast:', error);
        return null;
    }
};

// Function to send SMS with weather details
const SendMessage = async (cityName, phoneNumber) => {
    try {
        const weatherData = await fetchWeatherForecast(cityName);
        if (weatherData) {
            const temperature = weatherData.main.temp;
            const windSpeed = weatherData.wind.speed;
            const weatherDescription = weatherData.weather[0].description;
            const sms = AfricasTalking.SMS;
            const message = `Weather in ${cityName}: Temperature ${temperature}°C, Wind Speed ${windSpeed} m/s, ${weatherDescription}`;
            const options = {
                to: phoneNumber,
                message: message
            };
            const response = await sms.send(options);
            console.log(response);
        } else {
            console.error('Error: No weather data available for', cityName);
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Schedule the initial job to fetch phone numbers and start the process
// schedule.scheduleJob('*/2 * * * *', fetchPhoneNumbers);

module.exports = {
    SendMessage,
    fetchPhoneNumbers,
    fetchWeatherForecast
}
