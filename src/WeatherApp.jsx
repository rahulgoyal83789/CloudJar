import { useState, useEffect } from "react";
import { IconButton, Tooltip, Box, Typography } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import InfoBox from "./InfoBox";
import SearchBox from "./SearchBox";

// Returns gradient + particle config based on weather condition & mode
function getBgConfig(condition = "", temp = 20, mode) {
  const c = condition.toLowerCase();
  const isDark = mode === "dark";

  if (c.includes("thunderstorm")) {
    return {
      gradient: isDark
        ? "linear-gradient(135deg, #0f0c29 0%, #1a1a2e 40%, #16213e 100%)"
        : "linear-gradient(135deg, #373b44 0%, #4286f4 100%)",
      particles: "⚡",
      particleCount: 12,
      animClass: "thunder",
    };
  }
  if (c.includes("rain") || c.includes("drizzle")) {
    return {
      gradient: isDark
        ? "linear-gradient(160deg, #0d1b2a 0%, #1b2838 50%, #243447 100%)"
        : "linear-gradient(160deg, #4b6cb7 0%, #182848 100%)",
      particles: "💧",
      particleCount: 18,
      animClass: "rain",
    };
  }
  if (c.includes("snow")) {
    return {
      gradient: isDark
        ? "linear-gradient(160deg, #1a1a2e 0%, #2c3e6b 100%)"
        : "linear-gradient(160deg, #e0eafc 0%, #cfdef3 100%)",
      particles: "❄️",
      particleCount: 20,
      animClass: "snow",
    };
  }
  if (c.includes("haze") || c.includes("mist") || c.includes("fog") || c.includes("smoke") || c.includes("dust")) {
    return {
      gradient: isDark
        ? "linear-gradient(135deg, #232526 0%, #414345 100%)"
        : "linear-gradient(135deg, #bdc3c7 0%, #95a5a6 50%, #7f8c8d 100%)",
      particles: "🌫️",
      particleCount: 8,
      animClass: "haze",
    };
  }
  if (c.includes("cloud")) {
    return {
      gradient: isDark
        ? "linear-gradient(135deg, #1c1c2e 0%, #2d3561 100%)"
        : "linear-gradient(135deg, #757f9a 0%, #d7dde8 100%)",
      particles: "☁️",
      particleCount: 10,
      animClass: "clouds",
    };
  }
  // Clear / sunny — temp based
  if (temp <= 10) {
    return {
      gradient: isDark
        ? "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)"
        : "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      particles: "🌨️",
      particleCount: 14,
      animClass: "cold",
    };
  }
  // Hot & sunny
  return {
    gradient: isDark
      ? "linear-gradient(135deg, #1a0533 0%, #3b1f6b 50%, #7b2d8b 100%)"
      : "linear-gradient(135deg, #f7971e 0%, #ffd200 50%, #ff6b6b 100%)",
    particles: "☀️",
    particleCount: 8,
    animClass: "sunny",
  };
}

// Generate stable random positions for particles
function makeParticles(count, emoji) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji,
    left: `${(i * 37 + 11) % 95}%`,
    top: `${(i * 53 + 7) % 90}%`,
    size: `${1.2 + (i % 4) * 0.4}rem`,
    delay: `${(i * 0.7) % 4}s`,
    duration: `${4 + (i % 5)}s`,
  }));
}

export default function WeatherApp({ mode, toggleMode }) {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "Delhi",
    temp: 25.05,
    tempMin: 25.05,
    tempMax: 25.05,
    humidity: 47,
    feelsLike: 24.84,
    weather: "haze",
    weatherCondition: "Haze",
  });

  const [bgConfig, setBgConfig] = useState(() =>
    getBgConfig("Haze", 25, mode)
  );

  useEffect(() => {
    setBgConfig(getBgConfig(weatherInfo.weatherCondition || weatherInfo.weather, weatherInfo.temp, mode));
  }, [weatherInfo, mode]);

  const particles = makeParticles(bgConfig.particleCount, bgConfig.particles);

  const updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: bgConfig.gradient,
        color: "text.primary",
        transition: "background 1.2s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating particles */}
      {particles.map((p) => (
        <Box
          key={p.id}
          sx={{
            position: "absolute",
            left: p.left,
            top: p.top,
            fontSize: p.size,
            opacity: 0.18,
            animation: `float-${bgConfig.animClass} ${p.duration} ease-in-out ${p.delay} infinite`,
            pointerEvents: "none",
            userSelect: "none",
            filter: "blur(0.5px)",
            "@keyframes float-thunder": {
              "0%, 100%": { transform: "translateY(0px) scale(1)", opacity: 0.15 },
              "50%": { transform: "translateY(-18px) scale(1.1)", opacity: 0.35 },
            },
            "@keyframes float-rain": {
              "0%": { transform: "translateY(-20px)", opacity: 0 },
              "20%": { opacity: 0.25 },
              "100%": { transform: "translateY(30px)", opacity: 0 },
            },
            "@keyframes float-snow": {
              "0%": { transform: "translateY(0px) rotate(0deg)", opacity: 0.2 },
              "50%": { transform: "translateY(-14px) rotate(180deg)", opacity: 0.35 },
              "100%": { transform: "translateY(0px) rotate(360deg)", opacity: 0.2 },
            },
            "@keyframes float-haze": {
              "0%, 100%": { transform: "translateX(0px)", opacity: 0.1 },
              "50%": { transform: "translateX(12px)", opacity: 0.2 },
            },
            "@keyframes float-clouds": {
              "0%, 100%": { transform: "translateX(0px) translateY(0px)", opacity: 0.15 },
              "50%": { transform: "translateX(10px) translateY(-8px)", opacity: 0.28 },
            },
            "@keyframes float-cold": {
              "0%": { transform: "translateY(0) rotate(0deg)", opacity: 0.2 },
              "50%": { transform: "translateY(-12px) rotate(90deg)", opacity: 0.3 },
              "100%": { transform: "translateY(0) rotate(180deg)", opacity: 0.2 },
            },
            "@keyframes float-sunny": {
              "0%, 100%": { transform: "scale(1) rotate(0deg)", opacity: 0.15 },
              "50%": { transform: "scale(1.2) rotate(20deg)", opacity: 0.3 },
            },
          }}
        >
          {p.emoji}
        </Box>
      ))}

      {/* Glassmorphism overlay blob — top left */}
      <Box
        sx={{
          position: "absolute",
          top: -80,
          left: -80,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      {/* Bottom right blob */}
      <Box
        sx={{
          position: "absolute",
          bottom: -100,
          right: -60,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          py: 2.5,
          px: 3,
          backdropFilter: "blur(10px)",
          background: "rgba(0,0,0,0.15)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{
            color: "#fff",
            textShadow: "0 2px 12px rgba(0,0,0,0.4)",
            letterSpacing: 1,
          }}
        >
          <img src="/favicon.svg" alt="CloudJar" width="32" height="32" style={{ marginRight: "8px" }} /> CloudJar
        </Typography>
        <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}>
          <IconButton
            onClick={toggleMode}
            sx={{
              position: "absolute",
              right: 16,
              color: "#fff",
              background: "rgba(255,255,255,0.1)",
              "&:hover": { background: "rgba(255,255,255,0.2)" },
            }}
            aria-label="toggle dark mode"
          >
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Content — sits above particles */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          py: 5,
          px: 2,
        }}
      >
        <SearchBox updateInfo={updateInfo} />
        <InfoBox info={weatherInfo} />
      </Box>
    </Box>
  );
}