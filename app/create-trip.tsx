import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  Pressable,
} from "react-native";
import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/utils/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import BottomSheet from "@/components/bottom-sheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ContainerHeader } from "@/components/container-header.tsx";
import { Container } from "@/components/container";
import { useTheme } from "@/hooks/useTheme";
import { Link } from "expo-router";
import TextInput from "@/components/text-input";
import Button from "@/components/button";
//   import { BottomSheetModal } from "@gorhom/bottom-sheet"; // Assuming using this for BottomSheet

export default function CreateTrip() {
  const [cities, setCities] = useState<string[]>([
    "City 1",
    "City 2",
    "City 3",
  ]);
  const [cars, setCars] = useState<
    { id: string; model: string; year: string }[]
  >([]);
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [numberOfPeople, setNumberOfPeople] = useState<string>("");
  const theme = useTheme();

  const user = useAuthStore((state) => state.user);
  const bottomSheetRef = useRef<BottomSheetModal>(null); // Bottom sheet reference for cars

  useEffect(() => {
    getCars();
  }, []);

  async function getCars() {
    try {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("user_id", user?.id);

      if (error) throw error;

      if (data) setCars(data);
    } catch (error) {
      if (error instanceof Error) Alert.alert(error.message);
    }
  }

  const handleCarSelection = (car: { model: string; year: string }) => {
    setSelectedCar(`${car.model} ${car.year}`);
    bottomSheetRef.current?.dismiss(); // Close the bottom sheet after selecting a car
  };

  const handleCreateTrip = async () => {
    if (!selectedCity || !selectedCar || !numberOfPeople) {
      return Alert.alert("Please fill out all fields.");
    }

    // Proceed with trip creation logic (could be sending data to supabase)
    Alert.alert(
      `Trip Created! City: ${selectedCity}, Car: ${selectedCar}, People: ${numberOfPeople}`
    );
  };

  const renderCarItem = ({
    item,
  }: {
    item: { model: string; year: string };
  }) => {
    return (
      <Pressable onPress={() => handleCarSelection(item)}>
        <View style={styles.carItem}>
          <Text style={styles.carText}>
            {item.model} ({item.year})
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <Container>
      <ContainerHeader>
        <Text
          style={[
            { color: theme.text, fontSize: 24, fontFamily: "PoppinsBold" },
          ]}
        >
          Create Your Trip
        </Text>
        <Link
          href={".."}
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

      {/* City selection */}
      {/* <TextInput
        style={styles.input}
        title="Select City"
        placeholder="Select City"
        value={selectedCity}
        onChangeText={setSelectedCity}
      /> */}

      {/* Number of people input */}
      <TextInput
        title="Number of People"
        placeholder="Number of People"
        keyboardType="numeric"
        value={numberOfPeople}
        onChangeText={setNumberOfPeople}
      />
      <View
        style={{
          height: 30,
        }}
      />
      <Button
        type="social"
        title={`${selectedCar ? selectedCar : "Choose a car"}`}
        onPress={() => bottomSheetRef.current?.present()}
      />

      {/* Bottom Sheet with car options */}
      <BottomSheet
        ref={bottomSheetRef}
        onChange={function (index: number) {
          console.warn("change");
        }}
      >
        <Text style={styles.sheetTitle}>Select a Car</Text>

        <FlatList
          data={cars}
          renderItem={renderCarItem}
          keyExtractor={(item) => item.id}
        />
      </BottomSheet>

      {/* Create trip button */}
      <View
        style={{
          flex: 1,
        }}
      />
      <Button title={`Create Trip`} onPress={handleCreateTrip} />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  selectCarButton: {
    marginVertical: 20,
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  selectCarButtonText: {
    color: "white",
    fontSize: 16,
  },
  createTripButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  createTripButtonText: {
    color: "white",
    fontSize: 18,
  },
  sheetTitle: {
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center",
  },
  carItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  carText: {
    fontSize: 18,
  },
});
