import React, { useState } from "react";
import { useEffect } from "react";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const PostScreen = ({ route }) => {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPost((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10, marginTop: 35 }}>
            <Image
              source={{ uri: item.photoCard }}
              style={{ height: 300, width: 350, borderRadius: 5 }}
            />
          </View>
        )}
      />
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
export default PostScreen;
