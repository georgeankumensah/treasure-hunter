import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";

export const ContainerHeader = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 105,
    width: "100%",
    // backgroundColor:"red",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
