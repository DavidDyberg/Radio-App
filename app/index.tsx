import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-red-700">Home3333</Text>
      <Link href="/settings">
        <Text className="text-blue-800">Settings</Text>
      </Link>
    </View>
  );
}
