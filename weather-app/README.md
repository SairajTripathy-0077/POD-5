# Modern Weather Application 🌤️

A beautifully designed, premium weather application built with Next.js, React, and TailwindCSS. It features a modern glassmorphic interface, global weather tracking, and an interactive world map background.

## Features ✨
- **📍 Current Location Weather**: Automatically fetches and displays the weather for your current geographical location with an interactive map pinpoint.
- **🔍 Search Any City**: Look up the weather for any city worldwide instantly.
- **🌍 Global Weather Dashboard**: View real-time weather data for 10 of the most famous cities around the world in a beautiful grid layout.
- **🌓 Dark/Light Mode**: Fully supports theme toggling for a comfortable viewing experience day or night.
- **🎨 Premium UI**: Features glassmorphic panels, dynamic map backgrounds, and animated weather emojis.

## Tech Stack 🛠️
- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Icons/Emoji**: Native Emojis via Utility Functions
- **Maps**: `dotted-map` with `motion/react` for animations
- **Weather API**: [OpenWeatherMap](https://openweathermap.org/)

## Running Locally 💻

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file in the root directory and add your OpenWeather API key:
   ```env
   NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deploying to Netlify 🚀

This application is fully optimized and ready to be deployed on **Netlify**.

1. **Push your code to GitHub/GitLab**.
2. **Log into Netlify** and click "Add new site" -> "Import an existing project".
3. **Connect your repository**.
4. **Build Settings**: Netlify will auto-detect Next.js and apply the correct settings. 
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
5. **Environment Variables**: Click on "Advanced build settings" and add your `NEXT_PUBLIC_WEATHER_API_KEY`.
6. Click **Deploy Site**.

Netlify's Next.js plugin will automatically configure serverless functions for any dynamic routes, ensuring lightning-fast performance worldwide!
