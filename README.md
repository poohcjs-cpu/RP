# 주식 용어 그림사전 📈

그림과 비유로 주식 용어를 직관적으로 배우는 웹 앱이에요.

## 무엇을 할 수 있나요?

- **용어 56개 · 8개 주제**: 주식 기초, 주문 · 거래, 차트 읽기, 가치 평가, 재무제표, 시장 흐름, 기업 이벤트, 투자 전략 · 위험
- **용어마다 직접 그린 그림** + 한 줄 정의 + 일상 비유 + 핵심 포인트 + 숫자 예시 + 주의할 점
- **직접 해보기 7종**: 캔들 만들기, 호가창 주문 체험(시장가 · 지정가), PER 계산기, 평균단가 계산기, 복리 계산기, 손실 회복 계산기, 레버리지 체험
- **O/X 확인 문제**와 **퀴즈**(설명 → 용어, 용어 → 뜻, O/X)
- **학습 기록**: 이해한 용어, 즐겨찾기, 퀴즈에서 틀린 용어(복습 필요)를 브라우저에 저장
- **초성 검색** (예: `ㅅㄱㅊㅇ` → 시가총액), 입문 코스 10단계, 오늘의 용어
- 한국 증권사 관례에 맞춘 색깔: **빨강 = 상승 · 매수, 파랑 = 하락 · 매도**
- 휴대폰 화면 우선 설계, 다크 모드 지원

## 실행하기

```bash
npm install
npm run dev      # 개발 서버
npm run build    # 배포용 빌드 (dist/)
npm run lint
```

`main` 브랜치에 푸시하면 GitHub Actions(`.github/workflows/deploy.yml`)가 GitHub Pages(`/RP/`)로 배포해요.

## 폴더 구조

```
src/
  data/terms.js         용어 내용 (정의 · 비유 · 포인트 · 예시 · O/X)
  data/categories.js    주제 · 난이도 · 입문 코스
  illustrations/        용어별 SVG 그림 (kit.jsx = 공통 부품)
  widgets/              직접 해보기 계산기 · 시뮬레이터
  pages/                홈 · 용어사전 · 용어 상세 · 퀴즈 · 내 학습
  lib/                  해시 라우터 · 검색 · 퀴즈 생성 · 학습 기록
```

용어를 추가하려면 `src/data/terms.js`에 항목을 넣고, 같은 `id`로 `src/illustrations/`에 그림 컴포넌트를 등록하면 돼요.

> 교육용 자료이며 투자 권유가 아니에요. 세율 · 거래 제도는 바뀔 수 있어요.

## Android 앱(APK) 만들기

[Capacitor](https://capacitorjs.com)로 같은 웹 앱을 Android 앱으로 감쌌어요. 앱 안에 화면이 모두 들어 있어서 인터넷 없이도 동작해요.

준비물: Node.js, JDK 21, Android SDK (platform 36, build-tools 36)

```bash
npm install
npm run android:sync          # 앱용 웹 빌드(dist-app) → android 프로젝트로 복사
cd android && ./gradlew assembleDebug     # 테스트용 APK
# 결과: android/app/build/outputs/apk/debug/app-debug.apk
```

릴리스(서명된) APK가 필요하면 `android/keystore.properties`에 서명 키 정보를 넣고 `npm run android:apk`를 실행하세요.
(`storeFile`, `storePassword`, `keyAlias`, `keyPassword` — 이 파일과 키 파일은 git 에 올리지 않아요.)
같은 앱을 업데이트하려면 처음 설치한 APK와 **같은 키**로 서명해야 해요.
