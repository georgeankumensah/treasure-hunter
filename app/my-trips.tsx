import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { supabase } from "@/utils/lib/supabase";
import { Link, router } from "expo-router";
import { Container } from "@/components/container";
import { ContainerHeader } from "@/components/container-header.tsx";
import { Ionicons } from "@expo/vector-icons";

export default function MyTrips() {
  const [myTrips, setMyTrips] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    fetchMyTrips();
  }, []);

  async function fetchMyTrips() {
    try {
      const { data, error } = await supabase
        .from("trips")
        .select("*")
        .eq("created_by", supabase.auth.user()?.id)
        .order("date", { ascending: false });

      if (error) {
        throw error;
      }

      setMyTrips(data || []);
    } catch (error) {
      console.error("Error fetching my trips: ", error);
    }
  }

  function renderTripItem({ item }) {
    return (
      <TouchableOpacity
        style={[styles.tripItem, { backgroundColor: theme.cityCardBackground }]}
        onPress={() => router.push(`/trip-details/${item.id}`)}
      >
        <View>
          <Text style={[styles.tripTitle, { color: theme.text }]}>
            {item.title}
          </Text>
          <Text style={[styles.tripDate, { color: theme.subtext }]}>
            {item.date}
          </Text>
        </View>
        <Ionicons
          name="chevron-forward-circle-outline"
          size={24}
          color={theme.icon}
        />
      </TouchableOpacity>
    );
  }

  return (
    <Container>
      <ContainerHeader>
        <Text style={[styles.header, { color: theme.text }]}>My Trips</Text>
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

      <FlatList
        data={myTrips}
        renderItem={renderTripItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <Text style={[styles.emptyText, { color: theme.subtext }]}>
            You haven't created any trips yet.
          </Text>
        )}
        style={styles.list}
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
  },
  list: {
    marginBottom: 20,
  },
  tripItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  tripTitle: {
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  },
  tripDate: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    marginTop: 4,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    textAlign: "center",
    marginTop: 12,
  },
});
