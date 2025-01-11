import { ChannelType, PaginationType } from "@/lib/types";

export const fetchChannels = async () => {
  let allChannels: ChannelType[] = [];
  let nextPageUrl: string | null =
    "https://api.sr.se/api/v2/channels/?format=json";

  while (nextPageUrl) {
    const response = await fetch(nextPageUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: { channels: ChannelType[]; pagination: PaginationType } =
      await response.json();
    allChannels = allChannels.concat(data.channels);
    nextPageUrl = data.pagination.nextpage || null;
  }

  return allChannels;
};

// export const fetchChannels = async () => {
//   const ApiUrl = "https://api.sr.se/api/v2/channels/?format=json";

//   const response = await fetch(ApiUrl);
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   const data = await response.json();
//   return data.channels;
// };
