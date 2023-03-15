import React from "react";
import { Text, View, StyleSheet } from "react-native";
const ContactsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ContactsScreen</Text>
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
export default ContactsScreen;
