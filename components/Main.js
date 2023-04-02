import React, { useCallback, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAuth} from "firebase/auth";
import useRoute from "../router";
import { app } from "../firebase/config";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { authStateChange } from "../redux/auth/authOperations";
SplashScreen.preventAutoHideAsync();

const Main = () => {
    dispatch = useDispatch();
 
    const state = useSelector((state) => state)
    console.log("state", state)
const stateChange = useSelector((state) => state.auth.stateChange);
//  console.log('STATE', state)
    useEffect(() => {
      dispatch(authStateChange());
    }, [stateChange]);
  const route = useRoute(stateChange);

  const [fontsLoaded] = useFonts({
    Cagliostro: require("../assets/fonts/Cagliostro.ttf"),
    "Overpass-Bold": require("../assets/fonts/Overpass-Bold.ttf"),
    "Overpass-Regular": require("../assets/fonts/Overpass-Regular.ttf"),
  });

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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0ffff",
  },
});

export default Main;
