import Button from "@/components/button";
import { Container } from "@/components/container";
import { ContainerHeader } from "@/components/container-header.tsx";
import TextInput from "@/components/text-input";
import { useTheme } from "@/hooks/useTheme";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useFocusEffect } from "expo-router";
import * as FileSystem from "expo-file-system";

type Media = {
  name: string;
  // type: string;
  uri: string;
};

export default function Selfie() {
  const theme = useTheme();
  const [idNumber, setIdNumber] = React.useState("");

  useEffect(() => {
    loadFiles();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFiles();
    }, [])
  );

  const [images, setImages] = useState<Media[]>([]);

  const loadFiles = async () => {
    if (!FileSystem.documentDirectory) {
      console.warn("Document directory is not available");
      return;
    }

    const files = await FileSystem.readDirectoryAsync(
      FileSystem.documentDirectory
    );
    console.warn(files);
    setImages(
      files.map((name) => ({
        name,
        uri: FileSystem.documentDirectory + name,
      }))
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
        Upload Selfie
      </Text>
      <View style={[{ height: 10 }]} />
      <Link href={"/upload-selfie"} asChild>
        <Pressable
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: theme.tint,
            borderRadius: 10,
            height: 178,
          }}
        >
          <Text
            style={{
              fontFamily: "PoppinsRegular",
              fontSize: 16,
              color: theme.text,
            }}
          >
            Selfie
          </Text>
          <Text
            style={{
              fontFamily: "PoppinsRegular",
              fontSize: 16,
              color: theme.text,
              textDecorationLine: "underline",
            }}
          >
            Tap to upload
          </Text>
        </Pressable>
      </Link>

      <View style={[{ marginTop: "auto" }]}>
        <Link href={"/verify-done"} asChild>
          <Button title="Continue" />
        </Link>
      </View>
    </Container>
  );
}
