import { useTheme } from "@/hooks/useTheme";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, View } from "react-native";
import {
  InputToolbar,
  Actions,
  Composer,
  Send,
} from "react-native-gifted-chat";

export const renderInputToolbar = (props: any) => {
  const theme = useTheme();

  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: theme.background,
        paddingVertical: 12,
        paddingHorizontal: 12,
        paddingBottom: 10,
        borderWidth: 0,
        borderColor: "transparent",
      }}
      primaryStyle={{ alignItems: "center" }}
    />
  );
};
export const renderActions = (props: any) => {
  const theme = useTheme();
  return (
    <Actions
      {...props}
      containerStyle={{
        width: 24,
        height: 24,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
      }}
      icon={() => <MaterialIcons name="add" size={26} color={theme.text} />}
      options={{
        "Choose From Library": () => {
          console.log("Choose From Library");
        },
        Cancel: () => {
          console.log("Cancel");
        },
      }}
      optionTintColor="#222B45"
    />
  );
};

export const renderComposer = (props: any) => {
  const theme = useTheme();
  return (
    <Composer
      {...props}
      textInputStyle={{
        color: theme.text,
        backgroundColor: theme.background,
        borderRadius: 4,
        paddingHorizontal: 12,
        marginLeft: 0,
        marginRight: 0,
      }}
      containerStyle={{}}
      placeholder="Message"
      placeholderTextColor={theme.text}
    />
  );
};
export const renderSend = (props: any) => {
  const theme = useTheme();
  return (
    <Send
      {...props}
      disabled={false}
      containerStyle={{
        width: 26,
        height: 26,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 4,
        marginLeft: 20,
      }}
    >
      <View>
        <MaterialIcons name="send" size={26} color={theme.text} />
      </View>
    </Send>
  );
};
