import { Stack } from "expo-router";
import { useSize, SizeOption } from "@/utils/SizeProvider";

export default function HomeLayout() {
  const { appSize } = useSize();

  const titleFontSize =
    appSize === SizeOption.Large
      ? 22
      : appSize === SizeOption.ExtraLarge
      ? 26
      : 18;
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Radio Kanaler",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#f8fafc" },
          headerTitleStyle: { fontSize: titleFontSize },
        }}
      />
      <Stack.Screen
        name="channel/[id]"
        options={{
          headerBackTitle: "Tillbaka",
          headerTitleStyle: { fontSize: titleFontSize },
        }}
      />
    </Stack>
  );
}
