import { useState, useEffect } from "react";
import { StyleSheet, View, Alert, Text, TouchableOpacity } from "react-native";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import { useTheme } from "@/hooks/useTheme";
import { router } from "expo-router";
import Button from "@/components/button";
import { Container } from "@/components/container";
import { ContainerHeader } from "@/components/container-header.tsx";
import {
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Ionicons,
} from "@expo/vector-icons";

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const user = useAuthStore((state) => state.user);
  const theme = useTheme();

  useEffect(() => {
    if (session) {
      getProfile();
    }
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website`)
        .eq("id", session?.user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <ContainerHeader>
        <Text style={[styles.header, { color: theme.text }]}>Account</Text>
      </ContainerHeader>

      <Text style={[styles.welcomeText, { color: theme.text }]}>
        Welcome, {user?.email}
      </Text>

      <TouchableOpacity
        style={[styles.menuItem, { backgroundColor: theme.cityCardBackground }]}
        onPress={() => router.push("/edit-profile")}
      >
        <FontAwesome name="user-circle-o" size={24} color={theme.icon} />
        <Text style={[styles.menuText, { color: theme.text }]}>
          Edit Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.menuItem, { backgroundColor: theme.cityCardBackground }]}
        onPress={() => router.push("/my-trips")}
      >
        <Fontisto name="direction-sign" size={24} color={theme.icon} />
        <Text style={[styles.menuText, { color: theme.text }]}>My trips</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuItem, { backgroundColor: theme.cityCardBackground }]}
        onPress={() => router.push("/cars")}
      >
        <FontAwesome5 name="car" size={24} color={theme.icon} />
        <Text style={[styles.menuText, { color: theme.text }]}>Cars</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuItem, { backgroundColor: theme.cityCardBackground }]}
        onPress={() => router.push("/notifications")}
      >
        <Ionicons name="notifications" size={24} color={theme.icon} />
        <Text style={[styles.menuText, { color: theme.text }]}>
          Notifications
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
        }}
      />

      <Button
        title="Sign Out"
        onPress={() =>
          supabase.auth.signOut().finally(() => router.replace("/login"))
        }
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontFamily: "PoppinsBold",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontFamily: "PoppinsRegular",
    marginBottom: 40,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  },
  signOutButton: {
    marginTop: 20,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  signOutText: {
    fontSize: 16,
    fontFamily: "PoppinsBold",
  },
});
