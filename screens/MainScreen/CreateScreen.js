import React from "react";
import * as Location from "expo-location";
import { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import { app , db, storage } from '../../firebase/config'
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadBytes,
} from "firebase/storage";



const CreateScreen = ({ navigation }) => {
  const [photoCard, setPhotoCard] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [startCamera, setStartCamera] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  function toggleCameraType() {
    console.log("FLIP");
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePhoto = async () => {
    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    const photo = await cameraRef.current.takePictureAsync();
    setPhotoCard(photo.uri);
    console.log("photo :>> ", photo.uri);
    // console.log("latitude >", location.coords.latitude);
    // console.log("altitude >", location.coords.altitude);
  };

  const _startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Access denied!");
    }
  };

  function publish() {
    console.log("PUBLISHED");
    uploadPhotoToServer(console.log("done"));
    navigation.navigate("FirstScreen", { photoCard });
    setPhotoCard(null);
    setStartCamera(null)
  }
   const uploadPhotoToServer = async () => {
     if (!photoCard) return;

     try {
       // setLoading(true);
       const response = await fetch(photoCard);
       const blobFile = await response.blob();
       const id = Date.now();

       const reference = ref(storage, `images/${id}`);
       const result = await uploadBytesResumable(reference, blobFile);
       console.log("RESULTTTTT", result.metadata)

     } catch (err) {
       // setLoading(false);
       console.log(err.message);
       Alert.alert("Try again \n", err.message);
     }
   };
// const uploadPostToServer = async () => {
//   await uploadPhotoToServer();
//   const createPost = await addDoc(collection(db, "posts"), {
//     photoURL,
//     location,
//     comment,
//     locationName,
//     userId,
//     nickName,
//   });
// };

  return (
    <View style={styles.container}>
      {startCamera ? (
        <>
          <Camera
            style={[styles.camera, { aspectRatio: 9 / 16 }]}
            type={type}
            autoFocus={Camera.Constants.AutoFocus.on}
            flashMode={Camera.Constants.FlashMode.off}
            zoom={0}
            ref={cameraRef}
          >
            <View>
              {photoCard && (
                <View style={styles.takePhotoContainer}>
                  <Image
                    source={{ uri: photoCard }}
                    style={{ height: 200, width: 200, borderRadius: 10 }}
                  />
                </View>
              )}
              <TouchableOpacity style={styles.takePhotoBtn} onPress={takePhoto}>
                <Ionicons
                  name="md-camera-outline"
                  size={40}
                  color="transparent"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.flipBtn}
                onPress={toggleCameraType}
              >
                <MaterialIcons name="flip-camera-ios" size={40} color="white" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.publishBtn}>
                <MaterialIcons
                  name="publish"
                  size={40}
                  color="white"
                  onPress={publish}
                />
              </TouchableOpacity>
            </View>
          </Camera>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: "azure",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={_startCamera}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: "#14274e",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: 40,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Take picture
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0ffff",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    marginTop: 50,

    flexDirection: "row",
  },
  takePhotoBtn: {
    width: 50,
    borderWidth: 4,
    borderRadius: 25,
    borderColor: "white",
    marginLeft: 150,
    marginTop: 550,
    alignItems: "center",
    justifyContent: "center",
  },

  flipBtn: {
    borderColor: "white",

    width: 50,

    marginTop: -43,
    marginLeft: 10,

    alignItems: "center",
    justifyContent: "center",
  },
  publishBtn: {
    width: 50,
    marginTop: -43,
    marginLeft: 280,

    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  takePhotoContainer: {
    position: "absolute",
    left: 15,
    top: 15,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default CreateScreen;
