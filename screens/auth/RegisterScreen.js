import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Image,
  Keyboard,
  TouchableWithoutFeedback,

} from "react-native";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function RegisterScreen({ navigation }) {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const keyboardHide = () => {
    Keyboard.dismiss();
    console.log(state);
    setState("");
    // setIsShownKeyboard = false;
  };
  const { email, password, name } = state;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/UA_flag.jpg")}
          resizeMode="cover"
        >
          <KeyboardAvoidingView
            behavior={
              (Platform.OS === "ios" ? "padding" : "height",
              Platform.OS === "android" ? "padding" : "height")
            }
          >
            <View //! Form
              style={{
                ...styles.form,
                marginBottom: isShownKeyboard ? 10 : 100,
              }}
            >
              <Image
                source={require("../../assets/favicon.png")}
                style={styles.ico}
              />
              {/* { (!isShownKeyboard) &&  <Image
                 source={require("./assets/favicon.png")}
                 style={styles.ico}
               />} */}

              <Text
                style={{
                  fontFamily: "Cagliostro",
                  fontSize: 30,
                  textAlign: "center",
                  color: "azure",
                }}
              >
                Please register first
              </Text>
              <View>
                <Text style={styles.inputTitle}>Name</Text>
                <TextInput //! Name Input
                  autoCapitalize={"none"}
                  onFocus={() => setIsShownKeyboard(true)}
                  autoComplete={"off"}
                  // placeholder="example-email@com"
                  style={styles.input}
                  textAlign={"center"}
                  value={name}
                  name={name}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, name: value }))
                  }
                />
              </View>
              <View>
                <Text style={styles.inputTitle}>Email</Text>
                <TextInput //! Email Input
                  autoCapitalize={"none"}
                  onFocus={() => setIsShownKeyboard(true)}
                  autoComplete={"off"}
                  // placeholder="example-email@com"
                  style={styles.input}
                  textAlign={"center"}
                  value={email}
                  name={email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={{ marginBottom: 25 }}>
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput //! Password input
                  onFocus={() => setIsShownKeyboard(true)}
                  // placeholder="password"
                  value={state.password}
                  name={password}
                  style={styles.input}
                  textAlign={"center"}
                  secureTextEntry={true}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                />
              </View>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.9}
                onPress={keyboardHide}
              >
                <Text style={styles.buttonTitle}>Sing up</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#007AFF",
                    fontSize: 12,
                    marginTop: 15,
                    fontFamily: "Cagliostro",
                  }}>Already register? <Text style={{ textDecorationLine: "underline" }}>Sign in</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0ffff",

    // alignItems: "center",
    // justifyContent: "center",
  },
  text: {
    color: "#000000",
    fontSize: 16,
    alignItems: "flex-start",
  },

  input: {
    // width: 360,

    borderWidth: 1,
    borderRadius: 7,
    borderColor: "#000000",
    height: 50,
    borderColor: "#f0ffff",
    backgroundColor: "#f0ffff",
    // marginBottom: 20,
    // paddingLeft: 5,
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginHorizontal: 100,
    height: 40,
    width: 100,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    // marginBottom: 0,
    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#007AFF",
      },
      android: {
        backgroundColor: "#007AFF",
        borderColor: "transparent",
      },
    }),
  },
  form: {
    marginHorizontal: 40,

    // marginBottom: 80,
  },
  inputTitle: {
    fontFamily: "Overpass-Regular",
    color: "white",

    fontSize: 20,
    marginBottom: 10,
  },
  buttonTitle: {
    color: "#f0ffff",
    fontFamily: "Overpass-Regular",
    fontSize: 16,
  },
  ico: {
    marginLeft: 130,
    marginBottom: 20,
  },
  sec_btn: {
    backgroundColor: "red",
    fontSize: 10,
  },
});
