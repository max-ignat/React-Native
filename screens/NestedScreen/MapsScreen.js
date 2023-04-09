import React from "react";
import { Text, View, StyleSheet, } from "react-native"
import MapView, {Marker} from "react-native-maps"

const MapScreen = ({route}) => {
// console.log(route.params.location.coords)
  const { latitude, longitude } = route.params.location.coords;
  return (
    <>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude,
              longitude,
            }}
            title="travel"
          />
        </MapView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f0ffff",

    // alignItems: "center",
    // justifyContent: "center",
  },
    map: {
      flex: 1,
    // width: "100%",
    // height: "100%",
  },
});


export default MapScreen;