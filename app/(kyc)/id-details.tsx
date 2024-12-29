import Button from "@/components/button";
import { Container } from "@/components/container";
import { ContainerHeader } from "@/components/container-header.tsx";
import TextInput from "@/components/text-input";
import { useTheme } from "@/hooks/useTheme";
import { Link } from "expo-router";
import React from "react";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";

export default function IdDetails() {
  const theme = useTheme();
  const [idNumber, setIdNumber] = React.useState("");

  return (
    <Container>
      <ContainerHeader>
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

      <Text
        style={{
          fontFamily: "PoppinsRegular",
          fontSize: 16,
          color: theme.text,
        }}
      >
        Identity Verification
      </Text>
      <Text
        style={{
          fontFamily: "PoppinsSemiBold",
          fontSize: 40,
          color: theme.text,
        }}
      >
        Provide your ID and Country
      </Text>
      <TextInput
        onChangeText={(text) => setIdNumber(text)}
        value={idNumber}
        placeholder="ID Number"
        autoCapitalize={"none"}
        title="ID Number"
      />

      <View style={[{ marginTop: "auto" }]}>
        <Link href={"/upload-id"} asChild>
          <Button title="Continue" />
        </Link>
      </View>
    </Container>
  );
}
