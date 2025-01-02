import type { ChannelType } from "@/lib/types";
import { View, Text, Image } from "react-native";

type ChannelListProps = {
  channels: ChannelType[];
};

const ChannelList: React.FC<ChannelListProps> = ({ channels }) => {
  return (
    <View>
      {channels.map((channel) => (
        <View key={channel.id}>
          <Text className="text-black">{channel.name}</Text>
          <Image
            source={{ uri: channel.image }}
            style={{ width: 50, height: 50 }}
          />
        </View>
      ))}
    </View>
  );
};

export default ChannelList;
