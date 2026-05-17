# ☁️ CloudJar

A beautiful, responsive weather app built with React and Vite. Search any city and get live weather data with a **dynamic animated background** that changes based on the actual weather condition — stormy skies for thunderstorms, warm gradients for sunny days, icy tones for snow, and more.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&labelColor=20232a) ![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white&labelColor=1a1a2e) ![MUI](https://img.shields.io/badge/MUI-v9-007FFF?logo=mui&logoColor=white&labelColor=0a1929)

---

## ✨ Features

- 🌦 **Live weather data** via [OpenWeatherMap](https://openweathermap.org/api)
- 🎨 **Dynamic animated backgrounds** — gradient + floating particles that match the current weather condition (rain, snow, thunderstorm, haze, clouds, sunny, cold)
- 🪟 **Glassmorphism UI** — frosted glass card, pill search bar, and blurred overlays
- 🌙 **Dark / light mode toggle** — respects your OS preference on first load
- ⚠️ **Smart error messages** — distinct messages for city not found, invalid API key, rate limiting, and network errors
- 🌡 **Accurate condition detection** — uses `weather[0].main` from the API (Rain, Snow, Thunderstorm, Clouds, Haze) instead of humidity/temperature guesses
- ♿ **Accessible** — `aria-label` on icons and images, `role="alert"` on errors, keyboard-navigable

---

## 🖼 UI Preview

| Sunny / Hot | Rainy | Thunderstorm |
|---|---|---|
| Orange-gold gradient + ☀️ particles | Deep navy gradient + 💧 particles | Dark purple gradient + ⚡ particles |

| Snowy | Haze / Mist | Cloudy |
|---|---|---|
| Icy blue-white gradient + ❄️ particles | Grey gradient + 🌫️ particles | Steel blue gradient + ☁️ particles |

---

## 🚀 Getting started

### 1. Clone the repo

```bash
git clone https://github.com/rahulgoyal83789/CloudJar.git
cd CloudJar
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and add your API key:

```env
VITE_API_URL=https://api.openweathermap.org/data/2.5/weather
VITE_API_KEY=your_openweathermap_api_key_here
```

> **Get a free API key** at [openweathermap.org/api](https://openweathermap.org/api). The free tier supports up to 60 calls/minute.

> **Security note:** `VITE_*` variables are bundled into the browser JS — your key is visible in DevTools. For production, add a serverless proxy (Netlify Functions, Vercel Edge) so only the server talks to OpenWeatherMap.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## 📁 Project structure

```
CloudJar/
├── src/
│   ├── App.jsx          # MUI ThemeProvider + dark/light mode state
│   ├── WeatherApp.jsx   # Dynamic gradient background, floating particles, header
│   ├── SearchBox.jsx    # Glassmorphism pill search bar with loading & error states
│   ├── InfoBox.jsx      # Glassmorphism weather card with big temp display
│   ├── SearchBox.css    # (minimal — styling via MUI sx props)
│   └── InfoBox.css      # (minimal — styling via MUI sx props)
├── index.html
├── .env.example         # Template for required environment variables
├── package.json
└── vite.config.js
```

---

## 🎨 Background themes by condition

| Weather condition | Gradient | Particles |
|---|---|---|
| Thunderstorm | Dark indigo → midnight blue | ⚡ |
| Rain / Drizzle | Deep navy → slate blue | 💧 |
| Snow | Icy blue → soft white | ❄️ |
| Haze / Mist / Fog | Charcoal → steel grey | 🌫️ |
| Clouds | Steel blue → light grey | ☁️ |
| Clear + cold (≤10°C) | Teal → blush pink | 🌨️ |
| Clear + warm (>10°C) | Orange → golden yellow | ☀️ |

Dark mode versions of each gradient are also included and activate automatically.

---

## 🛠 Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server at localhost:5173 |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## 🔑 Environment variables

| Variable | Required | Value |
|---|---|---|
| `VITE_API_URL` | ✅ | `https://api.openweathermap.org/data/2.5/weather` |
| `VITE_API_KEY` | ✅ | Your OpenWeatherMap API key |

---

## 🧰 Tech stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev) | UI framework |
| [Vite 8](https://vitejs.dev) | Build tool & dev server |
| [MUI v9](https://mui.com) | Component library + theming |
| [OpenWeatherMap API](https://openweathermap.org/api) | Weather data |
| [picsum.photos](https://picsum.photos) | Weather card background images |

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

---

## 📄 License

[MIT](LICENSE)