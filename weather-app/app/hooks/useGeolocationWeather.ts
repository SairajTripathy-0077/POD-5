import { useState, useEffect } from 'react';
import { fetchWeatherByCoords } from '../fetchWeather';

export function useGeolocationWeather() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [permissionChecked, setPermissionChecked] = useState(false);
  const [hasAutoLocation, setHasAutoLocation] = useState(false);

  // On mount, check if geolocation permission is already granted
  useEffect(() => {
    if (!navigator.geolocation) {
      setPermissionChecked(true);
      return;
    }

    navigator.permissions?.query({ name: "geolocation" })
      .then((result) => {
        if (result.state === "granted") {
          setLoading(true);
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              setUserLocation({ lat: latitude, lng: longitude });
              setHasAutoLocation(true);
              try {
                const data = await fetchWeatherByCoords(latitude, longitude);
                setWeather(data);
              } catch (err) {
                console.error("Error fetching location weather:", err);
              } finally {
                setLoading(false);
                setPermissionChecked(true);
              }
            },
            () => {
              setLoading(false);
              setPermissionChecked(true);
            }
          );
        } else {
          setPermissionChecked(true);
        }
      })
      .catch(() => {
        setPermissionChecked(true);
      });
  }, []);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    setUserLocation(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setHasAutoLocation(true);
        try {
          const data = await fetchWeatherByCoords(latitude, longitude);
          setWeather(data);
        } catch (err) {
          console.error("Error fetching location weather:", err);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setLoading(false);
        console.error("Geolocation error:", error.message);
      }
    );
  };

  const showButton = permissionChecked && !hasAutoLocation;

  return {
    weather,
    loading,
    userLocation,
    showButton,
    handleGetLocation
  };
}
