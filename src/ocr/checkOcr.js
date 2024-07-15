import { launchImageLibrary } from "react-native-image-picker";
import Constants from "expo-constants";
import {processImage} from './processImage.js'

// 이미지 URI를 바탕으로 OCR 정보를 추출하는 함수
export const checkOcr = async (imgUri) => {
  try {
    const giftyconInfo = await processImage(imgUri);


    return giftyconInfo;
  } catch (e) {
    console.error(e);
  }
};

