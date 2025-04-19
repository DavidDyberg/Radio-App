import { Tabs } from "expo-router";
import { SizeOption, useSize } from "@/utils/SizeProvider";
import { TvMinimalPlay, Settings } from "lucide-react-native";
import { Platform } from "react-native";

export default function TabsLayout() {
  const { appSize } = useSize();
  const titleFontSize =
    appSize === SizeOption.Large
      ? 22
      : appSize === SizeOption.ExtraLarge
      ? 26
      : 18;

  const tabBarFontSize =
    appSize === SizeOption.Large
      ? 16
      : appSize === SizeOption.ExtraLarge
      ? 20
      : 12;

  const tabBarIconSize =
    appSize === SizeOption.Large
      ? 28
      : appSize === SizeOption.ExtraLarge
      ? 36
      : 26;

  const tabBarHeight = Platform.OS === "android" ? 70 : 70;

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#f8fafc" },
        headerTitleStyle: { fontSize: titleFontSize },
        tabBarStyle: { height: tabBarHeight },
        tabBarLabelStyle: { fontSize: tabBarFontSize },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Radio Kanaler",
          title: "Kanaler",
          tabBarIcon: ({ color }) => (
            <TvMinimalPlay color={color} size={tabBarIconSize} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerTitle: "Inställningar",
          title: "Inställningar",

          tabBarIcon: ({ color }) => (
            <Settings color={color} size={tabBarIconSize} />
          ),
        }}
      />
    </Tabs>
  );
}
