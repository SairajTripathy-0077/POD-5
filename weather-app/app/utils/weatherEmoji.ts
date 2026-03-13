// Map weather condition to emoji
export function getWeatherEmoji(main: string): string {
    const map: Record<string, string> = {
        Clear: "☀️",
        Clouds: "☁️",
        Rain: "🌧️",
        Drizzle: "🌦️",
        Thunderstorm: "⛈️",
        Snow: "❄️",
        Mist: "🌫️",
        Haze: "🌫️",
        Fog: "🌫️",
        Smoke: "💨",
        Dust: "💨",
        Sand: "💨",
        Tornado: "🌪️",
    };
    return map[main] || "🌡️";
}
