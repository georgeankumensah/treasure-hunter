import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

export default function PageTitle(props: any) {
  return (
    <ThemedView style={styles.pageTitle}>
      <TouchableOpacity
        onPress={props.onPress}
        style={{
          marginRight: 20,
        }}
      >
        <ThemedText>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            color={"currentColor"}
          />
        </ThemedText>
      </TouchableOpacity>
      {props.title && <ThemedText>{props.title}</ThemedText>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    marginHorizontal: 22,
    marginVertical: 22,
    flexDirection: "row",
    alignItems: "center",
  },
});
