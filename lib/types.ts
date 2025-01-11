export type ChannelType = {
  id: number;
  name: string;
  image: string;
  imagetemplate: string;
  color: string;
  tagline: string;
  siteurl: string;
  scheduleurl: string;
  channeltype: string;
  xmltvid: string;

  liveaudio: {
    id: number;
    url: string;
    statkey: string;
  };
};

export type PaginationType = {
  page: number;
  size: number;
  totalhits: number;
  totalpages: number;
  nextpage: string | null;
};

export type ChannelsResponseType = {
  channels: ChannelType[];
  pagination: PaginationType;
};
