import { View, Text, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchChannels } from "@/api-routes/channels";
import type { ChannelType } from "@/lib/types";
import ChannelList from "@/components/channelList";
import { Link } from "expo-router";

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
        <Link href="/channel/1">Go to channel 1</Link>
        <ChannelList channels={filteredChannels} />
      </View>
    </ScrollView>
  );
}
