import axios from "axios";
import { launchImageLibrary } from "react-native-image-picker";
import Constants from "expo-constants";

const giftyconInfoData = {
  store: "",
  name: "",
  code: "",
  expirationDate: "",
};

// 이미지 URI를 바탕으로 OCR 정보를 추출하는 함수
export const checkOCR = async (imgUri) => {
  console.log("asdfasdf");
  try {
    const giftyconInfo = await processImage(imgUri);
    console.log("giftyconInfo", giftyconInfo);

    return giftyconInfo;
  } catch (e) {
    console.error(e);
  }
};

// Google Cloud Vision API를 호출하는 함수
const processImage = async (imgUri) => {
  try {
    const base64Image = await convertToBase64(imgUri);

    // const apiKey = "AIzaSyDpfl1UWCW69OyL0ZmrpcUOWyrTKdO36A0";
    const apiKey = Constants.expoConfig.extra.googleCloudVisionApiKey;
    const request = {
      requests: [
        {
          image: {
            content: base64Image,
          },
          features: [
            {
              type: "TEXT_DETECTION",
              maxResults: 1,
            },
          ],
        },
      ],
    };

    const response = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${AIzaSyDpfl1UWCW69OyL0ZmrpcUOWyrTKdO36A0}`,
      request
    );
    const ocrResult = response.data.responses[0].textAnnotations;
    const parsedInfo = parseOcrResult(ocrResult);

    return parsedInfo;
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
};

// 이미지 URI를 Base64로 변환하는 함수
const convertToBase64 = (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result.split(",")[1]);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.onerror = function (error) {
      reject(error);
    };
    xhr.open("GET", uri);
    xhr.responseType = "blob";
    xhr.send();
  });
};

// OCR 결과를 파싱하여 giftyconInfoData에 저장하는 함수
const parseOcrResult = (ocrResult) => {
  const giftyconInfo = { ...giftyconInfoData };

  // 예시: OCR 결과에서 정보를 추출하여 giftyconInfo에 저장
  if (ocrResult && ocrResult.length > 0) {
    const text = ocrResult[0].description;
    const lines = text.split("\n");

    // 각 라인을 파싱하여 필요한 정보를 추출 (여기서는 예시로 임의로 추출)
    lines.forEach((line) => {
      if (line.includes("Store:")) {
        giftyconInfo.store = line.replace("Store:", "").trim();
      } else if (line.includes("Name:")) {
        giftyconInfo.name = line.replace("Name:", "").trim();
      } else if (line.includes("Code:")) {
        giftyconInfo.code = line.replace("Code:", "").trim();
      } else if (line.includes("Expiration Date:")) {
        giftyconInfo.expirationDate = line.replace("Expiration Date:", "").trim();
      }
    });
  }

  return giftyconInfo;
};
