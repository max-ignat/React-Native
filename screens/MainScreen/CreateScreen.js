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
  TextInput,
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
import { collection, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

import * as ImageManipulator from 'expo-image-manipulator'

const CreateScreen = ({ navigation }) => {
  const [photoCard, setPhotoCard] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [message, setMessage] = useState('');
  const [startCamera, setStartCamera] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
const { userId, name } = useSelector((state) => state.auth);


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



  const _startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Access denied!");
    }
  };

const resizeImage = async (uri, maxWidth, maxHeight) => {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [
      {
        resize: {
          width: maxWidth,
          height: maxHeight,
        },
      },
    ],
    {
      compress: 0.7, 
      format: ImageManipulator.SaveFormat.JPEG,
    }
  );

  return result.uri;
};


  // const takePhoto = async () => {
  //   const location = await Location.getCurrentPositionAsync({});
  //   setLocation(location);
  //   const photo = await cameraRef.current.takePictureAsync();
  //   setPhotoCard(photo.uri);
  //   console.log("message ==>", message);
  // };
const takePhoto = async () => {
  const location = await Location.getCurrentPositionAsync({});
  setLocation(location);
  const photo = await cameraRef.current.takePictureAsync();

  // Изменение размера изображения перед установкой состояния photoCard
  const resizedPhotoUri = await resizeImage(photo.uri, 800, 800);
  setPhotoCard(resizedPhotoUri);
  console.log("photo ==> ", photo.uri);
  console.log("message ==>", message);
};


  function publish() {    
    uploadPostToServer();
    navigation.navigate("FirstScreen" );
    setPhotoCard(null);
    setStartCamera(null)
    setMessage('')
    
  }
   const uploadPhotoToServer = async () => {
     if (!photoURL) return;

     try {
       console.log('TRIED TO SEND PHOTO')
       const response = await fetch(photoCard);
       const blobFile = await response.blob();
       const id = Date.now();

       const reference = ref(storage, `images/${id}`);
       const result = await uploadBytesResumable(reference, blobFile);
       const processedPhoto = await getDownloadURL(result.ref);
       console.log("processedPhoto", processedPhoto);
       setPhotoURL(processedPhoto)
       console.log("photoURL AFTER", photoURL);

      //  setPhotoURL(null);
     } catch (err) {

       console.log(err.message);
       Alert.alert("Try again \n", err.message);
     }
   };
const uploadPostToServer = async () => {
  await uploadPhotoToServer();
try {
  const createPost = await addDoc(collection(db, "posts"), {
    photoURL,
    location: location.coords,
    message,
    location,
    userId,
    name,
  });
} catch (error) {
  console.log(error.message)
}

  
};

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
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setMessage(text)}
            />
          </View>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: "azure",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={_startCamera}
            style={{
              // justifyContent: "flex-end",
              width: 130,
              borderRadius: 4,
              backgroundColor: "#14274e",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: 40,
              marginBottom: 10,
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
    marginTop: 20,
    // marginHorizontal: 10,
    marginBottom: 10,

    flexDirection: "row",
  },
  takePhotoBtn: {
    width: 50,
    borderWidth: 4,
    borderRadius: 25,
    borderColor: "white",
    marginLeft: 135,
    marginTop: 530,
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
    marginLeft: 250,

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
  input: {
    borderWidth: 1,
    borderBottomColor: "#20b2aa",
    borderColor: "transparent",
    marginBottom: 10,
    height: 40,
  },
  inputContainer: {
    width: 335,
  },
});

export default CreateScreen;
