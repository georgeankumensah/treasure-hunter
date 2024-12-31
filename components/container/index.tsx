import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  }
});
