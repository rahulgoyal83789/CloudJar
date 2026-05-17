import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import GrainIcon from "@mui/icons-material/Grain";
import WaterIcon from "@mui/icons-material/Water";

// picsum.photos: free, no auth, works from localhost with no referrer issues
const IMAGES = {
  thunder: "https://picsum.photos/seed/storm111/600/200",
  rain:    "https://picsum.photos/seed/rain222/600/200",
  snow:    "https://picsum.photos/seed/snow333/600/200",
  hot:     "https://picsum.photos/seed/sunny444/600/200",
  cold:    "https://picsum.photos/seed/cold555/600/200",
  cloudy:  "https://picsum.photos/seed/cloud666/600/200",
};

function getWeatherAssets(condition = "", temp = 20) {
  const c = condition.toLowerCase();
  if (c.includes("thunderstorm")) return { image: IMAGES.thunder, icon: <ThunderstormIcon />, label: "Thunderstorm" };
  if (c.includes("drizzle") || c.includes("rain")) return { image: IMAGES.rain, icon: <GrainIcon />, label: "Rainy" };
  if (c.includes("snow")) return { image: IMAGES.snow, icon: <AcUnitIcon />, label: "Snowy" };
  if (c.includes("mist") || c.includes("fog") || c.includes("haze") || c.includes("smoke") || c.includes("dust"))
    return { image: IMAGES.cloudy, icon: <WaterIcon />, label: "Misty" };
  if (c.includes("cloud")) return { image: IMAGES.cloudy, icon: <CloudIcon />, label: "Cloudy" };
  if (temp <= 10) return { image: IMAGES.cold, icon: <AcUnitIcon />, label: "Cold" };
  return { image: IMAGES.hot, icon: <WbSunnyIcon />, label: "Sunny" };
}

const StatRow = ({ label, value }) => (
  <>
    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.65)", py: 0.5 }}>
      {label}
    </Typography>
    <Typography variant="body2" fontWeight={600} sx={{ color: "#fff", py: 0.5, textAlign: "right" }}>
      {value}
    </Typography>
  </>
);

export default function InfoBox({ info }) {
  const { image, icon, label } = getWeatherAssets(
    info.weatherCondition || info.weather,
    info.temp
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: 380,
          borderRadius: 4,
          overflow: "hidden",
          // Glassmorphism card
          background: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.22)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Weather image */}
        <Box
          role="img"
          aria-label={`${label} weather in ${info.city}`}
          sx={{
            height: 170,
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "rgba(0,0,0,0.3)",
            position: "relative",
          }}
        >
          {/* Gradient overlay on image for smooth transition to card */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.45))",
            }}
          />
          {/* City name overlay on image */}
          <Box sx={{ position: "absolute", bottom: 12, left: 16, display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h5" fontWeight={700} sx={{ color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>
              {info.city}
            </Typography>
            <Box sx={{ color: "rgba(255,255,255,0.9)", display: "inline-flex" }} aria-label={label}>
              {icon}
            </Box>
          </Box>
        </Box>

        {/* Stats */}
        <CardContent sx={{ px: 3, py: 2.5 }}>
          {/* Big temperature display */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
            <Box>
              <Typography variant="h2" fontWeight={700} sx={{ color: "#fff", lineHeight: 1 }}>
                {info.temp.toFixed(0)}°
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", mt: 0.5, textTransform: "capitalize" }}>
                {info.weather}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>Feels like</Typography>
              <Typography variant="h5" fontWeight={600} sx={{ color: "#fff" }}>
                {info.feelsLike.toFixed(1)}°C
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.15)", mb: 2 }} />

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0.5 }}>
            <StatRow label="⬇ Min" value={`${info.tempMin.toFixed(1)}°C`} />
            <StatRow label="⬆ Max" value={`${info.tempMax.toFixed(1)}°C`} />
            <StatRow label="💧 Humidity" value={`${info.humidity}%`} />
            <StatRow label="☁ Condition" value={info.weatherCondition || label} />
          </Box>
        </CardContent>
      </Box>
    </Box>
  );
}