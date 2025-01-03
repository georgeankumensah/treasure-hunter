import { useTheme } from "@/hooks/useTheme";
import { isLoading } from "expo-font";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  ActivityIndicator,
} from "react-native";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  icon?: string & ImageSourcePropType;
  color?: string;
  textColor?: string;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  isLoading?: boolean;
  type?: "social" | "default";
} & React.ComponentProps<typeof Pressable>;
export default function Button({
  title,
  onPress,
  icon,
  iconPosition = "left",
  color,
  disabled = false,
  textColor = "white",
  isLoading = false,
  type = "default",
}: ButtonProps) {
  const theme = useTheme();
  if (isLoading) {
    return (
      <Pressable
        style={[
          styles.button,
          {
            backgroundColor: disabled
              ? "gray"
              : type == "social"
              ? theme.socialMediaButtonColor
              : theme.primary,
          },
        ]}
        disabled
      >
        {isLoading && <ActivityIndicator color="white" />}
      </Pressable>
    );
  }
  return (
    <Pressable
      style={[
        styles.button,
        {
          backgroundColor: disabled
            ? "gray"
            : type == "social"
            ? theme.socialMediaButtonColor
            : theme.primary,
        },
      ]}
      onPress={onPress}
    >
      {icon && iconPosition === "left" && (
        <Image source={icon} style={styles.icon} />
      )}
      <Text
        style={[
          styles.buttonText,
          {
            color:
              type === "social" ? theme.socialMediaButtonTextColor : textColor,
          },
        ]}
      >
        {title}
      </Text>
      {icon && iconPosition === "right" && (
        <Image source={icon} style={styles.icon} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    height: 56,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  buttonText: {
    color: "white",
    fontFamily: "PoppinsSemiBold",
    fontSize: 16,
    textAlign: "center",
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
});
