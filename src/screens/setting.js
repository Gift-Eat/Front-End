import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Setting({ navigation }) {
  const [notification7Days, setNotification7Days] = useState(false);
  const [notification30Days, setNotification30Days] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      const storedNotification7Days = await AsyncStorage.getItem('notification7Days');
      const storedNotification30Days = await AsyncStorage.getItem('notification30Days');
      if (storedNotification7Days !== null) {
        setNotification7Days(storedNotification7Days === 'true');
      }
      if (storedNotification30Days !== null) {
        setNotification30Days(storedNotification30Days === 'true');
      }
    };

    loadSettings();
  }, []);

  const toggleNotification7Days = async () => {
    const newValue = !notification7Days;
    setNotification7Days(newValue);
    await AsyncStorage.setItem('notification7Days', newValue.toString());
  };

  const toggleNotification30Days = async () => {
    const newValue = !notification30Days;
    setNotification30Days(newValue);
    await AsyncStorage.setItem('notification30Days', newValue.toString());
  };

  return (
    <View style={styles.container}>
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>7일 남았을 때 알림받기</Text>
        <TouchableOpacity onPress={toggleNotification7Days} style={styles.toggleButton}>
          <Text style={styles.toggleText}>{notification7Days ? 'Off' : 'On'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>30일 남았을 때 알림받기</Text>
        <TouchableOpacity onPress={toggleNotification30Days} style={styles.toggleButton}>
          <Text style={styles.toggleText}>{notification30Days ? 'Off' : 'On'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  notificationText: {
    fontSize: 18,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#28A745',
    borderRadius: 5,
    marginRight: 20,
  },
  toggleText: {
    color: 'white',
    fontSize: 16,
  },
});
