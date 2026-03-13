export default async function fetchWeather(city: string) {
    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY; 

    if (!API_KEY) {
        throw new Error("Missing API Key in environment variables.");
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
            { next: { revalidate: 900 } } 
        );
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || "City not found or API error");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
}

export async function fetchWeatherByCoords(lat: number, lon: number) {
    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) throw new Error("Location weather failed");
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}