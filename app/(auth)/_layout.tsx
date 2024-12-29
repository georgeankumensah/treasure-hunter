import useAuthStore from "@/store/authStore";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { session } = useAuthStore();

  if (session) {
    return <Redirect href="/(tabs)" />;
  }

  return <Stack />;
}
