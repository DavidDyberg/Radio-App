import { Stack } from "expo-router/stack";
import React from "react";
import { Button } from "react-native";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerRight: () => (
          <Button
            onPress={() => {
              alert("This is a button!");
            }}
            title="Info"
            color="#fff"
          />
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Radio Kanaler",
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerTitle: "Inställningar",
          headerBackTitle: "Tillbaka",
        }}
      />
    </Stack>
  );
}
