import React from "react";
import "../global.css";
import ReactQueryProvider from "@/utils/ReactQueryProvider";
import { SizeProvider } from "@/utils/SizeProvider";
import AppLayout from "./AppLayout";

export default function RootLayout() {
  return (
    <SizeProvider>
      <ReactQueryProvider>
        <AppLayout />
      </ReactQueryProvider>
    </SizeProvider>
  );
}
