import type { ChannelType } from "@/lib/types";
import { View, Text, Image, Pressable } from "react-native";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { CustomButton } from "@/components/button";
import { SizeOption, useSize } from "@/utils/SizeProvider";
import { cn } from "@/utils/classnames";
import P4Logo from "@/assets/images/p4-icon.svg";
import React from "react";
import P4Modal from "./P4Channes-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ChannelListProps = {
  channels: ChannelType[];
};

const ChannelList: React.FC<ChannelListProps> = ({ channels }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playingChannelId, setPlayingChannelId] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedP4, setSelectedP4] = useState<ChannelType | null>(null);
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

  const filteredChannels = channels.filter(
    (channel) => !channel.name.startsWith("P4") || channel.name === "P4 Plus"
  );

  const p4Channels = channels.filter(
    (channel) => channel.name.startsWith("P4") && channel.name !== "P4 Plus"
  );

  useEffect(() => {
    const loadSelectedP4Channel = async () => {
      const storedP4Channel = await AsyncStorage.getItem("selectedP4Channel");
      if (storedP4Channel) {
        setSelectedP4(JSON.parse(storedP4Channel));
      }
    };
    loadSelectedP4Channel();
  }, []);

  const handleSelectP4 = async (channel: ChannelType) => {
    setSelectedP4(channel);
    await AsyncStorage.setItem("selectedP4Channel", JSON.stringify(channel));
  };

  return (
    <View className="gap-4">
      {filteredChannels.map((channel, index) => (
        <React.Fragment key={channel.id}>
          <View className="flex flex-col gap-1 border-b border-gray-400">
            <Text
              className={cn(
                appSize === SizeOption.Large
                  ? "text-2xl"
                  : appSize === SizeOption.ExtraLarge
                  ? "text-3xl"
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

          {index === 2 && (
            <View>
              {selectedP4 ? (
                <View className="flex flex-col gap-1 border-b border-gray-400">
                  <View className="flex flex-wrap flex-row justify-between">
                    <Text
                      className={cn(
                        "flex-1",
                        appSize === SizeOption.Large
                          ? "text-2xl"
                          : appSize === SizeOption.ExtraLarge
                          ? "text-3xl"
                          : "text-base"
                      )}
                    >
                      {selectedP4.name.toUpperCase()}
                    </Text>
                    <Pressable onPress={() => setModalVisible(true)}>
                      <Text
                        className={cn(
                          "mr-2",
                          appSize === SizeOption.Large
                            ? "text-2xl"
                            : appSize === SizeOption.ExtraLarge
                            ? "text-3xl"
                            : "text-base"
                        )}
                      >
                        Byt P4-kanal
                      </Text>
                    </Pressable>
                  </View>
                  <View className="flex flex-row justify-between items-center pb-1">
                    <Image
                      source={{ uri: selectedP4.image }}
                      style={{
                        width: channelImageSize,
                        height: channelImageSize,
                        borderRadius: 10,
                      }}
                    />
                    <CustomButton
                      variant="playButton"
                      className="mr-2"
                      isPlaying={playingChannelId === selectedP4.id}
                      onPress={() =>
                        playingChannelId === selectedP4.id
                          ? stopSound()
                          : playSound(selectedP4.liveaudio.url, selectedP4.id)
                      }
                    />
                  </View>
                </View>
              ) : (
                <View className="flex flex-row items-center justify-between gap-1 border-b border-gray-400 pb-2">
                  <View
                    style={{
                      width: channelImageSize,
                      height: channelImageSize,
                      borderRadius: 10,
                      overflow: "hidden",
                    }}
                  >
                    <P4Logo
                      width={channelImageSize}
                      height={channelImageSize}
                    />
                  </View>
                  <Pressable onPress={() => setModalVisible(true)}>
                    <Text
                      className={cn(
                        "mr-2",
                        appSize === SizeOption.Large
                          ? "text-2xl"
                          : appSize === SizeOption.ExtraLarge
                          ? "text-3xl"
                          : "text-base"
                      )}
                    >
                      Välj P4-kanal
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
          )}
        </React.Fragment>
      ))}

      <P4Modal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectP4={(channel) => {
          setSelectedP4(channel);
          handleSelectP4(channel);
          setModalVisible(false);
        }}
        p4Channels={p4Channels}
      />
    </View>
  );
};

export default ChannelList;
