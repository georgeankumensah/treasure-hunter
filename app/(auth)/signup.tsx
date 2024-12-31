import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { supabase } from "@/utils/lib/supabase";
import Button from "@/components/button";
import { Link, router, Stack } from "expo-router";
import googleLogo from "@/assets/images/google-logo.png";
import TextInput from "@/components/text-input";
import { signInWithGoogle } from "@/utils/lib/oauth";
import { useTheme } from "@/hooks/useTheme";
import { useNotifications } from "react-native-notificated";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const { notify } = useNotifications();

  const notificationMetadata = () =>
    notify("success", {
      params: {
        title: "Hello",
        description: "Wow, that was easy",
      },
    });

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
    router.push("/(tabs)");
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView>
          <View
            style={{
              paddingHorizontal: 20,
            }}
          >
            <Stack.Screen options={{ headerShown: false }} />
            <View style={[styles.verticallySpaced]}>
              <Text
                style={{
                  fontFamily: "PoppinsSemiBold",
                  fontSize: 40,
                  color: theme.text,
                  marginTop: 80,
                }}
              >
                {"Create an  \naccount"}
              </Text>
              <Text
                style={{
                  fontFamily: "PoppinsRegular",
                  fontSize: 16,
                  color: theme.text,
                }}
              >
                Already have an account?
                <Link
                  href={"/login"}
                  style={{
                    fontFamily: "PoppinsSemiBold",
                    textDecorationLine: "underline",
                    textDecorationStyle: "solid",
                    color: theme.primary,
                    textDecorationColor: theme.primary,
                  }}
                >
                  Login
                </Link>
              </Text>
              <View
                style={{
                  marginTop: 20,
                  gap: 8,
                }}
              >
                <TextInput
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  placeholder="First Name"
                  autoCapitalize={"none"}
                  title="First Name"
                />
                <TextInput
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  placeholder="Last Name"
                  autoCapitalize={"none"}
                  title="Last Name"
                />
                <TextInput
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  placeholder="Date of Birth"
                  autoCapitalize={"none"}
                  title="Date of Birth"
                />
                <TextInput
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  keyboardType="email-address"
                  placeholder="email@address.com"
                  autoCapitalize={"none"}
                  title="Email Address"
                />
                <TextInput
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  secureTextEntry={true}
                  placeholder="Password"
                  autoCapitalize={"none"}
                  title="Password"
                />
              </View>
            </View>
            <View
              style={[
                styles.verticallySpaced,
                {
                  marginTop: 42,
                },
              ]}
            >
              <Button
                title="Sign up"
                disabled={loading}
                isLoading={loading}
                onPress={() => signUpWithEmail()}
              />
            </View>
            {/*     
      <View style={styles.separator}>
      <View style={styles.line} />
      <Text
      style={[
        styles.orText,
        {
            color: theme.text,
            },
            ]}
            >
            Or login with
            </Text>
            <View style={styles.line} />
            </View>
            <View style={styles.verticallySpaced}>
            <Button
            title="Sign In With Google"
            disabled={loading}
            icon={googleLogo}
            textColor="black"
            type="social"
          onPress={() => signInWithGoogle("google")}
        />
      </View> */}
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },

  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "gray",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    fontFamily: "PoppinsRegular",
  },
});

export default login;
