import axios from "axios";
import { convertToBase64 } from "./convertToBase64";
import { parseOcrResult } from "./praseOcrResult"; // 오타 수정: 'praseOcrResult' -> 'parseOcrResult'
import { REACT_APP_OPENAI_API_KEY } from "@env";

const instance = axios.create({
  baseURL: 'https://api.openai.com/v1/chat/completions', // 엔드포인트 변경
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${REACT_APP_OPENAI_API_KEY}`
  }
});

// OpenAI VISION을 호출하는 함수
export const processImage = async (imgUri) => {
  const base64Image = await convertToBase64(imgUri);
  const prompt = `제공된 기프티콘 이미지를 분석하여 다음의 정보를 추출해. 결과는 다음 JSON 형식으로 반환해야만 해.${'\n\n'}store: 기프티콘을 사용할 수 있는 매장 또는 브랜드 이름.productName: 기프티콘으로 받을 수 있는 상품 또는 서비스 이름.code: 기프티콘에 적힌 고유 코드 또는 일련번호.nexpirationDate: 기프티콘의 유효기간, YYYY-MM-DD 형식으로 작성.`
  const messages = [
    {
      "role": "user",
      "content": [
        { "type": "text", "text": prompt },
        {
          "type": "image_url",
          "image_url": {
            "url": 'https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/916/9204a53cde5c9857ba889300c5d3a625_res.jpeg',
          }
        }
      ]
    }
  ];

  try {
    const response = await instance.post('', {
      model: 'gpt-4o-mini', // 최신 모델로 유지
      messages: messages, // 메시지 배열 사용
      max_tokens: 100
    });
    const jsonPart = response.data.choices[0].message.content.match(/\{[\s\S`]*\}/)[0];

    return JSON.parse(jsonPart);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return '';
  }
};