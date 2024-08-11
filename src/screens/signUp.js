import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput, TouchableWithoutFeedback, Keyboard} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SignUp() {
  const [focused, setFocused] = useState(null);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>아이디</Text>
        <TextInput
          style={[styles.input, focused === "아이디" && styles.focused]}
          onFocus={() => setFocused("아이디")}
          onBlur={() => setFocused(null)}
        />
        <Text style={styles.inputText}>비밀번호</Text>
        <TextInput
          style={[styles.input, focused === "비밀번호" && styles.focused]}
          secureTextEntry
          onFocus={() => setFocused("비밀번호")}
          onBlur={() => setFocused(null)}
        />
        <Text style={styles.inputText}>항목1</Text>
        <TextInput
          style={[styles.input, focused === "항목1" && styles.focused]}
          onFocus={() => setFocused("항목1")}
          onBlur={() => setFocused(null)}
        />

        <TouchableOpacity style={styles.singUpBtn} activeOpacity={0.8}>
          <Text style={styles.signUpBtnText}>회원가입</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    // paddingTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 32,
  },
  inputText: {
    fontSize: 16,
    marginBottom: 6,
    color: "#333333",
  },
  input: {
    height: 56,
    borderColor: "#666666",
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
