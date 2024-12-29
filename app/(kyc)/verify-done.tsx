import { useRef, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";
import success from "@/assets/animations/success.json";
import { Container } from "@/components/container";
import { Link, Stack } from "expo-router";
import { ContainerHeader } from "@/components/container-header.tsx";
import Button from "@/components/button";
import { useTheme } from "@/hooks/useTheme";

export default function App() {
  const animation = useRef<LottieView>(null);
  const theme = useTheme();
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);

  return (
    <Container>
      <Stack.Screen options={{ headerShown: false }} />
      <ContainerHeader>
        <View
          style={{
            height: 50,
          }}
        />
      </ContainerHeader>
      <LottieView
        autoPlay
        loop={false}
        ref={animation}
        style={{
          aspectRatio: 1,
          width: "100%",
          //   height: 300,
          backgroundColor: "transparent",
        }}
        source={success}
      />

      <Text
        style={{
          fontFamily: "PoppinsSemiBold",
          fontSize: 40,
          color: theme.text,
          textAlign: "center",
        }}
      >
        Verification Complete
      </Text>
      {/* <Text
        style={{
          fontFamily: "PoppinsRegular",
          fontSize: 16,
          color: theme.text,
        }}
      >
        Identity Verification
      </Text> */}
      <View style={[{ marginTop: "auto" }]}>
        <Link href={"/(tabs)"} asChild>
          <Button title="Continue" />
        </Link>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
