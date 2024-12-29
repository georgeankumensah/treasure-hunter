import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  Image,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  CameraCapturedPicture,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { Link, router, Stack } from "expo-router";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { ContainerHeader } from "@/components/container-header.tsx";
import { useTheme } from "@/hooks/useTheme";
import documentMask from "@/assets/images/document-mask.png";
import { Container } from "@/components/container";
import Button from "@/components/button";

const uploadIDFront = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [picture, setPicture] = useState<CameraCapturedPicture>();
  const camera = useRef<CameraView>(null);
  const theme = useTheme();

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  const toggleCamera = () => {
    setFacing((current) => (current == "back" ? "front" : "back"));
  };

  const takePicture = async () => {
    const res = await camera.current?.takePictureAsync();
    console.warn(res);
    setPicture(res);
  };

  const saveFile = async (uri: string) => {
    const fileName = uri.split("/").pop();
    const documentDirectory = FileSystem.documentDirectory;

    if (!documentDirectory) {
      console.error("Document directory is not available");
      return;
    }

    await FileSystem.copyAsync({
      from: uri,
      to: documentDirectory + fileName,
    });
    setPicture(undefined);
    router.back();
    console.warn("saved");
  };

  if (!permission?.granted) {
    return <ActivityIndicator />;
  }

  if (picture) {
    return (
      <Container>
        <ContainerHeader>
          <Pressable onPress={() => setPicture(undefined)}>
            <Text
              style={{
                fontFamily: "PoppinsSemiBold",
                textDecorationLine: "underline",
                textDecorationColor: theme.primary,
                color: theme.primary,
                fontSize: 16,
                textDecorationStyle: "solid",
              }}
            >
              Retake
            </Text>
          </Pressable>
        </ContainerHeader>
        <Image
          source={{
            uri: picture.uri,
          }}
          style={{
            flex: 1,
            borderRadius: 10,
            resizeMode: "contain",
          }}
        />
        <SafeAreaView>
          <Button
            title="Use This Picture"
            onPress={() => saveFile(picture.uri)}
          />
        </SafeAreaView>
      </Container>
    );
  }
  return (
    <Container>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ContainerHeader>
        <AntDesign
          name="close"
          size={30}
          color="white"
          onPress={() => router.back()}
        />
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
        Upload Document Front
      </Text>
      <View style={{ height: 10 }} />
      <CameraView
        ref={camera}
        facing={facing}
        style={{
          width: "100%",
          height: 350,
          borderRadius: 10,
          backgroundColor: "red",
        }}
      ></CameraView>
      <View
        style={{
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: theme.tint,
          padding: 6,
          borderRadius: 6,
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "PoppinsRegular",
            fontSize: 12,
            color: theme.tint,
          }}
        >
          All documents sumitted must be visible and clear from any glare or
          reflections.
        </Text>
      </View>
      <View
        style={{
          marginTop: "auto",
          padding: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#00000099",
          paddingBottom: 50,
        }}
      >
        <View />
        <Pressable
          onPress={takePicture}
          style={{
            backgroundColor: "white",
            height: 80,
            aspectRatio: 1,
            borderRadius: 50,
          }}
        />
        <MaterialIcons
          onPress={toggleCamera}
          name="flip-camera-ios"
          size={24}
          color="white"
        />
      </View>
    </Container>
  );
};

export default uploadIDFront;
