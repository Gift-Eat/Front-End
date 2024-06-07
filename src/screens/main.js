import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image } from "react-native";

export default function Main({ navigation }) {
  return (
    <View>
      <Text>메인 페이지</Text>
      <Button
        title="등록하기"
        onPress={() => navigation.navigate("RegistAndEdit", { page: "regist" })}
      />
      <Button
        title="수정하기"
        onPress={() => navigation.navigate("RegistAndEdit", { page: "edit" })}
      />
    </View>
  );
}
