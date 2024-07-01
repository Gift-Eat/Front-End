import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from "react";

export default function App() {
  return (
    <View style={styles.bigcont}>
      <View style={styles.container2}>
        <View style={styles.ss}>
          <Text style={styles.appName}>
            기프트잇
          </Text>
          <Text style={styles.setting}>
            icon
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.row}>
            <TouchableOpacity style={styles.obj}>
              <Text style={styles.obj_t}>Press Here</Text>
              <Text style={styles.obj_t}>스타벅스</Text>
              <Text style={styles.obj_t}>아메리카노 T</Text>
              <Text style={styles.obj_t}>D-185</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.obj}>
              <Text style={styles.obj_t}>Press Here</Text>
              <Text style={styles.obj_t}>스타벅스</Text>
              <Text style={styles.obj_t}>아메리카노 T</Text>
              <Text style={styles.obj_t}>D-185</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.obj}>
              <Text style={styles.obj_t}>Press Here</Text>
              <Text style={styles.obj_t}>스타벅스</Text>
              <Text style={styles.obj_t}>아메리카노 T</Text>
              <Text style={styles.obj_t}>D-185</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.obj}>
              <Text style={styles.obj_t}>Press Here</Text>
              <Text style={styles.obj_t}>스타벅스</Text>
              <Text style={styles.obj_t}>아메리카노 T</Text>
              <Text style={styles.obj_t}>D-185</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.obj}>
              <Text style={styles.obj_t}>Press Here</Text>
              <Text style={styles.obj_t}>스타벅스</Text>
              <Text style={styles.obj_t}>아메리카노 T</Text>
              <Text style={styles.obj_t}>D-185</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.obj}>
              <Text style={styles.obj_t}>Press Here</Text>
              <Text style={styles.obj_t}>스타벅스</Text>
              <Text style={styles.obj_t}>아메리카노 T</Text>
              <Text style={styles.obj_t}>D-185</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.obj}>
              <Text style={styles.obj_t}>Press Here</Text>
              <Text style={styles.obj_t}>스타벅스</Text>
              <Text style={styles.obj_t}>아메리카노 T</Text>
              <Text style={styles.obj_t}>D-185</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.obj}>
              <Text style={styles.obj_t}>Press Here</Text>
              <Text style={styles.obj_t}>스타벅스</Text>
              <Text style={styles.obj_t}>아메리카노 T</Text>
              <Text style={styles.obj_t}>D-185</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.obj}>
              <Text style={styles.obj_t}>Press Here</Text>
              <Text style={styles.obj_t}>스타벅스</Text>
              <Text style={styles.obj_t}>아메리카노 T</Text>
              <Text style={styles.obj_t}>D-185</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.obj}>
              <Text style={styles.obj_t}>Press Here</Text>
              <Text style={styles.obj_t}>스타벅스</Text>
              <Text style={styles.obj_t}>아메리카노 T</Text>
              <Text style={styles.obj_t}>D-185</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  bigcont: {
    flex: 1,
    backgroundColor: '#28A745',
  },
  container2: {
    backgroundColor: '#28A745',
    flex: 1,
    justifyContent: "center",
    marginTop: 12,
    marginBottom: -30,
    marginLeft: 30,
  },
  appName: {
    fontSize: 30,
  },
  ss: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  setting: {
    marginRight: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  obj: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  obj_t: {
    fontSize: 18,
  }
});
