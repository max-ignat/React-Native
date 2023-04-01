import React, { useCallback, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
// import { db } from "./firebase/config";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { isLogin } from "./redux/auth/authSelectors";
import { useSelector } from "react-redux";
import useRoute from "./router";
SplashScreen.preventAutoHideAsync();
import { app } from "./firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function App({}) {
  const [user, setUser] = useState(null);
  const [fontsLoaded] = useFonts({
    Cagliostro: require("./assets/fonts/Cagliostro.ttf"),
    "Overpass-Bold": require("./assets/fonts/Overpass-Bold.ttf"),
    "Overpass-Regular": require("./assets/fonts/Overpass-Regular.ttf"),
  });
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    // console.log("ENtry", user.uid);
    setUser(user);
  });
  const route = useRoute(user);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container} onLayout={onLayoutRootView}>
            {route}
          </View>
        </TouchableWithoutFeedback>
      </NavigationContainer>
    </Provider>
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
