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
                onPress={() => onSelectP4(channel)}
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
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default P4Modal;
