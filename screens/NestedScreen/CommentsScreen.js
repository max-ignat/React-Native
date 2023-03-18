import React from "react";
import { Text, View, StyleSheet } from "react-native";
const CommentsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>CommentsScreen LOLOLO</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0ffff",

    alignItems: "center",
    justifyContent: "center",
  },
});
export default CommentsScreen;
