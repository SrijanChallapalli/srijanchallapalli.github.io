/**
 * Live weather from Open-Meteo — free, keyless, and CORS-enabled, so it can
 * run in the browser on a static site. Swap for OpenWeather/WeatherAPI here
 * if you ever need more detail; the component only depends on `Weather`.
 */
export type Weather = {
  tempF: number;
  tempC: number;
  condition: string;
  isDay: boolean;
};

// WMO weather interpretation codes → short human labels.
const CONDITIONS: [number[], string][] = [
  [[0], "Clear"],
  [[1], "Mostly clear"],
  [[2], "Partly cloudy"],
  [[3], "Overcast"],
  [[45, 48], "Fog"],
  [[51, 53, 55, 56, 57], "Drizzle"],
  [[61, 63, 66, 80, 81], "Rain"],
  [[65, 67, 82], "Heavy rain"],
  [[71, 73, 77, 85], "Snow"],
  [[75, 86], "Heavy snow"],
  [[95, 96, 99], "Thunderstorms"],
];

export const describeWeatherCode = (code: number) =>
  CONDITIONS.find(([codes]) => codes.includes(code))?.[1] ?? "—";

export async function getWeather(
  latitude: number,
  longitude: number,
  signal?: AbortSignal,
): Promise<Weather> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.search = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,weather_code,is_day",
    temperature_unit: "fahrenheit",
  }).toString();

  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`weather ${res.status}`);
  const { current } = (await res.json()) as {
    current: { temperature_2m: number; weather_code: number; is_day: number };
  };

  return {
    tempF: Math.round(current.temperature_2m),
    tempC: Math.round(((current.temperature_2m - 32) * 5) / 9),
    condition: describeWeatherCode(current.weather_code),
    isDay: current.is_day === 1,
  };
}
