import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableHighlight,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import Gifty from "../components/gifty.js";

const items = [
  { id: 1, image: require("../assets/gif2.png"), pdName: "sef", sName: "df", dd: 33 },
  { id: 2, image: require("../assets/gif2.png"), pdName: "22", sName: "44", dd: 33 },
];

export default function Main({ navigation }) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
    // console.log("Image Picker Result: ", result);

    if (result.assets && result.assets.length > 0 && !result.canceled) {
      const imageUri = result.assets[0].uri;
      // console.log("Selected image URI: ", imageUri);
      navigation.navigate("Regist", { image: imageUri });
    }
  };

  return (
    <View style={styles.bigcont}>
      <TouchableHighlight
        onPress={pickImage}
        activeOpacity={0.6}
        underlayColor="#1c7a33"
        style={styles.regist}
      >
        <Image source={require("../assets/regist.png")} style={{ width: 66, height: 66 }} />
      </TouchableHighlight>
      <View style={styles.container2}>
        <View style={styles.ss}>
          <Text style={styles.appName}>기프트잇</Text>
          <Text style={styles.setting}>icon</Text>
        </View>
      </View>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.row}>
            {items.map((gifticon) => (
              <Gifty
                key={gifticon.id}
                {...gifticon}
                onPress={() => navigation.navigate("EditAndDetail")}
              />
            ))}
          </View>
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  bigcont: {
    flex: 1,
    backgroundColor: "#28A745",
  },
  container2: {
    backgroundColor: "#28A745",
    flex: 1,
    justifyContent: "center",
    marginTop: 12,
    marginBottom: -30,
    marginLeft: 30,
  },
  appName: {
    fontSize: 30,
    color: "white",
  },
  ss: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  setting: {
    marginRight: 20,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
  },
  obj: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  obj_t: {
    fontSize: 18,
  },
  regist: {
    position: "absolute",
    right: "13%",
    bottom: "10%",
    zIndex: 10,
  },
});
