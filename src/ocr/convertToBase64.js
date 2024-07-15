
// 이미지 URI를 Base64로 변환하는 함수
export const convertToBase64 = (uri) => {
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
  