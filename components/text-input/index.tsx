import React, { useState, useRef } from "react";
import { theme } from "../../theme"; // Adjust the import path as necessary
import { View, TextInput, StyleSheet, Text, Animated } from "react-native";

import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";


function CusTextInput({
  title,
  secureTextEntry,
  value,
  onChangeText,
  placeholder,
  containerStyle={},
  ...otherProps
}) {
    
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
const labelStyle = {
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
    backgroundColor: "#FFFFFF", // Replace theme.backgroundColor with a specific value
    color: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [value !== "" ? "#A9A9A9" : "#000000", "#A9A9A9"], // Replace theme.Gray_color_dark and theme.textColor with specific values
    }),
    paddingHorizontal: 6,
};

  return (
    <View style={[{
        borderColor:  theme.Gray_color,
        borderWidth: 1,
        height: 54,
        borderRadius: 10,
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: 12,
        paddingTop:12,
        paddingBottom: 12,
        marginTop: 15,
        alignItems: "center",
      }, containerStyle]}>
      {title && <Animated.Text style={[theme.text,styles.labelStyle, labelStyle]}>{title}</Animated.Text>}
      <TextInput
        style={[{color:theme.textColor}, styles.textField]}
        {...otherProps}
        value={value}
        placeholder={isFocused ? placeholder : ""}
        placeholderTextColor={theme.Gray_color}

        secureTextEntry = {title == "Password" && show}
        onFocus={handleFocus}
        onBlur={handleBlur}
        blurOnSubmit
        onChangeText={onChangeText}
      />
      {((title == "Password" || title == "Confirm Password") && !show && (
        <Entypo
          name="eye"
          size={24}
          color={theme.placeholder}
          onPress={() => setShow(true)}
        />
      )) ||
        ((title == "Password" || title == "Confirm Password") && show && (
          <Entypo
            name="eye-with-line"
            size={24}
            color={theme.placeholder}
            onPress={() => setShow(false)}
          />
        ))}
      {title == "Email" && value.match(/\S+@\S+\.\S+/) && (
        <AntDesign
          name="checkcircle"
          size={16}
          color={theme.primary}
        />
      )}
      {title == "Email"&& value.length > 0 && !value.match(/\S+@\S+\.\S+/) && (
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
    fontFamily:"regular",
    fontWeight:"400",
    fontSize:defaultStyles.fontSizes.small,
  },
  labelStyle:{
    fontFamily:"regular",
    fontWeight:"400",
    fontSize:defaultStyles.fontSizes.small,
  }
});

export default CusTextInput;