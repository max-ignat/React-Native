import React, { useState } from "react";
import { useEffect } from "react";
import { View, StyleSheet, FlatList, Image, Button , TouchableOpacity } from "react-native";
import { Foundation, FontAwesome5 } from "@expo/vector-icons";
const FirstScreen = ({ route, navigation }) => {
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
          <View style={{ marginBottom: 10, marginTop: 5 }}>
            <Image
              source={{ uri: item.photoCard }}
              style={{ height: 300, width: 350, borderRadius: 5 }}
            />
          </View>
        )}
      />
      <View
        style={{
          // flex: 1,
          flexDirection: "row",
          // justifyContent: "center",
          // marginTop: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("MapScreen")}>
          <Foundation name="map" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginLeft: 20 }}
          onPress={() => navigation.navigate("CommentsScreen")}
        >
          <FontAwesome5 name="comment-dots" size={24} color="black" />
        </TouchableOpacity>
      </View>
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
export default FirstScreen;
