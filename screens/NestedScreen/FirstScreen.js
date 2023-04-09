import React, { useState } from "react";
import { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { Foundation, FontAwesome5 } from "@expo/vector-icons";
import { db } from "../../firebase/config";
import "firebase/firestore";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
const FirstScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllPosts = async () => {
    onSnapshot(collection(db, "posts"), (data) => {
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const deletePost = async (postId) => {
    await deleteDoc(doc(db, "posts", postId));
  };

  const handleDeletePost = (postId) => {
    Alert.alert("Удалить пост", "Вы действительно хотите удалить этот пост?", [
      {
        text: "Отмена",
        style: "cancel",
      },
      {
        text: "Удалить",
        onPress: () => deletePost(postId),
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onLongPress={() => {
              Alert.alert(
                "Удалить пост",
                "Вы уверены, что хотите удалить этот пост?",
                [
                  { text: "Отмена", style: "cancel" },
                  { text: "Удалить", onPress: () => deletePost(item.id) },
                ],
                { cancelable: false }
              );
            }}
          >
            <View style={{ marginBottom: 10, marginTop: 5, borderWidth: 0 }}>
              <Image
                source={{ uri: item.photoURL }}
                style={{ height: 300, width: 350, borderRadius: 5 }}
              />
              <Text style={{ position: "absolute", top: 312, left: 10 }}>
                {item.message}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 10,
                  marginBottom: 20,
                  paddingBottom: 5,
                }}
              >
                <TouchableOpacity
                  style={{ position: "absolute", left: 270 }}
                  onPress={() =>
                    navigation.navigate("MapScreen", {
                      location: item.location,
                      locationName: item.locationName,
                    })
                  }
                >
                  <Foundation name="map" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ left: 310, position: "absolute" }}
                  onPress={() =>
                    navigation.navigate("CommentsScreen", {
                      postId: item.id,
                      comment: item.comment,
                      uri: item.photoURL,
                    })
                  }
                >
                  <FontAwesome5 name="comment-dots" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
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
export default FirstScreen;
