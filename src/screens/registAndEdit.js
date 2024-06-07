import { useState, useEffect } from "react";
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
import * as token from "../styles/designToken";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function RegistAndEdit({ route }) {
  const { page } = route.params;
  const [pageName, setPageName] = useState("");

  useEffect(() => {
    if (page === "regist") {
      setPageName("등록");
    } else if (page === "edit") {
      setPageName("수정");
    }
  }, [page]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.page}>기프티콘 {pageName}하기</Text>
      <Image style={styles.gifticon} source={require("../assets/gift.png")} />

      <View style={styles.inputContainer}>
        <TextInput style={styles.edit} placeholder="사용처" />
        <Icon name="edit" size={24} color="#000" style={styles.icon} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.edit} placeholder="상품명" />
        <Icon name="edit" size={24} color="#000" style={styles.icon} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.edit} placeholder="기프티콘 코드" />
        <Icon name="edit" size={24} color="#000" style={styles.icon} />
      </View>

      <TouchableOpacity style={styles.registContainer}>
        <Text style={styles.registText}>{pageName}</Text>
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
