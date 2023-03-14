import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import { StatusBar } from "expo-status-bar";
import {  StyleSheet,  View,  Keyboard,  TouchableWithoutFeedback, } from "react-native";
// import * as Font from "expo-font";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
SplashScreen.preventAutoHideAsync();

const MainTab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}



export default function App({ submitPropValue }) {
  const [fontsLoaded] = useFonts({
    "Cagliostro": require("./assets/fonts/Cagliostro.ttf"),
    "Overpass-Bold": require("./assets/fonts/Overpass-Bold.ttf"),
    "Overpass-Regular": require("./assets/fonts/Overpass-Regular.ttf"),
  });

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

  
const AuthStack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <AuthStack.Navigator>
            <AuthStack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            {/* <RegisterScreen /> */}<AuthStack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            {/* <StatusBar style="auto" /> */}
          </AuthStack.Navigator>
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
