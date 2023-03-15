import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";


import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  
} from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import useRoute from "./router";
SplashScreen.preventAutoHideAsync();





export default function App({ submitPropValue }) {
  const [fontsLoaded] = useFonts({
    Cagliostro: require("./assets/fonts/Cagliostro.ttf"),
    "Overpass-Bold": require("./assets/fonts/Overpass-Bold.ttf"),
    "Overpass-Regular": require("./assets/fonts/Overpass-Regular.ttf"),
  });
const route = useRoute(1)
  // const handleChange = ({ target }) => {
  //   const { name, value } = target;
  //   setState((prevState) => {
  //     return { ...prevState, [name]: value };
  //   });
  // };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }



  return (
    <NavigationContainer>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container} onLayout={onLayoutRootView}>
         {route}
        </View>
      </TouchableWithoutFeedback>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0ffff",

    // alignItems: "center",
    // justifyContent: "center",
  },
});
