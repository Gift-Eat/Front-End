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
import axios from 'axios';

export default function Main({ navigation }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 첫 번째 단계: 데이터 개수 가져오기
        const countResponse = await axios.get('http://172.16.108.130:8080/api/be/datacount');
        const dataCount = countResponse.data.count;

        // 두 번째 단계: 데이터를 가져오기
        const dataResponse = await axios.get('http://172.16.108.130:8080/api/be/createpro', {
          params: {
            count: dataCount
          }
        });

        setItems(dataResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (result.assets && result.assets.length > 0 && !result.canceled) {
      const imageUri = result.assets[0].uri;
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
                image={{ uri: gifticon.image }}
                gifticonName={gifticon.gifticon_name}
                store={gifticon.store}
                expiry={gifticon.expiry}
                onPress={() => navigation.navigate("EditAndDetail", { itemId: gifticon.id })}
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

