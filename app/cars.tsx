import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { supabase } from "@/utils/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import { useTheme } from "@/hooks/useTheme";
import { Link, router } from "expo-router";
import { Container } from "@/components/container";
import { ContainerHeader } from "@/components/container-header.tsx";
import Button from "@/components/button";
import { AntDesign } from "@expo/vector-icons";

interface Car {
  id: string;
  model: string;
  year: string;
}

export default function Cars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user);
  const theme = useTheme();

  useEffect(() => {
    getCars();
  }, []);

  async function getCars() {
    try {
      setLoading(true);
      if (!user?.id) throw new Error("User not found");

      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("user_id", user?.id);

      if (error) {
        throw error;
      }

      if (data) {
        setCars(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function deleteCar(carId: string) {
    try {
      const { error } = await supabase.from("cars").delete().eq("id", carId);

      if (error) {
        throw error;
      }

      setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  return (
    <Container>
      <ContainerHeader>
        <Text style={[styles.header, { color: theme.text }]}>Your Cars</Text>
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
        data={cars}
        keyExtractor={(car) => car.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.carItem,
              { backgroundColor: theme.cityCardBackground },
            ]}
          >
            <Text style={[styles.carText, { color: theme.text }]}>
              {item.model} ({item.year})
            </Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteCar(item.id)}
            >
              <AntDesign name="delete" size={24} />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={[styles.noCarsText, { color: theme.text }]}>
            No cars added yet.
          </Text>
        }
        refreshing={loading}
        onRefresh={getCars}
      />

      <Button onPress={() => router.push("/add-cars")} title="Add New Car" />
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
  carItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  carText: {
    fontSize: 16,
    fontFamily: "PoppinsRegular",
  },
  deleteButton: {
    marginLeft: 12,
  },
  noCarsText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    fontFamily: "PoppinsRegular",
  },
  addCarButton: {
    paddingVertical: 12,
    marginTop: 20,
    alignItems: "center",
    borderRadius: 8,
  },
  addCarText: {
    fontSize: 16,
    fontFamily: "PoppinsBold",
  },
});
