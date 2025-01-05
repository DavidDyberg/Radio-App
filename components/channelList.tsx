import type { ChannelType } from "@/lib/types";
import { View, Text, Image, Button, Pressable } from "react-native";
import { Audio } from "expo-av";
import { useState } from "react";

type ChannelListProps = {
  channels: ChannelType[];
};

const ChannelList: React.FC<ChannelListProps> = ({ channels }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playingChannelId, setPlayingChannelId] = useState<number | null>(null);

  const playAudio = async (url: string, channelId: number) => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync({ uri: url });
    setSound(newSound);
    setPlayingChannelId(channelId);
    await newSound.playAsync();
  };

  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
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
          {playingChannelId === channel.id ? (
            <Pressable onPress={stopAudio}>
              <Image
                className="mr-1"
                source={require("../assets/images/stop-button.png")}
              />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => playAudio(channel.liveaudio.url, channel.id)}
            >
              <Image
                className="mr-1"
                source={require("../assets/images/play-button.png")}
              />
            </Pressable>
          )}
        </View>
      ))}
    </View>
  );
};

export default ChannelList;
