import type { ChannelType } from "@/lib/types";
import { View, Text, Image } from "react-native";
import { Audio } from "expo-av";
import { useState } from "react";
import { CustomButton } from "@/components/button";
import { SizeOption, useSize } from "@/utils/SizeProvider";
import { cn } from "@/utils/classnames";

type ChannelListProps = {
  channels: ChannelType[];
};

const ChannelList: React.FC<ChannelListProps> = ({ channels }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playingChannelId, setPlayingChannelId] = useState<number | null>(null);
  const { appSize } = useSize();

  const playSound = async (uri: string, channelId: number) => {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: true }
    );
    setSound(newSound);
    setPlayingChannelId(channelId);
  };

  const stopSound = async () => {
    if (sound) {
      await sound.setStatusAsync({ shouldPlay: false });
      setPlayingChannelId(null);
    }
  };

  const channelImageSize =
    appSize === SizeOption.Large
      ? 64
      : appSize === SizeOption.ExtraLarge
      ? 80
      : 48;

  return (
    <View className="gap-4">
      {channels.map((channel) => (
        <View
          className="flex flex-col gap-1 border-b border-gray-400"
          key={channel.id}
        >
          <Text
            className={cn(
              appSize === SizeOption.Large
                ? "text-xl"
                : appSize === SizeOption.ExtraLarge
                ? "text-2xl"
                : "text-base"
            )}
          >
            {channel.name.toUpperCase()}
          </Text>
          <View className="flex flex-row justify-between items-center pb-1">
            <Image
              source={{ uri: channel.image }}
              style={{
                width: channelImageSize,
                height: channelImageSize,
                borderRadius: 10,
              }}
            />

            <CustomButton
              variant="playButton"
              className="mr-2"
              isPlaying={playingChannelId === channel.id}
              onPress={() =>
                playingChannelId === channel.id
                  ? stopSound()
                  : playSound(channel.liveaudio.url, channel.id)
              }
            />
          </View>
        </View>
      ))}
    </View>
  );
};

export default ChannelList;
