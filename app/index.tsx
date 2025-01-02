import { View, Text, Button, Alert, Image } from "react-native";
import { Link } from "expo-router";
import { ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchChannels } from "@/api-routes/channels";
import type { ChannelType } from "@/lib/types";

export default function HomeScreen() {
  const {
    data: channels,
    isLoading,
    error,
  } = useQuery<ChannelType[]>({
    queryKey: ["channels"],
    queryFn: fetchChannels,
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
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
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-700">Home3333</Text>
        <Link href="/settings">
          <Text className="text-blue-800">Settings</Text>
        </Link>
        {channels && channels.length > 0 && (
          <View>
            {channels?.map((channel) => (
              <View key={channel.id}>
                <Text className="text-black">{channel.name}</Text>
                <Image source={{ uri: channel.image }} width={50} height={50} />
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
