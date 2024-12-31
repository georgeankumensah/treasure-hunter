import { useAuthStore } from "@/store/authStore";

const fetchCities = async (country: string) => {
  console.warn(country);
  const response = await fetch(
    "https://countriesnow.space/api/v0.1/countries/cities",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country,
      }),
    }
  );
  const data = await response.json();

  console.warn(data);
  useAuthStore.setState({ cities: data.data });
};

export default fetchCities;
