
const giftyconInfoData = {
    store: "",
    name: "",
    code: "",
    expirationDate: "",
};
// OCR 결과를 파싱하여 giftyconInfoData에 저장하는 함수
export const parseOcrResult = (ocrResult) => {

    const giftyconInfo = { ...giftyconInfoData };

    if (ocrResult && ocrResult.length > 0) {
        const text = ocrResult[0].description;
        const lines = text.split("\n");

        // 각 라인의 정보를 고정된 순서로 추출
        if (lines.length >= 12) {
            giftyconInfo.store = lines[1].trim(); // 2번째 줄: 사용처
            giftyconInfo.name = lines[6].trim(); // 7번째 줄: 상품명
            giftyconInfo.code = lines[7].trim(); // 8번째 줄: 기프티콘 코드
            if (lines.length > 11) {
                giftyconInfo.expirationDate = lines[11].trim(); // 12번째 줄: 유효기간
            }
        }
    }

    return giftyconInfo;
};