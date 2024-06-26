import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image } from "react-native";

export default function Main({ navigation }) {
  return (
    <View>
      <Text>임시 메인 페이지</Text>
      <Button title="등록하기" onPress={() => navigation.navigate("regist")} />
      <Button title="수정하기" onPress={() => navigation.navigate("edit")} />
    </View>
  );
}
