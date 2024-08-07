import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import PushNotification from 'react-native-push-notification';

// Define the task
TaskManager.defineTask('BACKGROUND_FETCH_TASK', async () => {
  try {
    // Fetch gifticons and check for expiration
    const response = await fetch('http://52.78.201.166:8080/api/be/gifticons');
    const gifticons = await response.json();

    gifticons.forEach(gifticon => {
      const daysLeft = calculateDaysLeft(gifticon.expiration_date);
      if (daysLeft === 7) {
        scheduleNotification(gifticon.gifticon_name, 7);
      } else if (daysLeft === 30) {
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
