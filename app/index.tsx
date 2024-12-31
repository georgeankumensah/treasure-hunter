import { Container } from "@/components/container";
import { useAuthStore } from "@/store/authStore";
import handleDeepLink from "@/utils/lib/handleDeepLink";
import { Redirect, Stack } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

export default function Splash() {
  const session = useAuthStore((state) => state.session);

  handleDeepLink();

  if (session) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/login" />;
}
