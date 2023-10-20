import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../App.css";


function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  //current city data.
  const [weatherData, setWeatherData] = useState({
    cityLat: "6.9319",
    cityLong: "79.8478",
    cityName: "",
    cityDescription: "",
    cityTemp: "",
  });
  //for daily city data
  const [dailyWeatherData, setDailyWeatherData] = useState([]);
  //init lat long values set to colombo
  const [latitude, setLatitude] = useState("6.9319");
  const [longitude, setLongitude] = useState("79.8478");

  const getWeatherDataByLatLong = async () => {
    let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely,hourly,&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Something went wrong");
    }
 
    const data = await res.json();

    setWeatherData({
      cityName: data.timezone,
      cityDescription: data.current.weather[0].description,
      cityTemp: data.current.temp,
    });

    const dailyWeather = [];
    for (const key in data.daily) {
      dailyWeather.push({
        id: key,
        temp: data.daily[key].temp.day,
        description: data.daily[key].weather[0].description,
      });
    }
    setDailyWeatherData(dailyWeather);
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    getWeatherDataByLatLong();
  }, [user, loading]);

  const dailyReport = dailyWeatherData.map((day, index) => {
    return (
      <div key={index} className="dailyweather-item">
        <h3>Day {index + 1}</h3>
        <h4>{day.temp}</h4>
        <h4>{day.description}</h4>
      </div>
    );
  });

  return (
    <>
      <div
        className="navbar"
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="">
          <h2>WeatherApp</h2>
        </div>
        <button onClick={logout}>Logout</button>
      </div>
      <div className="search">
        <input
          value={latitude}
          onChange={(event) => setLatitude(event.target.value)}
          placeholder="Enter Latitude"
          type="text"
          style={{ marginRight: "4 rem" }}
        />
        <input
          value={longitude}
          onChange={(event) => setLongitude(event.target.value)}
          placeholder="Enter Longitude"
          type="text"
        />
        <div className="">
          <button onClick={getWeatherDataByLatLong}>Search</button>
        </div>
      </div>
      <div className="container">
        <div className="header">
          <div className="location">
            <p>Showing results for: {weatherData.cityName}</p>
          </div>
          <div className="temp">
            {weatherData.cityTemp ? (
              <h1>{weatherData.cityTemp.toFixed()}°C</h1>
            ) : null}
          </div>
          <div className="description">
            {weatherData.cityDescription ? (
              <h1>{weatherData.cityDescription}</h1>
            ) : null}
            <div className="" style={{ paddingBottom: "3rem" }}>
              <div style={{textAlign:'center'}}>
                <h2>Daily Report for next week</h2>
              </div>
              <div className="dailyweather-container">
                {dailyReport}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
