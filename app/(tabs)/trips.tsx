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
import { router } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { ContainerHeader } from "@/components/container-header.tsx";
import { Container } from "@/components/container";

export default function Trips() {
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [recentTrips, setRecentTrips] = useState([]);
  const [selectedTab, setSelectedTab] = useState("upcoming");
  const theme = useTheme();

  useEffect(() => {
    fetchTrips();
  }, []);

  async function fetchTrips() {
    try {
      const { data: upcomingData, error: upcomingError } = await supabase
        .from("trips")
        .select("*")
        .eq("status", "upcoming")
        .order("date", { ascending: true });

      if (upcomingError) {
        throw upcomingError;
      }

      const { data: recentData, error: recentError } = await supabase
        .from("trips")
        .select("*")
        .eq("status", "recent")
        .order("date", { ascending: false });

      if (recentError) {
        throw recentError;
      }

      setUpcomingTrips(upcomingData || []);
      setRecentTrips(recentData || []);
    } catch (error) {
      console.error("Error fetching trips: ", error);
    }
  }

  function renderTripItem({ item }) {
    return (
      <TouchableOpacity
        style={[styles.tripItem, { backgroundColor: theme.card }]}
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
        <Icon name="chevron-forward-outline" size={20} color={theme.icon} />
      </TouchableOpacity>
    );
  }

  return (
    <Container>
      <ContainerHeader>
        <Text
          style={[
            { color: theme.text, fontSize: 24, fontFamily: "PoppinsBold" },
          ]}
        >
          Trips
        </Text>
      </ContainerHeader>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "upcoming" && styles.activeTab]}
          onPress={() => setSelectedTab("upcoming")}
        >
          <Text
            style={[
              styles.tabText,
              { color: theme.text },
              selectedTab === "upcoming" && styles.activeTabText,
            ]}
          >
            Upcoming Trips
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "recent" && styles.activeTab]}
          onPress={() => setSelectedTab("recent")}
        >
          <Text
            style={[
              styles.tabText,
              { color: theme.text },
              selectedTab === "recent" && styles.activeTabText,
            ]}
          >
            Recent Trips
          </Text>
        </TouchableOpacity>
      </View>

      {selectedTab === "upcoming" && (
        <FlatList
          data={upcomingTrips}
          renderItem={renderTripItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => (
            <Text style={[styles.emptyText, { color: theme.subtext }]}>
              No upcoming trips.
            </Text>
          )}
          style={styles.list}
        />
      )}

      {selectedTab === "recent" && (
        <FlatList
          data={recentTrips}
          renderItem={renderTripItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => (
            <Text style={[styles.emptyText, { color: theme.subtext }]}>
              No recent trips.
            </Text>
          )}
          style={styles.list}
        />
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
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    padding: 12,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    alignItems: "center",
  },
  activeTabText: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 17,
  },

  activeTab: {
    borderBottomColor: "#FF5A5F", // Replace with theme accent color if available
    borderBottomWidth: 4,
    borderRadius: 2,
  },
  tabText: {
    fontSize: 16,
    fontFamily: "PoppinsMedium",
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
