
<!-- <h1 align=center>Everstamp</h1> -->

<img width="1024" alt="main2" src="https://github.com/user-attachments/assets/b0584c8d-a51d-40a6-b3d3-7d1d4b1ba80b" />


### 1. 프로젝트 개요

- **프로젝트명**

	습관 관리와 감정일기를 한번에, <b>에버스탬프</b>

- **서비스 제공**
  - 웹사이트 :  [https://everstamp.site 🔗](https://everstamp.site/)
  - 안드로이드 : [Google Play Store 🔗](https://play.google.com/store/apps/details?id=com.everstamp&pcampaignid=web_share)
  - Other OS : PWA(Progressive Web Apps) 지원
- **기획 동기**

  일기 앱과 습관 관리 앱을 별도로 사용할 때 발생하는 불편함을 해소하기 위해 기획하였습니다.
  프로젝트의 주된 목표는 일기 작성과 습관 관리 기능을 통합하고 멀티 플랫폼을 지원하여 사용자 편의성을 높이는 것 입니다.
  부가적으로 프로젝트를 진행하며 Next.js 13의 서버 컴포넌트를 활용하여 개발 역량을 강화하고, 외부 라이브러리 사용을 최소화하여 의존도를 낮추는 것을 목표로 하였습니다.

  

- **프로젝트 설명**

  이 프로젝트는 일기 작성과 습관 관리를 동시에 지원하는 웹 애플리케이션입니다. 관계형 데이터베이스를 활용하여 일기와 습관 정보를 효율적으로 관리하고, 달력 형태, 목록 형태, 필터링, 그래프 등 다양한 방식을 통하여 사용자에게 정보를 제공합니다.

  - **회원가입 & 로그인** : SNS 회원가입 및 로그인 기능을 지원 (카카오, 네이버, 구글)
  - **일기 작성** : 텍스트, 사진, 감정 표현, 완료된 습관 항목 등으로 이루어진 정보로 일기 작성
  - **일기 표현 형태**
    - **달력 형태** : 한 달 동안의 감정 변화와 습관 수행 정도를 한눈에 파악 가능한 달력 형태의 보기 기능
    - **목록 형태** : 순차적으로 일기 확인이 가능한 목록 형태의 보기 기능 (+필터링(감정, 월), 정렬 기능 지원)
  - **습관 관리** : 최근 4일 동안의 습관 수행 여부를 체크 (최대 18개까지 목표 습관 추가 가능)
  - **습관 실천 정보** : 연/월간 성취 파악을 위한 달력, 그래프 형태로 습관 실천 정보 제공 
  - **멀티 플랫폼 지원** : 데스크탑, 태블릿, 모바일 등 다양한 환경에서 UI 최적화 및 실행 가능
  - **기타 편의 기능**
    - 자유로운 습관 목록 순서 변경 기능
    - 테마 색상 변경 기능 

<!--
- **개발 회고(velog)**
	- .
 	- . -->

<br>

### 2. 프로젝트 기술 스택

- **Front-End**

  ![TypeScript](https://img.shields.io/badge/TypeScript-2f73bf?style=flat&logo=typescript&logoColor=white)
  ![React](https://img.shields.io/badge/React-5ed2f3?style=flat&logo=React&logoColor=white)
  ![next](https://img.shields.io/badge/Next.js-black?style=flat&logo=React&logoColor=white)
  ![nextauth](https://img.shields.io/badge/NextAuth-B428E4?style=flat&logo=React&logoColor=white)
  ![styledcomponent](https://img.shields.io/badge/styledcomponent-244bdd?style=flat&logo=css3&logoColor=white)

- **Back-End**
  
	![nodedotjs](https://img.shields.io/badge/Node.js-ebd81b?style=flat&logo=nodedotjs&logoColor=white)
	![express](https://img.shields.io/badge/Express.js-7ab800?style=flat&logo=express&logoColor=white)
	![mysql](https://img.shields.io/badge/MySQL-01718b?style=flat&logo=mysql&logoColor=white)
	![sequelize](https://img.shields.io/badge/Sequelize-0ca9e7?style=flat&logo=sequelize&logoColor=white)

- **State Management**
  
	![reactquery](https://img.shields.io/badge/ReactQuery-f73e51?style=flat&logo=reactquery&logoColor=white)
	![local](https://img.shields.io/badge/LocalStorage-grey?style=flat&logo=&logoColor=white)


- **Server & Security**
  
	![amazonec2](https://img.shields.io/badge/EC2-ed8233?style=flat&logo=amazonec2&logoColor=white)
	![amazons3](https://img.shields.io/badge/S3-da5141?style=flat&logo=amazons3&logoColor=white)
	![awslambda](https://img.shields.io/badge/Lambda-d26214?style=flat&logo=awslambda&logoColor=white)
	![NginX](https://img.shields.io/badge/NginX-green?style=flat&logo=nginx&logoColor=white)
	![letsEncrypt](https://img.shields.io/badge/Let's_Encrypt-blue.svg?logo=let%E2%80%99s-encrypt)


<br>


### 3. 프로젝트 미리보기
<br>
<img width="1080" alt="everstamp_Preview1" src="https://github.com/user-attachments/assets/0524ecea-597e-4d25-b0b6-8c708504c46c" />
<h4 align=center > Mobile</h4>
<img width="1080" alt="everstamp_Preview2" src="https://github.com/user-attachments/assets/dc48a8ed-a6fd-459c-b7b0-09f7bc1ad95d" />
<h4 align=center > Tablet & Desktop</h4>


- 더 많은 프로젝트 정보 및 이미지는 [노션 페이지](https://eunonote.notion.site/FE-Developer-7fe46851557d45038a8b756146d98929?pvs=4)
 참조

<br>


### 4. 프로젝트 구조

<img width="1080" alt="everstamp 구조" src="https://github.com/user-attachments/assets/acd9fbd5-621b-4981-b8f6-edce5240fcb4">

#### front

```
front
├── public/
├── src
│   ├── Axios/
│   ├── app
│   │   ├── (error)/
│   │   ├── api/
│   │   ├── app
│   │   │   ├── (afterLogin)
│   │   │   │   ├── @modal/
│   │   │   │   ├── calendar/
│   │   │   │   ├── habit/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── list/
│   │   │   │   └── setting/
│   │   │   │   ├── inter
│   │   │   │   │   ├── habitInfo/
│   │   │   │   │   ├── habitOrder/
│   │   │   │   │   ├── input
│   │   │   │   │   │   ├── addDiary/
│   │   │   │   │   │   ├── addHabit/
│   │   │   │   │   │   ├── editDiary/
│   │   │   │   │   │   └── editHabit/
│   │   │   │   │   └── zoom/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   ├── offline/
│   │   └── page.tsx
│   ├── auth.ts
│   ├── component/
│   ├── fonts/
│   ├── function/
│   ├── middleware.ts
│   └── style/
├── README.md
└── package.json
```

#### back

```
back
├── app.js
├── config
│   └── config.js
├── function
│   ├── decrypt.js
│   └── encrypt.js
├── middleware
│   └── tokenCheck.js
├── migrations/
├── models
│   ├── diary.js
│   ├── habit.js
│   ├── image.js
│   ├── index.js
│   └── user.js
├── package.json
├── pnpm-lock.yaml
├── routes
│   ├── diary.js
│   ├── habit.js
│   ├── image.js
│   └── user.js
└── seeders
```

<br>



### 5. 개선 예정 사항

- [x] 앱 환경 구축
  - [x] PWA(웹앱) 기능 추가
  - [x] 안드로이드 apk 파일 다운로드 기능 추가
  - [x] play 스토어 등록
- [x] 편의기능 구현
  - [x] 목표 습관 커스텀 정렬 기능 추가
  - [x] 일기 감정별 모아보기 기능 추가
  - [x] 일기 월별 모아보기 기능 추가
  - [x] 페이지 이동 시간이 길어지는 경우 로딩 프로그래스바 추가
- [ ] 회원 탈되 이메일 인증 과정 추가
- [ ] 코드 정리 및 리렌더링 최적화
- [ ] 예정 알림 기능 추가


<!--
서버, 클라이언트 컴포넌트
넥스트 개념
앱 라우터
쿠키 연동 제대로 안되던 문제
라이브러리 사용 최소화
무엇을 배웠는지
특징이 무엇인지
-->

