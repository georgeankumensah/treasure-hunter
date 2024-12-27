import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
} from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  icon?: ImageSourcePropType;
  color?: string;
  textColor?: string;
  iconPosition?: "left" | "right";
  disabled?: boolean;
}

export default function Button({
  title,
  onPress,
  icon,
  iconPosition = "left",
  color = "#FF5A5F",
  disabled = false,
  textColor = "white",
}: ButtonProps) {
  return (
    <Pressable
      style={[styles.button, { backgroundColor: disabled ? "gray" : color }]}
      onPress={onPress}
    >
      {icon && iconPosition === "left" && (
        <Image source={icon} style={styles.icon} />
      )}
      <Text style={[styles.buttonText,{color:textColor}]}>{title}</Text>
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
