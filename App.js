import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./src/screens/main";
import Regist from "./src/screens/regist";
import Edit from "./src/screens/edit";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen
          name="Edit"
          component={Edit}
          // 상단바 네비게이션 설정
          options={({ navigation }) => ({
            title: "",
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                <Image
                  source={require("./src/assets/nav_arrow.png")}
                  style={{ width: 24, height: 24, marginLeft: 15 }}
                />
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: "white",
              elevation: 0, // Android에서 그림자 제거
              shadowOpacity: 0, // iOS에서 그림자 제거
              borderBottomWidth: 0, // 하단 보더 제거
            },
          })}
        />
        <Stack.Screen
          name="Regist"
          component={Regist}
          // 상단바 네비게이션 설정
          options={({ navigation }) => ({
            title: "",
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                <Image
                  source={require("./src/assets/nav_arrow.png")}
                  style={{ width: 24, height: 24, marginLeft: 15 }}
                />
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: "white",
              elevation: 0, // Android에서 그림자 제거
              shadowOpacity: 0, // iOS에서 그림자 제거
              borderBottomWidth: 0, // 하단 보더 제거
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
