import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TouchableHighlight } from "react-native";

export default function Setting({ navigation }) {
  const [NotificationOn, setNotificationOn] = useState(false);

  const toggleNotification = () => {
    setNotificationOn(!NotificationOn);
  };

  return (
    <View style={styles.container}>
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>7일 남았을 때 알림받기</Text>
        <TouchableOpacity onPress={toggleNotification} style={styles.toggleButton}>
          <Text style={styles.toggleText}>{NotificationOn ? 'Off' : 'On'}</Text>
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
    marginRight:20,
  },
  toggleText: {
    color: 'white',
    fontSize: 16,
  },
});
