import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function SignUp() {
  const navigation = useNavigation();
  const [focused, setFocused] = useState(null);

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [userName, setUserName] = useState("");

  const SignUp = async () => {
    if (password !== passwordCheck) {
      Alert.alert("실패", "비밀번호를 확인해주세요.");
      return;
    }

    try {
      console.log(userId, password);
      const response = await axios.post("http://52.78.201.166:8080/jwt-login/join", {
        userId: userId,
        userPassword: password,
        passwordCheck: passwordCheck,
        userName: userName,
      });

      Alert.alert("성공", "회원가입에 성공했습니다.");
      console.log("회원가입 성공");
      navigation.navigate("Login"); // 회원가입 성공 후 로그인 페이지로 이동
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("실패", "회원가입에 실패했습니다.");
      console.log("회원가입 실패:", error.message);
      console.log(response.data);
    }
  };

  // useEffect(() => {
  //   console.log(userId);
  //   console.log(password);
  //   console.log(passwordCheck);
  //   console.log(userName);
  // }, [userId, password, passwordCheck, userName]);

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
            onChangeText={(text) => setUserId(text)}
          />
          <Text style={styles.inputText}>비밀번호</Text>
          <TextInput
            style={[styles.input, focused === "비밀번호" && styles.focused]}
            secureTextEntry
            onFocus={() => setFocused("비밀번호")}
            onBlur={() => setFocused(null)}
            onChangeText={(text) => setPassword(text)}
          />
          <Text style={styles.inputText}>비밀번호 확인</Text>
          <TextInput
            style={[styles.input, focused === "비밀번호확인" && styles.focused]}
            secureTextEntry
            onFocus={() => setFocused("비밀번호확인")}
            onBlur={() => setFocused(null)}
            onChangeText={(text) => setPasswordCheck(text)}
          />
          <Text style={styles.inputText}>이름</Text>
          <TextInput
            style={[styles.input, focused === "이름" && styles.focused]}
            onFocus={() => setFocused("이름")}
            onBlur={() => setFocused(null)}
            onChangeText={(text) => setUserName(text)}
          />

          <TouchableOpacity style={styles.singUpBtn} activeOpacity={0.8} onPress={SignUp}>
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
