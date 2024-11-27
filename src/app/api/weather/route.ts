export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}&lang=ja`;

  const res = await fetch(url);
  const weather = await res.json();
  return Response.json({ weather });
}
