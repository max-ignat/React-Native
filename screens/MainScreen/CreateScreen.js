import React from "react";
import * as Location from "expo-location";
import { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";

const CreateScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [startCamera, setStartCamera] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

 const cameraRef = useRef();
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
   const getPermissions = async () => {
     const { status } = await Camera.requestPermissionsAsync();
     if (status === "granted") {
       // start the camera
       setStartCamera(true);
     } else {
       Alert.alert("Access denied");
     }
   };
   if (startCamera === null) {
     getPermissions();
   }
 }, [startCamera]);
  function toggleCameraType() {
    console.log("FLIP");
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const snap = async () => {
    const photo = await cameraRef.current.takePictureAsync();
    console.log("photo :>> ", photo);
  };

const _startCamera = async () => {
  const { status } = await Camera.requestPermissionsAsync();
  if (status === "granted") {
    // start the camera
    setStartCamera(true);
  } else {
    Alert.alert("Access denied");
  }
};


  function publish() {
    console.log("PUBLISHED");
  }
  return (
    <View style={styles.container}>
      {/* <Text> CreateScreen FUCK YOU NIGER</Text> */}
      <Camera
        style={styles.camera}
        type={type}
        autoFocus={Camera.Constants.AutoFocus.on}
        flashMode={Camera.Constants.FlashMode.off}
        zoom={0}
        ref={cameraRef}
      >
        {/* <View >  */}
        <View>
          <TouchableOpacity style={styles.snap} onPress={snap}>
            <Ionicons name="md-camera-outline" size={40} color="white" />
          </TouchableOpacity>
          {/* </View>

          <View> */}
          <TouchableOpacity style={styles.flip} onPress={toggleCameraType}>
            <MaterialIcons name="flip-camera-ios" size={40} color="white" />
          </TouchableOpacity>
        </View>
        {/* </View> */}
      </Camera>
      <TouchableOpacity>
        <Entypo
          name="publish"
          size={60}
          color="black"
          onPress={publish}
          style={{ marginTop: 50 }}
        />
      </TouchableOpacity>
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
    width: 350,
    marginTop: 50,
    height: 500,
    flexDirection: "row",
  },
  snap: {
    marginLeft: 165, // Изменяем отступ
    alignItems: "center",
    justifyContent: "center",
    marginTop: 450,
  },

  flip: {
    // borderWidth: 1,
    // color: "white",
    width: 50,
    marginTop: -43,
    marginLeft: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CreateScreen;
