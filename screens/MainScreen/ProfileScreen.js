import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { authSignOut } from "../../redux/auth/authOperations";

const ProfileScreen = () => {
const dispatch = useDispatch();
  const exit = () => {
    dispatch(authSignOut());

  }
  return (
    <View style={styles.container}>
      <Text>ProfileScreen </Text>
      <Button title="exit" onPress={exit} />
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
export default ProfileScreen