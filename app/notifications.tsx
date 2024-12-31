import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { supabase } from "@/utils/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import { useTheme } from "@/hooks/useTheme";
import Button from "@/components/button";
import { Container } from "@/components/container";
import { ContainerHeader } from "@/components/container-header.tsx";
import { Link } from "expo-router";

export default function Notifications() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);
  const user = useAuthStore((state) => state.user);
  const theme = useTheme();

  useEffect(() => {
    getNotifications();
  }, []);

  async function getNotifications() {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("notifications") // Assuming you have a notifications table in Supabase
        .select("*")
        .eq("user_id", user?.id) // Assuming there is a user_id field
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        setNotifications(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error fetching notifications", error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  const renderNotification = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        { backgroundColor: theme.cityCardBackground },
      ]}
    >
      <Text style={[styles.notificationTitle, { color: theme.text }]}>
        {item.title}
      </Text>
      <Text style={[styles.notificationDescription, { color: theme.text }]}>
        {item.body}
      </Text>
      <Text style={[styles.notificationTime, { color: theme.text }]}>
        {new Date(item.created_at).toLocaleString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Container>
      <ContainerHeader>
        <Text style={[styles.header, { color: theme.text }]}>
          Notifications
        </Text>
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
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      <Button
        title="Mark All As Read"
        onPress={() => {
          // Logic to mark all notifications as read could go here.
        }}
        style={styles.markAllButton}
      />
      <View
        style={{
          height: 10,
        }}
      />
      <Button
        title="Clear All"
        onPress={() => {
          // Logic to clear all notifications from the database could go here.
        }}
        style={styles.clearAllButton}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontFamily: "PoppinsBold",
  },
  loadingText: {
    fontSize: 18,
    fontFamily: "PoppinsRegular",
  },
  notificationItem: {
    flexDirection: "column",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  notificationTitle: {
    fontSize: 18,
    fontFamily: "PoppinsMedium",
    marginBottom: 8,
  },
  notificationDescription: {
    fontSize: 16,
    fontFamily: "PoppinsRegular",
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    opacity: 0.6,
  },
  markAllButton: {
    marginTop: 20,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  clearAllButton: {
    marginTop: 10,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
});
