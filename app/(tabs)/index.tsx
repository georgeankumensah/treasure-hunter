import {
  Image,
  StyleSheet,
  Platform,
  Text,
  Alert,
  FlatList,
  View,
  TextInput,
  Animated,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Container } from "@/components/container";
import { useTheme } from "@/hooks/useTheme";
import { Link, Stack, useFocusEffect } from "expo-router";
import { ContainerHeader } from "@/components/container-header.tsx";
import getCurrentGreeting from "@/utils/lib/greetings";
import * as Location from "expo-location";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import fetchCities from "@/utils/lib/fetchCities";
import { cityNameFilter } from "@/utils/helpers/filterCities";
import BottomSheet from "@/components/bottom-sheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

export default function HomeScreen() {
  const theme = useTheme();
  const greetings = getCurrentGreeting();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [search, setSearch] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const country = useAuthStore((state) => state.country);
  const cities = useAuthStore((state) => state.cities);
  const bottomSheetContent = useRef<BottomSheetModal>(null);

  const scrollY = useRef(new Animated.Value(0)).current;
  const _scrollY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolateLeft: "clamp",
  });

  const headerTranslate = Animated.diffClamp(scrollY, 0, 100).interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
  });

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return Alert.alert("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.warn(location);
    }

    getCurrentLocation();
  }, [setLocation]);

  // callbacks
  const handlePresentModalPress = useCallback((item: string) => {
    setDestination(item);
    bottomSheetContent.current?.present();
  }, []);

  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log("handleSheetChanges", index);
  // }, []);
  const handleCloseSheet = useCallback(() => {
    bottomSheetContent.current?.dismiss();
  }, []);

  const renderCity = (item: string) => {
    return (
      <Pressable onPress={() => handlePresentModalPress(item)}>
        <View
          style={{
            padding: 10,
            // borderColor: theme.cityCardBorder,
            borderWidth: StyleSheet.hairlineWidth,
            borderRadius: 8,

            height: 60,
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 5,
            backgroundColor: theme.cityCardBackground,
          }}
        >
          <Text
            style={{
              fontFamily: "PoppinsRegular",
              color: theme.text,

              fontSize: 20,
            }}
          >
            {item}
          </Text>
        </View>
      </Pressable>
    );
  };

  const getLocationData = async () => {
    if (location) {
      const { coords } = location;
      const { latitude, longitude } = coords;
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      console.warn(reverseGeocode);

      const { city, country } = reverseGeocode[0];
      useAuthStore.setState({ location: city });
      useAuthStore.setState({ country });
    }
  };

  useEffect(() => {
    getLocationData();
    if (country) fetchCities(country);
  }, [location]);

  useFocusEffect(
    useCallback(() => {
      if (country) fetchCities(country);
      getLocationData();
    }, [location, country])
  );

  const filteredCities = useMemo(() => {
    if (!search) return cities;
    return cities.filter(cityNameFilter(search));
  }, [search]);

  return (
    <Container>
      <ContainerHeader>
        <Text
          style={{
            fontFamily: "PoppinsSemiBold",
            fontSize: 24,
            color: theme.text,
            marginTop: 40,
          }}
        >
          {greetings}
        </Text>
      </ContainerHeader>
      <KeyboardAvoidingView behavior="padding">
        <Text
          style={{
            fontFamily: "PoppinsSemiBold",
            fontSize: 40,
            color: theme.text,
          }}
        >
          Where are you planning your
          <Text
            style={{
              color: theme.primary,
            }}
          >
            {"\nnext trip?"}
          </Text>
        </Text>
        {/* searchbar  */}
        {/* <SearchBar /> */}

        <TextInput
          placeholder="Search City"
          value={search}
          placeholderTextColor={"gray"}
          style={{
            fontFamily: "PoppinsRegular",
            fontSize: 16,
            borderRadius: 10,
            height: 50,
            paddingHorizontal: 8,
            color: theme.text,
            flexDirection: "row",
            alignItems: "center",

            borderWidth: StyleSheet.hairlineWidth,
            borderColor: "gray",
          }}
          onChangeText={setSearch}
        />
      </KeyboardAvoidingView>
      <View
        style={{
          height: 20,
        }}
      />
      <FlatList
        data={filteredCities}
        contentContainerStyle={{
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
        }}
        renderItem={({ item }) => renderCity(item)}
        keyExtractor={(item) => item}
      />
      <BottomSheet
        ref={bottomSheetContent}
        onChange={function (index: number): void {
          console.log("change");
        }}
      >
        <Text
          style={{
            fontFamily: "PoppinsSemiBold",
            fontSize: 30,
            color: theme.text,
          }}
        >
          Trip to {destination}
        </Text>

        <View
          style={{
            height: 30,
          }}
        />
        <Link href={"/create-trip"} asChild>
          <Pressable
            onPress={handleCloseSheet}
            style={{
              height: 80,
              borderWidth: 2,
              borderRadius: 10,
              borderColor: theme.primary,
              width: "100%",
              maxWidth: 300,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "PoppinsSemiBold",
                fontSize: 20,
                color: theme.primary,
              }}
            >
              Create Trip
            </Text>
          </Pressable>
        </Link>
        <View
          style={{
            height: 30,
          }}
        />
        <Link href={"/trip-to-city"} asChild>
          <Pressable
            onPress={handleCloseSheet}
            style={{
              height: 80,
              borderWidth: 2,
              borderRadius: 10,
              borderColor: theme.primary,
              width: "100%",
              maxWidth: 300,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "PoppinsSemiBold",
                fontSize: 20,
                color: theme.primary,
              }}
            >
              Join Trip
            </Text>
          </Pressable>
        </Link>
      </BottomSheet>
    </Container>
  );
}

const styles = StyleSheet.create({});
