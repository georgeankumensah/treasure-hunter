import React, { useState } from "react";
import { Alert, StyleSheet, View, AppState, Text } from "react-native";
import { supabase } from "@/utils/lib/supabase";
import Button from "@/components/button";
import { Stack } from "expo-router";
import googleLogo from "@/assets/images/google-logo.png";
import TextInput from "@/components/text-input";
import { signInWithGoogle } from "@/utils/lib/oauth";

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

const auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

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
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text
          style={{
            fontFamily: "PoppinsSemiBold",
            fontSize: 40,
          }}
        >
          {"Login to your \naccount"}
        </Text>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
          placeholder="email@address.com"
          autoCapitalize={"none"}
          title="Email Address"
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
          title="Password"
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title="Sign in"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>
      <View style={styles.separator}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or login with</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title="Sign In With Google"
          disabled={loading}
          icon={googleLogo}
          color="rgba(125, 110, 96, 0.17)"
          textColor="black"
          onPress={() => signInWithGoogle('google')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    padding: 12,
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

export default auth;
