import React, { useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./src/screens/main/main";
import Regist from "./src/screens/regist";
import EditAndDetail from "./src/screens/editAndDetail";

import Setting from "./src/screens/setting";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from "./src/screens/login";
import SignUp from "./src/screens/signUp";

const Stack = createStackNavigator();

const BACKGROUND_FETCH_TASK = 'BACKGROUND_FETCH_TASK';

// Define the background task
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  try {
    const response = await fetch('http://52.78.201.166:8080/api/be/gifticons');
    const gifticons = await response.json();
    
    const notification7Days = await AsyncStorage.getItem('notification7Days') === 'true';
    const notification30Days = await AsyncStorage.getItem('notification30Days') === 'true';

    gifticons.forEach(gifticon => {
      const daysLeft = calculateDaysLeft(gifticon.expiration_date);
      if (notification7Days && daysLeft === 7) {
        scheduleNotification(gifticon.gifticon_name, 7);
      } else if (notification30Days && daysLeft === 30) {
        scheduleNotification(gifticon.gifticon_name, 30);
      }
    });

    return BackgroundFetch.Result.NewData;
  } catch (error) {
    console.error('Error in background fetch:', error);
    return BackgroundFetch.Result.Failed;
  }
});

const calculateDaysLeft = (expiryDate) => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const timeDiff = expiry.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff;
};

const scheduleNotification = (gifticon_name, daysLeft) => {
  const message =
    daysLeft === 7
      ? `기프티콘 "${gifticon_name}"이(가) 7일 남았습니다`
      : `기프티콘 "${gifticon_name}"이(가) 30일 남았습니다`;

  PushNotification.localNotification({
    title: "기프티콘 알림",
    message,
    channelId: "default-channel-id",
  });
};

export default function App() {
  useEffect(() => {
    const init = async () => {
      await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 60 * 60 * 24, // 24 hours
        stopOnTerminate: false,
        startOnBoot: true,
      });
    };

    init();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditAndDetail"
          component={EditAndDetail}
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
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
          })}
        />
        <Stack.Screen
          name="Regist"
          component={Regist}
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
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
          })}
        />
        <Stack.Screen
          name="Setting"
          component={Setting}
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
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
          })}
        />
        <Stack.Screen
          name="Login"
          component={Login}
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
          name="SignUp"
          component={SignUp}
          // 상단바 네비게이션 설정
          options={({ navigation }) => ({
            title: "",
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
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
