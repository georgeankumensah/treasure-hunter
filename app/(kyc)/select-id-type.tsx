import Button from "@/components/button";
import { Container } from "@/components/container";
import { ContainerHeader } from "@/components/container-header.tsx";
import { useTheme } from "@/hooks/useTheme";
import { Link } from "expo-router";
import React from "react";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";

export default function SelectIdType() {
  const theme = useTheme();

  const [selectedIdType, setSelectedIdType] = React.useState("");

  const idTypes = [
    "National ID",
    "Passport",
    "Driver's License",
    "Voter's Card",
  ];

  const handleSelectIdType = (idType: string) => {
    setSelectedIdType(idType);
  };

  const renderIdType = (idType: string) => {
    return (
      <Pressable
        onPress={() => handleSelectIdType(idType)}
        style={[
          {
            backgroundColor:
              selectedIdType === idType ? theme.primary : "transparent",
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: theme.primary,
            borderRadius: 5,
            width: "100%",
            maxWidth: 352,
            height: 56,
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <Text
          style={{
            color: selectedIdType === idType ? "white" : theme.text,
            fontFamily:
              selectedIdType === idType ? "PoppinsBold" : "PoppinsRegular",
            textAlign: "center",
          }}
        >
          {idType}
        </Text>
      </Pressable>
    );
  };

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
        Choose an ID type
      </Text>

      <FlatList
        data={idTypes}
        contentContainerStyle={{
          marginTop: 20,
          marginBottom: 20,
          gap: 15,
        }}
        renderItem={({ item }) => renderIdType(item)}
        keyExtractor={(item) => item}
      />
      <Text
        style={{
          fontFamily: "PoppinsRegular",
          fontSize: 16,
          color: theme.text,
        }}
      >
        {selectedIdType}
      </Text>
      <View style={[{ marginTop: "auto" }]}>
        <Link href={"/id-details"} asChild>
          <Button title="Continue" disabled={selectedIdType == ""} />
        </Link>
      </View>
    </Container>
  );
}
