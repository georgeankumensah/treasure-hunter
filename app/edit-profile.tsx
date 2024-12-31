import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import { useTheme } from "@/hooks/useTheme";
import Button from "@/components/button";
import { Link, router } from "expo-router";
import TextInput from "@/components/text-input";
import { ContainerHeader } from "@/components/container-header.tsx";
import { Container } from "@/components/container";

export default function EditProfile({ session }: { session: Session }) {
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

  // Fetch the current user profile from Supabase
  async function getProfile() {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("username, website")
        .eq("id", session?.user.id)
        .single();

      if (error) throw error;

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  // Update the user's profile in Supabase
  async function updateProfile() {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: session?.user.id,
        username,
        website,
      });

      if (error) throw error;

      Alert.alert(
        "Profile Updated",
        "Your profile has been updated successfully."
      );
      router.push("/account"); // Navigate back to the Account screen after update
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <ContainerHeader>
        <Text style={[styles.header, { color: theme.text }]}>Edit Profile</Text>
        <Link
          href={"/account"}
          style={{
            fontFamily: "PoppinsSemiBold",
            textDecorationLine: "underline",
            textDecorationColor: theme.primary,
            color: theme.primary,
            fontSize: 16,
            textDecorationStyle: "solid",
          }}
        >
          Back
        </Link>
      </ContainerHeader>

      {loading ? (
        <View
          style={{
            flex: 1,
          }}
        >
          <ActivityIndicator color={theme.primary} size={40} />
        </View>
      ) : (
        <View>
          <TextInput
            value={username}
            title={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
          />
          <TextInput
            title={website}
            value={website}
            onChangeText={setWebsite}
            placeholder="Enter your website"
          />

          <Button
            title="Save Changes"
            onPress={updateProfile}
            style={styles.saveButton}
          />
        </View>
      )}
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
    
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 12,
    marginBottom: 20,
    fontSize: 16,
    fontFamily: "PoppinsRegular",
  },
  loadingText: {
    fontSize: 18,
    fontFamily: "PoppinsRegular",
    marginBottom: 20,
  },
  saveButton: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
});
