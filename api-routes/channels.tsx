export const fetchChannels = async () => {
  const ApiUrl = "https://api.sr.se/api/v2/channels/?format=json";

  const response = await fetch(ApiUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.channels;
};
