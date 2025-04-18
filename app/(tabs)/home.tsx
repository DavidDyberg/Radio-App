import { View, Text, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchChannels } from "@/api-routes/channels";
import type { ChannelType } from "@/lib/types";
import ChannelList from "@/components/channelList";

export default function HomeScreen() {
  const {
    data: channels,
    isPending,
    error,
  } = useQuery<ChannelType[]>({
    queryKey: ["channels"],
    queryFn: fetchChannels,
  });

  const filteredChannels =
    channels?.filter((channel) => !channel.name.startsWith("SR")) || [];

  if (isPending) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error instanceof Error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-700">Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View className="flex-1 ml-4">
        <ChannelList channels={filteredChannels} />
      </View>
    </ScrollView>
  );
}
