import { Tabs } from "expo-router";
import { SizeOption, useSize } from "@/utils/SizeProvider";
import { House, Settings } from "lucide-react-native";

export default function TabsLayout() {
  const { appSize } = useSize();
  const titleFontSize =
    appSize === SizeOption.Large
      ? 22
      : appSize === SizeOption.ExtraLarge
      ? 26
      : 18;
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: "#f8fafc" },
        headerStyle: { backgroundColor: "#f8fafc" },
        headerTitleStyle: { fontSize: titleFontSize },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Radio Kanaler",
          title: "Kanaler",
          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerTitle: "Inställningar",
          title: "Inställningar",
          tabBarIcon: ({ color, size }) => (
            <Settings color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
