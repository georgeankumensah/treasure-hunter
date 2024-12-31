import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
} from "react-native";
import { useTheme } from "@/hooks/useTheme";
import Icon from "react-native-vector-icons/Ionicons";

export default function Explore() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("accra");
  const theme = useTheme();

  useEffect(() => {
    fetchPlaces();
  }, []);

  async function fetchPlaces(query = "") {
    setLoading(true);
    const GEOAPIFY_API_KEY = "6b8bf3b59e06465194920b4504c3dcd2";
    try {
      // const response = await fetch(
      //   `https://api.geoapify.com/v2/places?categories=tourism.sights&filter=rect:-180,-90,180,90&text=${query}&apiKey=${GEOAPIFY_API_KEY}`
      // );
      const response = await fetch(
        `https://api.geoapify.com/v2/places?categories=tourism.sights&name:${searchTerm}&limit=20&apiKey=${GEOAPIFY_API_KEY}`
      );
      const data = await response.json();

      if (data.features) {
        setPlaces(data.features);
      }
    } catch (error) {
      console.error("Error fetching places: ", error);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch() {
    fetchPlaces(searchTerm);
  }

  function renderPlaceItem({ item }) {
    const { properties } = item;
    return (
      <View style={[styles.placeItem, { backgroundColor: theme.card }]}>
        <Image
          source={{
            uri: properties.thumbnail || "https://via.placeholder.com/150",
          }}
          style={styles.placeImage}
        />
        <View style={styles.placeDetails}>
          <Text style={[styles.placeName, { color: theme.text }]}>
            {properties.name}
          </Text>
          <Text style={[styles.placeDescription, { color: theme.subtext }]}>
            {properties.address_line1}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TextInput
        style={[
          styles.searchInput,
          { backgroundColor: theme.card, color: theme.text },
        ]}
        placeholder="Search places"
        placeholderTextColor={theme.subtext}
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearch}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color={theme.primary}
          style={styles.loadingIndicator}
        />
      ) : (
        <FlatList
          data={places}
          renderItem={renderPlaceItem}
          keyExtractor={(item) => item.properties.place_id}
          ListEmptyComponent={() => (
            <Text style={[styles.emptyText, { color: theme.subtext }]}>
              No places found.
            </Text>
          )}
          style={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontFamily: "PoppinsRegular",
    fontSize: 16,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  list: {
    marginBottom: 20,
  },
  placeItem: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  placeImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  placeDetails: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  },
  placeDescription: {
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
