import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity, Alert } from "react-native";
import * as token from "../styles/designToken";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { Dimensions } from "react-native";
import axios from "axios";

const screenWidth = Dimensions.get("window").width; // 화면 너비
const imageWidth = screenWidth * 0.8;

export default function Regist({ route }) {
  const { image } = route.params || {};
  const { giftyconInfo } = route.params || {};

  console.log("gd ",giftyconInfo)
  const [croppedImage, setCroppedImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(image);
  const [store, setStore] = useState(giftyconInfo.store);
  const [name, setName] = useState(giftyconInfo.name);
  const [expiry, setExpiry] = useState(giftyconInfo.expirationDate);
  const [code, setCode] = useState(giftyconInfo.code);
  // const [id, setId] = useState("");

  const [registrationTime, setRegistrationTime] = useState("");

  const [dayLeft, setDayLeft] = useState(null);

  const handleExpiryChange = (text) => {
    const exText = text.replace(/[^0-9]/g, "");
    setExpiry(exText);
  };

  // 이미지 크롭
  useEffect(() => {
    const cropImage = async () => {
      try {
        console.log("Original image URI: ", originalImage);
        if (!originalImage) {
          console.log("No image found");
          return;
        }

        // 원본 이미지의 크기를 가져옴
        const imageInfo = await ImageManipulator.manipulateAsync(originalImage, [], {
          compress: 1,
          format: ImageManipulator.SaveFormat.PNG,
        });
        const { width } = imageInfo;

        const manipResult = await ImageManipulator.manipulateAsync(
          originalImage,
          [{ crop: { originX: 0, originY: 0, width: width, height: width } }],
          { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        );
        console.log("Cropped image URI: ", manipResult.uri);
        setCroppedImage(manipResult.uri);
      } catch (error) {
        console.log("이미지 자르기 실패: ", error);
      }
    };

    cropImage();
  }, [originalImage]);

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
        setDayLeft(null); // 유효하지 않은 날짜 형식일 경우
      }
    };

    calculateDayLeft();
  }, [expiry]);

  // 이미지 눌렀을 때
  const handleImagePress = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        setOriginalImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Image selection failed: " + error.message);
    }
  };

  // 등록 버튼 눌렀을 때
  const handleSubmit = async () => {
    console.log({ dayLeft });

    if (!store || !name || !code || !expiry) {
      Alert.alert("오류", "모든 칸을 입력해주세요.");
      return;
    }

    const data = {
      gifticon_name: name,
      where_to_use: store,
      serial_code: code,
      expiration_date: parseInt(expiry), // 문자열 아니고 int
      dayLeft: dayLeft,
    };
    console.log("data", data);

    try {
      const response = await axios.post("http://52.78.201.166:8080/api/be/createpro", data);
      console.log(response.status);

      if (response.status === 200) {
        Alert.alert("", "기프티콘이 등록되었습니다.");
        console.log("성공");
      } else {
        Alert.alert("", "오류로 인해 기프티콘이 등록되지 않았습니다.");
        console.log("실패");
      }
    } catch (error) {
      Alert.alert("", "네트워크 오류가 발생했습니다.");
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.page}>기프티콘 등록하기</Text>

      <TouchableOpacity onPress={handleImagePress} style={styles.imageContainer}>
        {croppedImage ? (
          <Image source={{ uri: croppedImage }} style={styles.gifticonImage} />
        ) : (
          <Text style={styles.loadingText}>이미지 로딩 중...</Text>
        )}
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput style={styles.edit} placeholder="사용처" value={store} onChangeText={setStore} />
        <Icon name="edit" size={24} color="#000" style={styles.icon} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.edit} placeholder="상품명" value={name} onChangeText={setName} />
        <Icon name="edit" size={24} color="#000" style={styles.icon} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.edit}
          placeholder="기프티콘 코드 (ㅇㅇ자리)"
          onChangeText={setCode}
          keyboardType="numeric"
        />
        <Icon name="edit" size={24} color="#000" style={styles.icon} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.edit}
          placeholder="유효기간 (8자리)"
          value={expiry}
          onChangeText={handleExpiryChange}
          keyboardType="numeric"
        />
        <Icon name="edit" size={24} color="#000" style={styles.icon} />
      </View>

      <TouchableOpacity style={styles.registContainer} onPress={handleSubmit}>
        <Text style={styles.registText}>등록</Text>
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
    marginBottom: "2%",
    marginLeft: "6%",
    fontSize: 22,
    fontWeight: "bold",
  },

  imageContainer: {
    marginTop: "8%",
    marginBottom: "10%",
    alignItems: "center",
    alignSelf: "center",
  },
  gifticonImage: {
    width: imageWidth,
    height: imageWidth,
  },
  loadingText: {
    // width: imageWidth,
    // height: imageWidth,
    textAlign: "center",
    textAlignVertical: "center",
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
    fontSize: 16,
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
