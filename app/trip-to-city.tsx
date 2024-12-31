import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import your Supabase client
import { useTheme } from "@/hooks/useTheme"; // Custom hook for theme
import { useAuthStore } from "@/store/authStore"; // Custom store for authentication
import { supabase } from "@/utils/lib/supabase";

const TripsScreen = ({ route }: { route: { params: { city: string } } }) => {
  const { city } = route.params; // City passed as route parameter
  const [trips, setTrips] = useState<any[]>([]); // Store trips in a state
  const [loading, setLoading] = useState<boolean>(true); // Handle loading state
  const theme = useTheme();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        // Fetch trips from Supabase based on the 'city' field
        const { data, error } = await supabase
          .from("trips") // The trips table in your Supabase database
          .select("*")
          .eq("city", city); // Filter by city

        if (error) {
          throw error; // Handle any errors during the query
        }

        setTrips(data || []); // Set fetched trips data
      } catch (error) {
        Alert.alert("Error", "There was an error fetching trips.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips(); // Call fetch function on mount
  }, [city]);

  const handleJoinTrip = async (tripId: string) => {
    try {
      // Example: Join the trip by inserting a user into a join table, or updating the trip table
      const userId = "exampleUserId"; // Replace with actual authenticated user ID from your auth store

      const { data, error } = await supabase
        .from("trip_participants") // Assuming there's a `trip_participants` table
        .insert([{ trip_id: tripId, user_id: userId }]); // Insert join record

      if (error) {
        throw error;
      }

      Alert.alert("Success", "You have joined the trip!");
    } catch (error) {
      Alert.alert("Error", "There was an error joining the trip.");
    }
  };

  const renderTripItem = ({ item }: { item: any }) => {
    return (
      <Pressable onPress={() => handleJoinTrip(item.id)}>
        <View
          style={{
            padding: 10,
            borderWidth: StyleSheet.hairlineWidth,
            borderRadius: 8,
            height: 80,
            marginVertical: 5,
            backgroundColor: theme.cityCardBackground,
          }}
        >
          <Text
            style={{
              fontFamily: "PoppinsRegular",
              color: theme.text,
              fontSize: 18,
            }}
          >
            {item.name} {/* Trip name */}
          </Text>
          <Text
            style={{
              fontFamily: "PoppinsRegular",
              color: theme.text,
              fontSize: 14,
            }}
          >
            {item.date} {/* Trip date */}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text
        style={{
          fontFamily: "PoppinsSemiBold",
          fontSize: 24,
          color: theme.text,
          marginBottom: 10,
        }}
      >
        Trips in {city}
      </Text>

      {/* Display Loading or Trips */}
      {loading ? (
        <Text
          style={{
            fontFamily: "PoppinsRegular",
            color: theme.text,
            fontSize: 16,
          }}
        >
          Loading trips...
        </Text>
      ) : (
        <FlatList
          data={trips}
          renderItem={renderTripItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
export default TripsScreen;
