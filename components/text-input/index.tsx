import React, { useState, useRef } from "react";
import {
  View,
  TextInput as NativeTextInput,
  StyleSheet,
  Text,
  Animated,
  TextStyle,
} from "react-native";

import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

type TextInputProps = {
  title?: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  containerStyle?: object;
} & React.ComponentProps<typeof NativeTextInput>;

function TextInput({
  title,
  secureTextEntry,
  value,
  onChangeText,
  placeholder,

  containerStyle = {
    maxWidth: 364,
  },
  ...otherProps
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [show, setShow] = useState(true);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  const handleBlur = () => {
    value?.length > 0 ? setIsFocused(true) : setIsFocused(false);
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  const labelStyle: Animated.WithAnimatedObject<TextStyle> = {
    position: "absolute",
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [value !== "" ? -10 : 16, -10],
    }),
    left: 10,
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [value !== "" ? 14 : 16, 14],
    }),
    backgroundColor: !isFocused ? "transparent" : "white", // Replace theme.backgroundColor with a specific value
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [value !== "" ? "#A9A9A9" : "#000000", "#A9A9A9"], // Replace theme.Gray_color_dark and theme.textColor with specific values
    }),
    paddingHorizontal: 6,
  };

  return (
    <View
      style={[
        {
          borderColor: "gray",
          borderWidth: 1,
          height: 54,
          borderRadius: 10,
          flexDirection: "row",
          width: "100%",
          paddingHorizontal: 12,
         

          marginTop: 15,
          alignItems: "center",
        },
        containerStyle,
      ]}
    >
      {title && (
        <Animated.Text
          style={[{ color: "black" }, styles.labelStyle, labelStyle]}
        >
          {title}
        </Animated.Text>
      )}
      <NativeTextInput
        style={[{ color: "black" }, styles.textField]}
        {...otherProps}
        value={value}
        placeholder={isFocused ? placeholder : ""}
        placeholderTextColor={"gray"}
        secureTextEntry={title == "Password" && show}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={onChangeText}
      />
      {((title == "Password" || title == "Confirm Password") && !show && (
        <Entypo
          name="eye"
          size={24}
          color={"gray"}
          onPress={() => setShow(true)}
        />
      )) ||
        ((title == "Password" || title == "Confirm Password") && show && (
          <Entypo
            name="eye-with-line"
            size={24}
            color={"gray"}
            onPress={() => setShow(false)}
          />
        ))}
      {otherProps.keyboardType == "email-address" &&
        value.match(/\S+@\S+\.\S+/) && (
          <AntDesign name="checkcircle" size={16} color={"#00FF00"} />
        )}
      {otherProps.keyboardType == "email-address" &&
        value.length > 0 &&
        !value.match(/\S+@\S+\.\S+/) && (
          <Ionicons name="alert-circle" size={19} color="#FF7000" />
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
  textField: {
    flex: 1,
    fontFamily: "regular",
    fontWeight: "400",
    fontSize: 14,
  },
  labelStyle: {
    fontFamily: "regular",
    fontWeight: "400",
    fontSize: 14,
  },
});

export default TextInput;
