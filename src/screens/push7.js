import React, { useEffect } from "react";
import { View, Text } from "react-native";
import PushNotification from "react-native-push-notification";
import axios from "axios"; // 예시로 사용

PushNotification.configure({
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
    },
    requestPermissions: true,
  });
  
const scheduleNotification = (gifticon_name) => {
    PushNotification.localNotification({
    title: "기프티콘 알림",
    message: `기프티콘 "${gifticon_name}"이(가) 7일 남았습니다!`,
    channelId: "default-channel-id",
    });
};

const checkAndNotify = async (gifticons) => {
    const today = new Date();

    gifticons.forEach((gifticon) => {
    const daysLeft = calculateDaysLeft(gifticon.expiration_date);
    if (daysLeft === 7) {
        scheduleNotification(gifticon.gifticon_name);
    }
  });
};

const GifticonManager = () => {
  useEffect(() => {
    // 기프티콘 데이터를 서버에서 불러오기
    const fetchGifticons = async () => {
      try {
        const response = await axios.get("http://52.78.201.166:8080/api/be/gifticons"); // 예시 URL
        const gifticons = response.data;
        checkAndNotify(gifticons);
      } catch (error) {
        console.error("Error fetching gifticons:", error);
      }
    };

    fetchGifticons();
    const interval = setInterval(fetchGifticons, 24 * 60 * 60 * 1000); // 매일 24시간마다 확인

    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <Text>기프티콘 관리 중...</Text>
    </View>
  );
};

export default GifticonManager;
