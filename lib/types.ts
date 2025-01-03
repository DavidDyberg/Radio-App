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
