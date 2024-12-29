import Button from "@/components/button";
import { Container } from "@/components/container";
import { ContainerHeader } from "@/components/container-header.tsx";
import { useTheme } from "@/hooks/useTheme";
import { Link } from "expo-router";
import React from "react";
import { View, Text, Pressable } from "react-native";

export default function VerifyID() {
  const theme = useTheme();
  return (
    <Container>
      <ContainerHeader>
        <Link
          href={"/"}
          style={{
            fontFamily: "PoppinsSemiBold",
            textDecorationLine: "underline",
            textDecorationColor: theme.primary,
            color: theme.primary,
            fontSize: 16,
            textDecorationStyle: "solid",
            marginLeft: "auto",
          }}
        >
          Skip
        </Link>
      </ContainerHeader>

      <Text
        style={{
          fontFamily: "PoppinsSemiBold",
          fontSize: 40,
          color: theme.text,
        }}
      >
        Verify your identity
      </Text>
      <Text
        style={{
          fontFamily: "PoppinsRegular",
          fontSize: 16,
          color: theme.text,
        }}
      >
        Complete the identification process so we can verify your account.
      </Text>
      <View style={[{ marginTop: "auto" }]}>
        <Link href={"/select-id-type"} asChild>
          <Button title="Verify Account" />
        </Link>
      </View>
    </Container>
  );
}
