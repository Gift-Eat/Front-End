import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PasswordChanging() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>비밀번호 변경</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>현재 비밀번호</Text>
        <TextInput style={styles.input} />
        <Text style={styles.inputText}>새 비밀번호</Text>
        <TextInput style={styles.input} secureTextEntry />
        <Text style={styles.inputText}>새 비밀번호 확인</Text>
        <TextInput style={styles.input} secureTextEntry />

        <TouchableOpacity style={styles.singUpBtn} activeOpacity={0.8}>
          <Text style={styles.signUpBtnText}>비밀번호 변경</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // backgroundColor: "tomato",
    padding: 20,
  },
  title: {
    backgroundColor: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "90%",
    alignSelf: "center",
    // marginTop: 32,
    marginTop: 100, // 제목 아래에 공간을 줍니다.
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
  focused: {
    borderColor: "#28A745",
  },
  singUpBtn: {
    height: 56,
    marginTop: 160,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#28A745",
    borderRadius: 15,
  },
  signUpBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
