import React, { useEffect } from "react";
import "@/global.css";
import ReactQueryProvider from "@/utils/ReactQueryProvider";
import { SizeProvider } from "@/utils/SizeProvider";
import AppLayout from "@/app/AppLayout";
import * as ScreenOrientation from "expo-screen-orientation";
import * as Device from "expo-device";

export default function RootLayout() {
  useEffect(() => {
    if (Device.deviceType === Device.DeviceType.TABLET) {
      ScreenOrientation.unlockAsync();
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }, []);
  return (
    <SizeProvider>
      <ReactQueryProvider>
        <AppLayout />
      </ReactQueryProvider>
    </SizeProvider>
  );
}
