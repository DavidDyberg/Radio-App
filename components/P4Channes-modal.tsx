import {
  Modal,
  ModalProps,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { ChannelType } from "@/lib/types";
import { useSize, SizeOption } from "@/utils/SizeProvider";
import { cn } from "@/utils/classnames";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type P4ModalProps = ModalProps & {
  visible: boolean;
  onClose: () => void;
  onSelectP4: (channel: ChannelType) => void;
  p4Channels: ChannelType[];
};

const P4Modal = ({
  visible,
  onClose,
  onSelectP4,
  p4Channels,
}: P4ModalProps) => {
  const { appSize } = useSize();
  const [selectedChannelId, setSelectedChannelId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const loadActiveP4Channel = async () => {
      const storedActiveP4Channel = await AsyncStorage.getItem(
        "activeP4Channel"
      );
      if (storedActiveP4Channel) {
        const channel = JSON.parse(storedActiveP4Channel);
        setSelectedChannelId(channel.id);
        onSelectP4(channel);
      }
    };
    loadActiveP4Channel();
  }, []);

  const handleSelectP4 = async (channel: ChannelType) => {
    setSelectedChannelId(channel.id);
    onSelectP4(channel);
    await AsyncStorage.setItem("activeP4Channel", JSON.stringify(channel));
  };

  return (
    <Modal
      presentationStyle="pageSheet"
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex flex-row items-center justify-between m-4">
        <Text
          className={cn(
            "font-bold",
            appSize === SizeOption.Large
              ? "text-3xl"
              : appSize === SizeOption.ExtraLarge
              ? "text-4xl"
              : "text-2xl"
          )}
        >
          Välj P4-kanal
        </Text>
        <Pressable onPress={onClose}>
          <Text
            className={cn(
              "text-blue-800",
              appSize === SizeOption.Large
                ? "text-2xl"
                : appSize === SizeOption.ExtraLarge
                ? "text-3xl"
                : "text-base"
            )}
          >
            Avbryt
          </Text>
        </Pressable>
      </View>
      <View>
        <ScrollView className="mb-20">
          {p4Channels.map((channel) => (
            <View key={channel.id} className="ml-4 mr-4 pt-2 pb-2">
              <Pressable
                onPress={() => handleSelectP4(channel)}
                className="p-2 border-b border-gray-300"
              >
                <Text
                  className={cn(
                    appSize === SizeOption.Large
                      ? "text-2xl"
                      : appSize === SizeOption.ExtraLarge
                      ? "text-3xl"
                      : "text-base"
                  )}
                >
                  {channel.name}
                </Text>
                {selectedChannelId === channel.id && (
                  <Text className="text-green-500">Selected</Text>
                )}
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default P4Modal;
