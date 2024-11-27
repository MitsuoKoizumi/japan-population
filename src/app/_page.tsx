"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const SimpleLineChart = dynamic(() => import("./Chart/SimpleLineChart"), {
  ssr: false,
});

export function LineCharts() {
  return <SimpleLineChart />;
}

export default function Page() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");

  async function getWeather() {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}&lang=ja`
    );
    const data = await res.json();
    console.log(process.env.OPEN_WEATHER_API_KEY);
    setCity(data.name);
    setWeather(data.weather[0].description);
    console.log(data);
  }

  return (
    <div className="text-center mt-8">
      <input
        type="text"
        placeholder="Enter City Name"
        className="border p-2 mr-3 mb-5"
        onChange={(e) => setCity(e.target.value)}
        value={city}
      />
      <button className="bg-gray-200 p-2 mb-5" onClick={getWeather}>
        Get Weather info
      </button>
      <h1>City: {city}</h1>
      <p>Weather: {weather}</p>
    </div>
  );
}
