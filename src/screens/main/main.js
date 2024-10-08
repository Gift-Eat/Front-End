import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { LongPressGestureHandler, State } from "react-native-gesture-handler";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Gifty from "../../components/gifty.js";
import { checkOcr } from "./ocr/checkOcr.js";
import { AntDesign } from '@expo/vector-icons';

export default function Main({ navigation }) {
  const [gifticonImg, setGifticonImg] = useState("");
  const [store, setStore] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [expiry, setExpiry] = useState("");
  const [gifticons, setGifticons] = useState([]);
  const [showDelete, setShowDelete] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  // 서버에서 데이터 가져오기
  const getInfo = async () => {
    try {
      const response = await axios.get("http://52.78.201.166:8080/api/be/list");
      const info = response.data;
      console.log(info);

      setGifticons(info);
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  // 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        setIsLoggedIn(true);
      }
    };
    checkLoginStatus();
  }, []);

  // 이미지 선택
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (result.assets && result.assets.length > 0 && !result.canceled) {
      const imageUri = result.assets[0].uri;

      const giftyconInfo = await checkOcr(imageUri);
      navigation.navigate("Regist", { image: imageUri, giftyconInfo: giftyconInfo });
    }
  };

  // 저장된 기프티콘 꾹 눌렀을 때
  const handleLongPress = (gifticonId) => {
    setShowDelete(gifticonId); // 삭제 버튼 보이기
  };

  // 저장된 기프티콘 삭제
  const deleteGifticon = async (gifticon_id) => {
    try {
      await axios.get(`http://52.78.201.166:8080/api/be/delete/${gifticon_id}`);
      setGifticons(gifticons.filter((gifticon) => gifticon.gifticon_id !== gifticon_id));
      setShowDelete(null);
    } catch (error) {
      console.error("기프티콘 삭제 실패:", error);
      Alert.alert("삭제 실패", "기프티콘 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <View style={styles.bigcont}>
      <TouchableOpacity
        onPress={() => {
          pickImage();
          setShowDelete(null); // 이미지 선택 시 삭제 버튼 숨기기
        }}
        activeOpacity={0.6}
        underlayColor="#1c7a33"
        style={styles.regist}
      >
        <Image source={require("../../assets/regist.png")} style={{ width: 66, height: 66 }} />
      </TouchableOpacity>
      <View style={styles.container2}>
        <View style={styles.ss}>
          <Text style={styles.appName}>기프트잇</Text>

          <TouchableOpacity
            onPress={() => {
              if (isLoggedIn) {
                navigation.navigate("Setting");
              } else {
                navigation.navigate("Login");
              }
            }}
          >
            {isLoggedIn ? (
              <AntDesign name="setting" size={40} color="black" style={styles.setting} />
            ) : (
              <Text style={styles.inform}>로그인</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          onStartShouldSetResponder={() => true}
          onResponderStart={(e) => {
            if (showDelete && !e.target.closest(".deleteButton")) {
              setShowDelete(null);
            }
          }}
        >
          <View style={styles.row}>
            {gifticons.map((gifticon) => (
              <LongPressGestureHandler
                key={gifticon.gifticon_id}
                onHandlerStateChange={({ nativeEvent }) => {
                  if (nativeEvent.state === State.ACTIVE) {
                    handleLongPress(gifticon.gifticon_id);
                  }
                }}
                minDurationMs={600}
              >
                <View>
                  <Gifty {...gifticon} onPress={() => navigation.navigate("EditAndDetail", { gifticon })} />
                  {showDelete === gifticon.gifticon_id && (
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => deleteGifticon(gifticon.gifticon_id)}
                      className="deleteButton"
                      activeOpacity={0.7}
                    >
                      <Text style={styles.deleteButtonText}>삭제</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </LongPressGestureHandler>
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
    fontSize: 38,
    color: "white",
  },
  ss: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  setting: {},
  inform: {
    marginTop: 10,
    marginRight: 30,
    marginLeft: -60,
    fontSize: 20,
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
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
