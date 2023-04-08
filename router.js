import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//! Screens
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import CreateScreen from "./screens/MainScreen/CreateScreen";
import PostScreen from "./screens/MainScreen/PostScreen";
import ProfileScreen from "./screens/MainScreen/ProfileScreen";
import ContactsScreen from "./screens/MainScreen/ContactsScreen";
//! icons
import {   
    Entypo ,
  Feather,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";

const MainTab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();
const useRoute = (isLogin) => {
  if (!isLogin) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <AuthStack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#fff" },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarLabelStyle: { fontSize: 10, fontWeight: "bold" },
        tabBarIconStyle: { marginBottom: -9 },
        tabBarShowLabel: false,
        // tabBarIndicatorStyle: { backgroundColor: "#007AFF", height: 4 },
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="news" size={25} color={color} />
          ),
          headerShown: false,
        }}
      />
      <MainTab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-create-outline" size={25} color={color} />
          ),
          headerShown: false,
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={25} color={color} />
          ),
          headerShown: false,
        }}
      />
      {/* <MainTab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="contacts" size={25} color={color} />
          ),
            headerShown: false,
          
        }}
      /> */}
    </MainTab.Navigator>
  );
};
export default useRoute;
