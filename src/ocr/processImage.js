import axios from "axios";
import { convertToBase64 } from "./convertToBase64";
import { parseOcrResult } from "./praseOcrResult";

// Google Cloud Vision API를 호출하는 함수
export const processImage = async (imgUri) => {
  try {
    const base64Image = await convertToBase64(imgUri);

    const apiKey = 'AIzaSyDpfl1UWCW69OyL0ZmrpcUOWyrTKdO36A0';
    
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
      `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
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
