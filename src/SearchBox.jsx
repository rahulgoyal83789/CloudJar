import { useState } from "react";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

function getErrorMessage(status) {
  switch (status) {
    case 401: return "Invalid API key. Please check your .env configuration.";
    case 404: return "City not found. Check the spelling and try again.";
    case 429: return "Too many requests. Please wait a moment and try again.";
    case 500:
    case 502:
    case 503: return "Weather service is temporarily unavailable. Try again later.";
    default:  return "Something went wrong. Please try again.";
  }
}

export default function SearchBox({ updateInfo }) {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeatherInfo = async () => {
    const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) throw new Error(getErrorMessage(response.status));
    const json = await response.json();
    return {
      city: json.name,
      temp: json.main.temp,
      tempMin: json.main.temp_min,
      tempMax: json.main.temp_max,
      humidity: json.main.humidity,
      feelsLike: json.main.feels_like,
      weather: json.weather[0].description,
      weatherCondition: json.weather[0].main,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const newInfo = await getWeatherInfo();
      updateInfo(newInfo);
      setCity("");
    } catch (err) {
      setError(err.message || "Network error. Check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          maxWidth: 420,
          mx: "auto",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: 3,
          px: 2,
          py: 0.5,
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        <InputBase
          placeholder="Search city…"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={loading}
          required
          autoComplete="off"
          inputProps={{ "aria-label": "Enter city name" }}
          sx={{
            flex: 1,
            color: "#fff",
            fontSize: "1rem",
            "& ::placeholder": { color: "rgba(255,255,255,0.6)", opacity: 1 },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={loading || city.trim() === ""}
          sx={{
            borderRadius: 2,
            px: 2.5,
            py: 1,
            fontWeight: 600,
            background: "rgba(255,255,255,0.25)",
            color: "#fff",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.3)",
            boxShadow: "none",
            "&:hover": { background: "rgba(255,255,255,0.35)", boxShadow: "none" },
            "&:disabled": { background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" },
          }}
        >
          {loading ? <CircularProgress size={18} sx={{ color: "#fff" }} /> : "Search"}
        </Button>
      </Box>

      {error && (
        <Typography
          role="alert"
          variant="body2"
          sx={{
            mt: 1.5,
            color: "#fff",
            background: "rgba(220,50,50,0.55)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,100,100,0.4)",
            borderRadius: 2,
            px: 2,
            py: 1,
            maxWidth: 420,
            mx: "auto",
            textAlign: "left",
          }}
        >
          ⚠️ {error}
        </Typography>
      )}
    </Box>
  );
}