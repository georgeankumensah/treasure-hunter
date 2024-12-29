import { useThemeColor } from "@/hooks/useThemeColor";
import { Redirect, Stack } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

export default function componentName() {
  const text = useThemeColor({ light: "#11181C", dark: "#ECEDEE" }, "text");

  return <Redirect href={"/verify-id"} />;
  // return <Redirect href={"/upload-document"} />;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Text style={{ color: text }}>Splash Screen</Text>
    </View>
  );
}
