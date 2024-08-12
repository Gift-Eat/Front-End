import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function Login() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>아이디</Text>
        <TextInput style={styles.input} />
        <Text style={styles.inputText}>비밀번호</Text>
        <TextInput style={styles.input} secureTextEntry />
      </View>
      <View style={styles.otherContainer}>
        <TouchableOpacity style={styles.signup} activeOpacity={1} onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signupText}>회원가입</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signup}
          activeOpacity={1}
          onPress={() => navigation.navigate("PasswordChanging")}
        >
          <Text style={styles.signupText}>비밀번호 변경</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginBtn} activeOpacity={0.8}>
        <Text style={styles.loginBtnText}>로그인</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 100,
  },
  inputContainer: {
    width: "90%",
  },
  inputText: {
    fontSize: 16,
    marginBottom: 6,
    color: "#333333",
  },
  input: {
    height: 56,
    borderColor: "#28A745",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  otherContainer: {
    flexDirection: "row",
  },
  signup: {
    // marginTop: 12,
    alignItems: "center",
    justifyContent: "center", // 회원가입과 비밀번호 변경 높이 맞게
  },
  signupText: {
    color: "#333333",
    padding: 10,
  },
  loginBtn: {
    width: "90%",
    height: 56,
    marginTop: 160,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#28A745",
    borderRadius: 15,
  },
  loginBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
