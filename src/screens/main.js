import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function Main({ navigation }) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // 선택할 미디어 타입: 이미지만
      allowsEditing: false, // 이미지 선택 후 편집: X
      quality: 1, // 품질: 원본
    });

    // console.log("Image Picker Result: ", result);

    // prettier-ignore
    if (result.assets && result.assets.length > 0 && !result.canceled) {  // 이미지 선택 성공
      const imageUri = result.assets[0].uri;
      // console.log("Selected image URI: ", imageUri);
      navigation.navigate("Regist", { image: imageUri });
    }
  };

  return (
    <View>
      <Text>임시 메인 페이지</Text>
      {/* <Button title="등록하기" onPress={() => navigation.navigate("regist")} /> */}
      <Button title="등록하기" onPress={pickImage} />
      <Button title="수정하기" onPress={() => navigation.navigate("Edit")} />
    </View>
  );
}
