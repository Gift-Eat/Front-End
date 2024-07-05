// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View, Button, Image } from "react-native";
// import * as ImagePicker from "expo-image-picker";

// export default function Main1({ navigation }) {
//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: false,
//       quality: 1,
//     });

//     // console.log("Image Picker Result: ", result);

//     if (result.assets && result.assets.length > 0 && !result.canceled) {
//       const imageUri = result.assets[0].uri;
//       // console.log("Selected image URI: ", imageUri);
//       navigation.navigate("Regist", { image: imageUri });
//     }
//   };

//   return (
//     <View>
//       <Text>임시 메인 페이지</Text>
//       {/* <Button title="등록하기" onPress={() => navigation.navigate("regist")} /> */}
//       <Button title="등록하기" onPress={pickImage} />
//       <Button title="수정하기" onPress={() => navigation.navigate("Edit")} />
//     </View>
//   );
// }
