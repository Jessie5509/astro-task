/* eslint-disable no-undef */
import { useState, useEffect } from "react";

export const WeatherAPI = () => {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocalización no soportada en este navegador.");
      return;
    }

    const onSuccess = (position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    };

    const onError = (err) => {
      setError(`Error de geolocalización: ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 60_000,
    });
  }, []);

  useEffect(() => {
    if (lat == null || long == null) return;

    const controller = new AbortController();
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const base = (import.meta.env.VITE_APP_API_URL || "").replace(
          /\/$/,
          ""
        );
        const key = import.meta.env.VITE_APP_API_KEY;

        const url = `${base}/weather?lat=${encodeURIComponent(
          lat
        )}&lon=${encodeURIComponent(
          long
        )}&units=metric&appid=${encodeURIComponent(key)}`;

        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    return () => controller.abort();
  }, [lat, long]);

  return (
    <main>
      <article className="weather-container text-white rounded-4xl m-4">
        {loading && <div>Loading weather...</div>}
        {error && <div style={{ color: "salmon" }}>Error: {error}</div>}

        {data && (
          <article className="w-full px-5 py-3">
            <h3 className="text-lg">
              {data.name} — {data.sys?.country}
            </h3>
            <article className="flex justify-around items-center">
              <p className="text-3xl">{data.main?.temp}°C</p>
              <article className="flex items-center gap-4">
                {data.weather?.[0]?.icon && (
                  <img
                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                    alt={data.weather[0]?.description ?? "weather icon"}
                    width={64}
                    height={64}
                  />
                )}
              </article>
            </article>
            <section className="flex justify-around mt-2">
              <p>
                Sunrise:{" "}
                {new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-IN")}
              </p>
              <p>
                Sunset:{" "}
                {new Date(data.sys.sunset * 1000).toLocaleTimeString("en-IN")}
              </p>
            </section>

            <section className="flex justify-around">
              <p className="capitalize">{data.weather[0]?.main}</p>
              <p>Humidity: {data.main.humidity}%</p>
            </section>
          </article>
        )}
      </article>
    </main>
  );
};

export default WeatherAPI;
