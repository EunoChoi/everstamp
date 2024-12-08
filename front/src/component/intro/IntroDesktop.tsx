'use client';


import ImageCarousel from "../common/ImageCarousel";

import Image from "next/image";
import styled from "styled-components";

import calendar from '/public/img/intro/calendar.png';
import list from '/public/img/intro/list.png';
import list2 from '/public/img/intro/list2.png';
import zoom1 from '/public/img/intro/zoom1.png';
import zoom2 from '/public/img/intro/zoom2.png';
import habit from '/public/img/intro/habit.png';
import habitinfo1 from '/public/img/intro/habitinfo1.png';
import habitinfo2 from '/public/img/intro/habitinfo2.png';
import setting from '/public/img/intro/setting.png';
import habitorder from '/public/img/intro/habitorder.png';
import emotions from '/public/img/emotion/emotions.png';
import habitbox from '/public/img/intro/habitbox.png';
import otherinfo1 from '/public/img/intro/otherinfo1.png';
import otherinfo2 from '/public/img/intro/otherinfo2.png';
import otherinfo3 from '/public/img/intro/otherinfo3.png';
import login from '/public/img/intro/login.png';

import pc_addHabit from '/public/img/intro/pc_addHabit.png';
import pc_calendar from '/public/img/intro/pc_calendar.png';
import pc_habit from '/public/img/intro/pc_habit.png';
import pc_habitinfo1 from '/public/img/intro/pc_habitinfo1.png';
import pc_habitinfo2 from '/public/img/intro/pc_habitinfo2.png';
import pc_list from '/public/img/intro/pc_list.png';
import pc_list2 from '/public/img/intro/pc_list2.png';
import pc_login from '/public/img/intro/pc_login.png';
import pc_setting from '/public/img/intro/pc_setting.png';
import pc_zoom1 from '/public/img/intro/pc_zoom1.png';

import ipad_calendar from '/public/img/intro/ipad_calendar.png';
import ipad_list from '/public/img/intro/ipad_list.png';
import ipad_list2 from '/public/img/intro/ipad_list2.png';
import ipad_login from '/public/img/intro/ipad_login.png';




import AndroidIcon from '@mui/icons-material/Android';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import { useEffect, useState } from "react";
import { useCustomRouter } from "@/function/customRouter";
import nProgress from "nprogress";
import { closeSnackbar, enqueueSnackbar, SnackbarKey } from "notistack";
import $Common from "@/style/common";


