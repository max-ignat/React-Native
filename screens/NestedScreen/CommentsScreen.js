import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  FlatList,
  Image,Alert,
  KeyboardAvoidingView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";

import { collection, addDoc, doc, onSnapshot, deleteDoc } from "firebase/firestore";
// import { hide } from "expo-splash-screen";


const CommentsScreen = ({ route }) => {
  const { postId, uri } = route.params;
  const { name } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const submitComment = async () => {
 if (comment.trim() === "") {
   return; // Нельзя отправлять пустой комментарий
 }

    await addDoc(collection(doc(collection(db, "posts"), postId), "comments"), {
      comment,
      name,
    });

    setComment("");
    hideKeyboard();
  };

  const getAllComments = async () => {
    await onSnapshot(
      collection(doc(collection(db, "posts"), postId), "comments"),
      (data) => {
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    );
  };

  const deleteComment = async (commentId) => {
    await deleteDoc(
      doc(collection(db, "posts"), postId, "comments", commentId)
    );
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const hideKeyboard = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <SafeAreaView style={styles.container}>
        <Image style={styles.photo} source={{ uri }} />
        <FlatList
          data={allComments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (            
console.log('item', item),

            <TouchableOpacity
              style={[
                styles.commentContainer,
                item.name === name
                  ? { backgroundColor: "rgba(0, 0, 225, 0.1)" }
                  : { backgroundColor: "rgba(0, 225, 0, 0.1)" },
              ]}
              onLongPress={() => Alert.alert(
                "Удалить пост",
                "Вы уверены, что хотите удалить этот комментарий?",
                [
                  { text: "Отмена", style: "cancel" },
                  { text: "Удалить", onPress: () => deleteComment(item.id) },
                ],
                { cancelable: false }
              )}
            >
              <Text style={styles.textNickName}>{item.name}: </Text>
              <Text style={styles.textComment}>{item.comment}</Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles.commentFieldContainer}>
          <TextInput
            style={styles.input}
            placeholder={"Comment..."}
            value={comment}
            onFocus={() => setIsShowKeyboard(true)}
            onChangeText={(value) => setComment(value)}
          />
          <TouchableOpacity style={styles.submitBtn} onPress={submitComment}>
            <FontAwesome name="send" size={24} color="grey" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#fff",
  },
  photo: {
    minWidth: 350,
    minHeight: 240,
    borderRadius: 8,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 8,
  },
  commentContainer: {
    width: "97%",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 10,
    marginBottom: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  commentFieldContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 8,
    height: 50,
    backgroundColor: "#F6F6F6",
    border: 1,
    borderColor: "#E8E8E8",
    borderRadius: 9,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  input: {},
  submitBtn: {
    justifyContent: "center",
    width: 34,
    height: 34,
    borderRadius: 50,
  },
  textNickName: {
    fontSize: 17,
    fontWeight: "bold",
  },
  textComment: {
    fontSize: 16,
    width: 285,
    textAlign: "justify",
  },
});

export default CommentsScreen;