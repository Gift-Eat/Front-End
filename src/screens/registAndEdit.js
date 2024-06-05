import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function RegistAndEdit() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.page}>기프티콘 등록하기</Text>
      <Image style={styles.gifticon} source={require("../assets/gift.png")} />
      <TextInput style={styles.edit} placeholder="사용처"></TextInput>
      <TextInput style={styles.edit} placeholder="상품명"></TextInput>
      <TextInput style={styles.edit} placeholder="기프티콘 코드"></TextInput>

      <TouchableOpacity style={styles.registContainer}>
        <Text style={styles.registText}>등록하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingLeft: "6%",
  },
  page: {
    margin: "6%",
    fontSize: 22,
    fontWeight: "bold",
  },
  gifticon: {
    alignSelf: "center",
    paddingLeft: 0,
    marginBottom: 36,
  },
  edit: {
    width: "88%",
    height: 48,
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 8,
    marginLeft: "6%",
    marginRight: "6%",
    padding: 14,
    borderRadius: 15,
    backgroundColor: "lightgray",
    fontSize: 18,
  },
  registContainer: {
    width: "88%",
    height: 48,
    alignSelf: "center", // 화면에서 컨테이너 중앙 정렬
    alignItems: "center", // 내부 텍스트 수직 중앙 정렬
    justifyContent: "center", // 내부 텍스트 수평 중앙 정렬
    marginTop: 52,
    marginBottom: 60,
    backgroundColor: "lightgray",
  },
  registText: {
    fontSize: 18,
  },
});
