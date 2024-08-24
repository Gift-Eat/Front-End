import { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity, Alert } from "react-native";
import * as token from "../styles/designToken";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

export default function EditAndDetail({ route, navigation }) {
  const { gifticon } = route.params;

  const [whereToUse, setWhereToUse] = useState(gifticon.where_to_use); // 사용처
  const [gifticonName, setGifticonName] = useState(gifticon.gifticon_name); // 상품명
  const [serialCode, setSerialCode] = useState(gifticon.serial_code); // 기프티콘 코드
  const [expiry, setExpiry] = useState(gifticon.expiration_date); // 유효기간
  const [dayLeft, setDayLeft] = useState(null);

  // 남은 유효기간 계산
  useEffect(() => {
    const calculateDayLeft = () => {
      if (expiry.length === 8) {
        const today = new Date();
        const expiryDate = new Date(
          parseInt(expiry.substring(0, 4)),
          parseInt(expiry.substring(4, 6)) - 1, // 월은 0부터 시작
          parseInt(expiry.substring(6, 8))
        );

        const timeDiff = expiryDate.getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // 일 단위로 변환
        setDayLeft(daysDiff);
      } else {
        setDayLeft(null);
      }
    };

    calculateDayLeft();
  }, [expiry]);

  // 저장된 기프티콘 수정
  const updateGifticon = async () => {
    try {
      const response = await axios.put(`http://52.78.201.166:8080/api/update/${gifticon.gifticon_id}`, {
        where_to_use: whereToUse,
        gifticon_name: gifticonName,
        serial_code: serialCode,
        expiration_date: parseInt(expiry),
        dayLeft: dayLeft, // 계산된 남은 일수
      });

      if (response.status === 200) {
        const updatedResponse = await axios.get("http://52.78.201.166:8080/api/be/list");
        const updatedGifticons = updatedResponse.data;

        const updatedGifticon = updatedGifticons.find((g) => g.gifticon_id === gifticon.gifticon_id);

        if (updatedGifticon) {
          // 상태를 업데이트된 값으로 설정
          setWhereToUse(updatedGifticon.where_to_use);
          setGifticonName(updatedGifticon.gifticon_name);
          setSerialCode(updatedGifticon.serial_code);

          Alert.alert("수정 완료", "기프티콘 정보가 성공적으로 수정되었습니다.");

          // 수정된 데이터를 반영한 상태로 페이지를 다시 로드
          navigation.replace("EditAndDetail", { gifticon: updatedGifticon });
        } else {
          Alert.alert("오류", "수정된 기프티콘을 찾을 수 없습니다.");
        }
      } else {
        Alert.alert("수정 실패", "기프티콘 수정 중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("기프티콘 수정 실패:", error);
      Alert.alert("수정 실패", "기프티콘 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.page}>기프티콘 수정하기</Text>
      <Image style={styles.gifticon} source={{ uri: gifticon.original_image_path }} />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.edit}
          placeholder="사용처"
          value={whereToUse}
          onChangeText={(text) => setWhereToUse(text)}
        />
        <Icon name="edit" size={24} color="#000" style={styles.icon} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.edit}
          placeholder="상품명"
          value={gifticonName}
          onChangeText={(text) => setGifticonName(text)}
        />
        <Icon name="edit" size={24} color="#000" style={styles.icon} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.edit}
          placeholder="기프티콘 코드"
          value={serialCode}
          onChangeText={(text) => setSerialCode(text)}
        />
        <Icon name="edit" size={24} color="#000" style={styles.icon} />
      </View>

      <TouchableOpacity style={styles.registContainer} onPress={updateGifticon}>
        <Text style={styles.registText}>수정</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  page: {
    marginTop: "2%",
    marginBottom: "6%",
    marginLeft: "6%",
    fontSize: 22,
    fontWeight: "bold",
  },
  gifticon: {
    alignSelf: "center",
    paddingLeft: 0,
    marginBottom: 36,
  },

  inputContainer: {
    width: "88%",
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    marginVertical: 8,
    marginHorizontal: "6%",

    // 그림자
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },

  edit: {
    flex: 1,
    fontSize: 18,
    padding: 14,
  },
  registContainer: {
    width: "88%",
    height: 48,
    alignSelf: "center", // 화면에서 컨테이너 중앙 정렬
    alignItems: "center", // 내부 텍스트 수직 중앙 정렬
    justifyContent: "center", // 내부 텍스트 수평 중앙 정렬
    marginTop: 52,
    marginBottom: 60,
    backgroundColor: token.color.main,
    borderRadius: 15,
  },
  registText: {
    fontSize: 18,
    color: "white",
  },
  icon: {
    marginRight: 14,
  },
});