const IntroDesktop = () => {

  const introImages = [calendar, list, list2, zoom1, zoom2, habit, habitinfo1, habitinfo2, setting, habitorder];
  const viewImages = [calendar, list, list2, zoom1];
  const habitImages = [habitinfo1, habitinfo2];
  const otherInfoImages = [otherinfo1, otherinfo2, otherinfo3];
  const uiImages = [calendar, pc_calendar, ipad_calendar, list, pc_list, ipad_list, list2, pc_list2, ipad_list2, zoom1, pc_zoom1, zoom2, habit, pc_habit, pc_addHabit, habitinfo1, pc_habitinfo1, habitinfo2, pc_habitinfo2, login, pc_login, ipad_login, setting, pc_setting];

  const router = useCustomRouter();

  nProgress.configure({
    showSpinner: true,
    easing: 'ease',
    speed: 500,
    minimum: 0.3
  });

  //pwa
  const [pwa, setPwa] = useState<any>(null);
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setPwa(e);
    }
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }
  }, []);
  const installPwa = () => {
    if (pwa) {
      pwa.prompt();
      pwa.userChoice.then((result: any) => {
        if (result.outcome === 'accepted') {
          console.log('install pwa...');
        }
        else {
          console.log('deny');
        }
        setPwa(null);
      })
    }
    else {
      alert(`이미 앱이 설치되어 있는 경우 혹은\n퀵 설치 기능을 지원하지 않는 브라우저입니다.\n \n '메뉴(공유하기)->홈 화면에 추가'를\n진행하여 앱을 설치해주세요. \n\n *크롬(안드로이드), 사파리(iOS) 브라우저에 최적화 되어있습니다.`);
    }
  }
  const StartInWebText = () => (
    <div>
      <p>웹에서 계속 진행하시겠습니까?</p>
      <p style={{ fontSize: '15px', marginTop: '8px', color: '#DC7889' }}>🚨 실행 환경에 따라 레이아웃이 어긋날 수 있습니다.</p>
      <p style={{ fontSize: '15px', color: '#DC7889' }}>원할한 이용을 위해 앱을 설치해주세요.</p>
    </div>
  );
  const goToPlayStore = () => {
    router.push('https://play.google.com/store/apps/details?id=com.everstamp&pcampaignid=web_share');
  }
  const startInWeb = () => {
    const action = (snackbarId: SnackbarKey) => (
      <>
        <$Common.YesOrNo className="no" onClick={() => {
          closeSnackbar('startInWeb');
        }}>
          No
        </$Common.YesOrNo>
        <$Common.YesOrNo className="yes" onClick={() => {
          closeSnackbar('startInWeb');
          router.push('/app')
        }}>
          Yes
        </$Common.YesOrNo>
      </>
    );
    enqueueSnackbar(<StartInWebText />, { key: 'startInWeb', persist: true, action, autoHideDuration: 6000 });
  }

  return <Wrapper>
    <Desktop_Section className="intro">
      <section>
        <Logo>
          <span>everstamp</span>
        </Logo>
        <Text>
          <span>내일 더 나은 나로 나아가기 위해</span>
          <span>감정 일기와 습관 만들기를 시작하세요.</span>
        </Text>
        <DownLoadButtons>
          {/* <a href="/download/Everstamp.apk" download>
            <Button><AndroidIcon className="icon" fontSize="small" />APK</Button>
          </a> */}
          <Button onClick={goToPlayStore}>
            <AndroidIcon className="icon" fontSize="small" />Android
          </Button>
          <Button onClick={installPwa}><InstallMobileIcon className="icon" fontSize="small" />PWA</Button>
          <Button className="web" onClick={() => {
            startInWeb();
          }}>웹에서 실행하기</Button>
        </DownLoadButtons>
        <ColWrapper>
          <SubText>iOS 사용자의 경우 PWA를 설치하여 이용 가능합니다.</SubText>
          <SubText>*로그인 화면이 나타나지 않는 경우, 앱을 재실행 해주세요.</SubText>
        </ColWrapper>
      </section>
      <section>
        <ImageCarousel images={introImages} keyValue="intro" type="fullWidth" width="100%" height="85%" borderRadius="28px" />
      </section>
    </Desktop_Section>
    <Desktop_Section className="emotion">
      <section>
        <Img className="emotionImg" src={emotions} alt="emotions" width={700} height={700}></Img>
      </section>
      <section>
        <Title>#emotions</Title>
        <Text>
          <span>감정을 정리하고 기록하세요.</span>
          <span>긍정적 변화가 시작됩니다.</span>
          <span>함께 감정 일기를 시작해볼까요?</span>
        </Text>
        <ColWrapper>
          <SubText>'기쁨', '행복', '무난한 감정', '슬픔', '분노'</SubText>
          <SubText>5가지 감정 선택을 지원합니다.</SubText>
        </ColWrapper>
      </section>
    </Desktop_Section>
    <Desktop_Section className="view">
      <section>
        <Title>#view feature</Title>
        <Text>
          <span>일기, 감정, 습관 목록을</span>
          <span>한눈에 확인 하세요.</span>
        </Text>
        <ColWrapper>
          <SubText>리스트 뷰에서 감정별 모아보기와</SubText>
          <SubText>날짜별 오름/내림 차순 정렬을 지원합니다.</SubText>
        </ColWrapper>
      </section>
      <section>
        <ImageCarousel images={viewImages} keyValue="view" type="fullWidth" width="100%" height="85%" borderRadius="28px" />
      </section>
    </Desktop_Section>
    <Desktop_Section className="habit small">
      <section>
        <Img className="habitbox" src={habitbox} alt="habitbox" width={300} height={300}></Img>
      </section>
      <section>
        <Title>#habit feature</Title>
        <Text>
          <span>완벽하지 않아도 괜찮습니다.</span>
          <span>부담없는 습관부터 시도하세요.</span>
        </Text>
        <ColWrapper>
          <SubText>습관 목록은 최대 18개까지 생성 가능하며</SubText>
          <SubText>최근 4일 동안만 완료 여부를 선택할 수 있습니다.</SubText>
        </ColWrapper>
      </section>
    </Desktop_Section>
    <Desktop_Section className="habit">
      <section>
        <ImageCarousel images={habitImages} keyValue="habit" type="fullWidth" width="100%" height="85%" borderRadius="28px" />
      </section>
      <section>
        <Title>#habit view feature</Title>
        <Text>
          <span>습관이 형성되는 시간 21일</span>
          <span>실천 결과를 확인하고 점검하세요.</span>
        </Text>
        <ColWrapper>
          <SubText>월간 습관 실천 여부는 달력 형태로</SubText>
          <SubText>연간 실천 여부는 그래프로 확인 가능합니다.</SubText>
        </ColWrapper>
      </section>
    </Desktop_Section>
    <Desktop_Section className="ui center">
      <Title>#Responsive UI</Title>
      <Text>
        <span>모바일, 데스크탑 PC, 태블릿 등</span>
        <span>다양한 환경에 최적화된 UI를 제공합니다.</span>
      </Text>
      <ImageWrapper className="ui">
        {uiImages.map((e, i) => <Image className="uiImage" key={'ui images' + i} src={e} alt='ui images' width={300} height={300} priority />)}
      </ImageWrapper>
    </Desktop_Section>
    <Desktop_Section className="others center">
      <Title>#other feature</Title>
      <Text>
        <span>암호화, 테마, 멀티 플랫폼 최적화 등</span>
        <span>추가적인 사용자 편의 기능을 제공합니다.</span>
      </Text>
      <ImageWrapper>
        {otherInfoImages.map((e, i) => <Img className="otherinfo" key={'otherinfo images' + i} src={e} alt='otherinfo' width={600} height={600} priority />)}
      </ImageWrapper>
    </Desktop_Section>
    <Desktop_Section className="outro center">
      <DownLoadButtons>
        {/* <a href="/download/Everstamp.apk" download>
          <Button className="bottom" ><AndroidIcon className="icon" fontSize="small" />APK</Button>
        </a> */}
        <Button className="bottom" onClick={goToPlayStore}>
          <AndroidIcon className="icon" fontSize="small" />Android
        </Button>
        <Button className="bottom" onClick={installPwa}><InstallMobileIcon className="icon" fontSize="small" />PWA</Button>
        <Button className="web bottom" onClick={() => {
          startInWeb();
        }}>웹에서 실행하기</Button>
      </DownLoadButtons>
      <Logo className="outro">
        <span>everstamp</span>
      </Logo>
    </Desktop_Section>
  </Wrapper >;
}

