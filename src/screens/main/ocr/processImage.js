import axios from "axios";
import { convertToBase64 } from "./convertToBase64";
import { parseOcrResult } from "./praseOcrResult";
import { REACT_APP_OPENAI_API_KEY } from "@env";

// Google Cloud Vision API를 호출하는 함수
export const processImage = async (imgUri) => {
  try {
    const base64Image = await convertToBase64(imgUri);
    console.log("apiKey", REACT_APP_OPENAI_API_KEY)
    const prompt = `안뇽`;
    // const prompt = `${base64Image}\n사진에서 사용처, 상품명, 코드, 유효기간을 추출해줘. 형식은 다음과 같아\n[형식]\nresult ={\nstore:\nproductName:\ncode:\nexpirationPeriod:\n}`;
    console.log(prompt)
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: "gpt-4o-mini",  // gpt-4o-mini 모델을 사용할 경우 해당 모델 이름으로 변경
        prompt: prompt,
        max_tokens: 150,
      },
      {
        headers: {
          'Authorization': `Bearer ${REACT_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('gpt 질문 완료')

    const ocrResult  = response.data.choices[0].text.trim();
    console.log('gpt 질문 결과', ocrResult)

    const parsedInfo = parseOcrResult(ocrResult);

    return parsedInfo;
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
};