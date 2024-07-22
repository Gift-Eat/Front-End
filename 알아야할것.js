// # 1. main 브랜치로 전환 후 최신 상태로 업데이트
// git checkout main
// git pull origin main

// # 2. main 브랜치의 파일 복사 (예: 전체 파일을 복사하려는 경우)
// git checkout mainpage
// git pull origin mainpage

// # 특정 폴더에 main 브랜치의 파일을 덮어쓰려면, 파일을 가져올 위치로 이동
// git checkout main -- .
// # 또는 특정 디렉토리만 가져오려면
// # git checkout main -- <path-to-specific-directory>

// # 3. mainpage 브랜치로 전환
// git checkout mainpage

// # 4. 파일 덮어쓰기 (이미 checkout으로 가져왔기 때문에 별도의 명령은 필요 없음)

// # 5. 변경 사항을 커밋하고 푸시
// git add .
// git commit -m "Merge files from main branch to mainpage folder"
// git push origin mainpage



// npm install react-native-push-notification   알람보내는 npm

// expo install expo-background-fetch expo-task-manager   앱이 백그라운드에서 주기적으로 실행시켜주는 expo