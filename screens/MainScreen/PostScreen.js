import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FirstScreen from "../NestedScreen/FirstScreen";
import MapScreen from "../NestedScreen/MapsScreen";
import CommentsScreen from "../NestedScreen/CommentsScreen";

const NestedScreen = createNativeStackNavigator();

const PostScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen name="FirstScreen" component={FirstScreen} />
      <NestedScreen.Screen name="MapScreen" component={MapScreen} />
      <NestedScreen.Screen name="CommentsScreen" component={CommentsScreen} />
    </NestedScreen.Navigator>
  );
};

export default PostScreen;
