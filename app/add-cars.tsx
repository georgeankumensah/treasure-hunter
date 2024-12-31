import { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import { useTheme } from "@/hooks/useTheme";
import Button from "@/components/button";
import { ContainerHeader } from "@/components/container-header.tsx";
import { Container } from "@/components/container";
import { Link } from "expo-router";
import { supabase } from "@/utils/lib/supabase";

export default function AddCarScreen() {
  const theme = useTheme();
  const [carDetails, setCarDetails] = useState({
    make: "",
    model: "",
    year: "",
    licensePlate: "",
    color: "",
  });

  async function handleSubmit() {
    if (
      !carDetails.make ||
      !carDetails.model ||
      !carDetails.year ||
      !carDetails.licensePlate
    ) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      // Here you can send carDetails to the server or API
      console.log("Car details submitted: ", carDetails);
      Alert.alert("Success", "Car details added successfully");

      const { data, error } = await supabase.from("cars").insert([
        {
          make: carDetails.make,
          model: carDetails.model,
          year: parseInt(carDetails.year),
          color: carDetails.color,
        },
      ]);

      if (error) {
        console.error("Error adding car:", error);
      } else {
        console.log("Car added successfully:", data);

        // Clear the form

        setCarDetails({
          make: "",
          model: "",
          year: "",
          licensePlate: "",
          color: "",
        });
      }
    } catch (error) {
      console.error("Error adding car details: ", error);
      Alert.alert("Error", "Failed to add car details");
    }
  }

  return (
    <Container>
      <ContainerHeader>
        <Text
          style={[
            { color: theme.text, fontSize: 24, fontFamily: "PoppinsBold" },
          ]}
        >
          Add Car Details
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
      <ScrollView style={[styles.container]}>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: theme.cityCardBackground, color: theme.text },
          ]}
          placeholder="Car Make"
          placeholderTextColor={theme.subtext}
          value={carDetails.make}
          onChangeText={(text) =>
            setCarDetails((prev) => ({ ...prev, make: text }))
          }
        />
        <TextInput
          style={[
            styles.input,
            { backgroundColor: theme.cityCardBackground, color: theme.text },
          ]}
          placeholder="Car Model"
          placeholderTextColor={theme.subtext}
          value={carDetails.model}
          onChangeText={(text) =>
            setCarDetails((prev) => ({ ...prev, model: text }))
          }
        />
        <TextInput
          style={[
            styles.input,
            { backgroundColor: theme.cityCardBackground, color: theme.text },
          ]}
          placeholder="Year"
          placeholderTextColor={theme.subtext}
          value={carDetails.year}
          keyboardType="numeric"
          onChangeText={(text) =>
            setCarDetails((prev) => ({ ...prev, year: text }))
          }
        />
        <TextInput
          style={[
            styles.input,
            { backgroundColor: theme.cityCardBackground, color: theme.text },
          ]}
          placeholder="License Plate"
          placeholderTextColor={theme.subtext}
          value={carDetails.licensePlate}
          onChangeText={(text) =>
            setCarDetails((prev) => ({ ...prev, licensePlate: text }))
          }
        />
        <View
          style={{
            flex: 1,
          }}
        />
        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontFamily: "PoppinsBold",
  },
  heading: {
    fontSize: 24,
    fontFamily: "PoppinsSemiBold",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontFamily: "PoppinsRegular",
    fontSize: 16,
  },
});
