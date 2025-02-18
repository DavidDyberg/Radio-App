import type { ChannelType } from "@/lib/types";
import { View, Text, Image, Button, Pressable } from "react-native";
import { Audio } from "expo-av";
import { useState } from "react";
import { PlayButton } from "@/components/button";

type ChannelListProps = {
  channels: ChannelType[];
};

const ChannelList: React.FC<ChannelListProps> = ({ channels }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playingChannelId, setPlayingChannelId] = useState<number | null>(null);

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

  return (
    <View className="gap-4">
      {channels.map((channel) => (
        <View
          className="flex flex-row justify-between gap-2 border-b border-gray-400"
          key={channel.id}
        >
          <View className="flex flex-row gap-1 mb-1">
            <Image
              source={{ uri: channel.image }}
              style={{ width: 50, height: 50, borderRadius: 10 }}
            />
            <Text className="text-black">{channel.name}</Text>
          </View>

          <PlayButton
            className="mr-2"
            size="lg"
            isPlaying={playingChannelId === channel.id}
            onPress={() =>
              playingChannelId === channel.id
                ? stopSound()
                : playSound(channel.liveaudio.url, channel.id)
            }
          />
        </View>
      ))}
    </View>
  );
};

export default ChannelList;