export default IntroDesktop;

const DownLoadButtons = styled.div`
  display: flex;
`
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 3px solid rgba(0,0,0,0.07);
  white-space: nowrap;

  margin: 0 6px;
  padding: 6px 18px;
  /* width: 110px; */
  border-radius: 32px;

  font-size: 14px;
  font-weight: 600;

  color: rgb(var(--greyTitle));
  background-color: #d7daeb;
  background-color: ${(props) => props.theme.point ? props.theme.point + '50' : '#d7daeb'};


  &.web{
    padding: 6px 32px;
    background-color: rgba(0,0,0,0);
    border-color: #c1c5db;
    border-color: ${(props) => props.theme.point ? props.theme.point + '70' : '#c1c5db'};
  }
  &.bottom{
    background-color: rgba(255,255,255,0.8);
    background-color: white;
    border-color: ${(props) => props.theme.point ? props.theme.point + '70' : '#c1c5db'};
    color: rgb(var(--greyTitle));
  }
  .icon{
    margin-right: 8px;
  }
`


//desktop
const Desktop_Section = styled.section`
  height: 95dvh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0 10dvw;

  &.intro, &.view, &.ui{
    background-color: #fff;
  }
  &.emotion, &.habit,  &.others{
    background-color: #EFF0F6;
    background-color : ${(props) => props.theme.point ? props.theme.point + '20' : '#EFF0F6'};
  }
  &.outro{
    height: 50dvh;
    background-color: #979FC7;
    background-color : ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  }
  &.small{
    height: 60dvh;
  }

  >section{
    width: 50%; 
    height: 100%;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > *{ margin : 32px 0; }
  }

  &.center{
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > *{ margin : 32px 0; }
  }
`

//common
const Wrapper = styled.div`
  width: 100dvw;
  height: 100dvh;
  overflow-y: scroll;
`

const ColWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: rgb(var(--greyTitle));
`
const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  >span{
    display: inline-block;
    font-size: 56px;
    font-weight: 700;
    text-transform: uppercase;
    margin: 0 4px;
    color: rgb(var(--greyTitle));
    &::first-letter{
      color: #979FC7;
      color : ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
    }
  }

  &.outro{
    span{
      &::first-letter{
        color: white;
      }
    }
  }
`
const Title = styled.span`
  color: #989FC4;
  color : ${(props) => props.theme.point ? props.theme.point : '#989FC4'};
  font-size: 28px;
  font-weight: 500;
  text-transform: capitalize;
`
const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span{
    font-size: 34px;
    font-weight: 600;
    color: rgb(var(--greyTitle));
    color: #5f5f5f;
    line-height: 1.4;
    white-space: nowrap;
  }
`

const SubText = styled.span`
  color: grey;
  font-size: 18px;
`
const ImageWrapper = styled.div`
  width : 100%;
  display : flex;
  justify-content: center;
  padding: 12px 0;

  &.ui{
    width: 100dvw;
    overflow-x: scroll;
    justify-content: start;
    padding: 18px 72px;
  }
  .uiImage{
    height: 400px;
    width: auto;
    margin-left: 18px;
    margin-right: 18px;
  }
`
const Img = styled(Image)`
  width: auto;
  &.emotionImg{
    width: 500px;
  }
  &.habitbox{
    box-shadow: 0px 0px 16px rgba(0,0,0,0.2);

    width: 300px;
    height: 300px;
    border-radius: 16px;
    background-color: white;
    margin: 0 4px;
  }
  &.otherinfo{
    object-fit: cover;
    width: 220px;
    box-shadow: 0px 0px 12px rgba(0,0,0,0.2);
    border-radius: 16px;
    margin: 0 16px;
  }
`
