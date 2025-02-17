import { Stack } from "expo-router/stack";
import React from "react";
import { Button } from "react-native";
import "../global.css";
import ReactQueryProvider from "@/utils/ReactQueryProvider";

export default function RootLayout() {
  return (
    <ReactQueryProvider>
      <Stack
        screenOptions={{
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
    </ReactQueryProvider>
  );
}
