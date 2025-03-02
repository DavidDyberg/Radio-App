import { SizeOption, useSize } from "@/utils/SizeProvider";
import { Stack } from "expo-router/stack";
import React from "react";
import { Button } from "react-native";

export default function AppLayout() {
  const { appSize } = useSize();

  const titleFontSize =
    appSize === SizeOption.Large
      ? 22
      : appSize === SizeOption.ExtraLarge
      ? 26
      : 18;

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "#f8fafc" },
        headerStyle: { backgroundColor: "#f8fafc" },
        headerRight: () => (
          <Button
            onPress={() => {
              alert("This is a button!");
            }}
            title="Info"
          />
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Radio Kanaler",
          headerTitleStyle: { fontSize: titleFontSize },
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerTitle: "Inställningar",
          headerBackTitle: "Tillbaka",
          headerTitleStyle: { fontSize: titleFontSize },
        }}
      />
    </Stack>
  );
}
