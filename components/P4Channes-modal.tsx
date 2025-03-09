import { useState } from "react";
import { Modal, ModalProps, Pressable, Text, View } from "react-native";
import { ChannelType } from "@/lib/types";

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
  return (
    <Modal animationType="slide" visible={visible}>
      <View className="flex flex-col justify-center items-center flex-1">
        {p4Channels.map((channel) => (
          <Pressable
            key={channel.id}
            onPress={() => onSelectP4(channel)}
            className="p-2 border-b border-gray-300"
          >
            <Text className="text-base">{channel.name}</Text>
          </Pressable>
        ))}
        <Pressable onPress={onClose}>
          <Text>Stäng</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default P4Modal;
