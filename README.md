
<!-- <h1 align=center>Everstamp</h1> -->


<img width="1080" alt="everstamp_main" src="https://github.com/user-attachments/assets/bc58345a-7225-447e-a057-0a64c7b988ba">

### 프로젝트 개요

- **프로젝트명**

	습관 관리와 감정일기를 한번에, <b>Everstamp</b>

- **서비스 제공**
  - 웹사이트 :  [Everstamp 🔗](https://everstamp.site/)
  - 안드로이드 : [APK 설치 파일 제공 🗂️](https://everstamp.site/download/Everstamp.apk)
  - PWA(Progressive Web Apps) 지원
- **기획 동기**

  일기 앱과 습관 관리 앱을 별도로 사용할 때 발생하는 불편함을 해소하기 위해 기획되었습니다.
  일기 작성과 습관 관리 기능을 통합하고 멀티 플랫폼을 지원하여 사용자 편의성을 높이고자 하였습니다.
  부가적으로 프로젝트를 진행하며 Next.js 13의 서버 컴포넌트를 활용하여 개발 역량을 강화하고, 외부 라이브러리 사용을 최소화하여 의존도를 낮추는 것을 목표로 하였습니다.

  

- **프로젝트 설명**

  이 프로젝트는 일기 작성과 습관 관리를 동시에 할 수 있는 웹 애플리케이션입니다. 관계형 데이터베이스를 활용하여 일기와 습관 정보를 효율적으로 관리하고, 달력 보기, 리스트 보기, 필터링 등 다양한 방법을 이용하여 사용자에게 가공된 정보를 제공합니다.

  - **일기 작성** : 텍스트, 사진, 감정, 완료 습관 등으로 이루어진 정보로 일기가 작성됩니다.
  - **일기 보기**
    - **달력** : 날짜별 일기 감정, 완료한 습관 개수를 유저가 한눈에 파악할 수 있도록 보여줍니다.
    - **리스트** : 감정별, 월별 모아보기 기능과 정렬 기능을 지원합니다.
  - **습관 관리** : 최대 18개까지 목표 습관을 추가 가능하며 최근 4일 동안의 습관 수행 여부를 체크 가능합니다.
  - **멀티 플랫폼 지원** : 회원가입(카카오, 네이버, 구글) 및 로그인 이후 웹, 모바일 등 다양한 환겨에서 싱행 가능합니다.


- **개발 회고**
<!--	- 블로그글 1
	- 블로그글 2
  - 블로그글 3 -->

<br>

### 프로젝트 기술 스택

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

<!--
- **Server**
  
	![amazonec2](https://img.shields.io/badge/EC2-ed8233?style=flat&logo=amazonec2&logoColor=white)
	![amazons3](https://img.shields.io/badge/S3-da5141?style=flat&logo=amazons3&logoColor=white)
	![awslambda](https://img.shields.io/badge/Lambda-d26214?style=flat&logo=awslambda&logoColor=white)
 -->

<br>


### 프로젝트 미리보기
<br>
<img width="1080" alt="es_readme_1" src="https://github.com/user-attachments/assets/03ddfb91-6cde-4fd3-85ad-9060acd778bc">
<!--<img width="1080" alt="mobile" src="https://github.com/user-attachments/assets/e8333d9f-881a-44e8-80e5-47e867bf97a9">-->
<h4 align=center > Mobile</h4>
<img width="1080" alt="tablet desktop" src="https://github.com/user-attachments/assets/f9e2eb3b-cf13-4c24-ac13-3232b4659d87">
<h4 align=center > Tablet & Desktop</h4>


- 더 많은 이미지 및 프로젝트 정보는 노션 페이지 참조  [everstamp notion 🔗](https://./)

<br>


### 프로젝트 구조

<img width="1080" alt="everstamp 구조" src="https://github.com/user-attachments/assets/acd9fbd5-621b-4981-b8f6-edce5240fcb4">

#### front

```
.
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── pages/
│   │   ├── index.tsx
│   │   ├── diary/
│   │   │   ├── index.tsx
│   │   │   └── [id].tsx
│   │   └── habit/
│   │       └── index.tsx
│   ├── lib/
│   │   ├── db.ts
│   │   └── ...
│   └── styles/
│       ├── globals.css
│       └── ...
├── prisma/
│   └── schema.prisma
├── next.config.js
├── package.json
└── README.md
```

#### back

```
.
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── pages/
│   │   ├── index.tsx
│   │   ├── diary/
│   │   │   ├── index.tsx
│   │   │   └── [id].tsx
│   │   └── habit/
│   │       └── index.tsx
│   ├── lib/
│   │   ├── db.ts
│   │   └── ...
│   └── styles/
│       ├── globals.css
│       └── ...
├── prisma/
│   └── schema.prisma
├── next.config.js
├── package.json
└── README.md
```

<br>



### 개선 예정 사항

- [ ] 앱 환경 구축
  - [x] PWA(웹앱) 기능 추가
  - [x] 안드로이드 apk 파일 다운로드 기능 추가
  - [ ] play 스토어 등록
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

