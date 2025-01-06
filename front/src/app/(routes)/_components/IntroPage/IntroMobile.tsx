import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";

import calendar from '/public/img/intro/calendar.png';
import habit from '/public/img/intro/habit.png';
import habitinfo1 from '/public/img/intro/habitinfo1.png';
import habitinfo2 from '/public/img/intro/habitinfo2.png';
import habitorder from '/public/img/intro/habitorder.png';
import list from '/public/img/intro/list.png';
import list2 from '/public/img/intro/list2.png';
import setting from '/public/img/intro/setting.png';
import zoom1 from '/public/img/intro/zoom1.png';
import zoom2 from '/public/img/intro/zoom2.png';

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


import IntroPageCarousel from "@/common/components/ui/IntroPageCarousel";
import useCustomRouter from "@/common/hooks/useCustomRouter";
import $Common from "@/common/styles/common";
import AndroidIcon from '@mui/icons-material/Android';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import LockIcon from '@mui/icons-material/Lock';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import { closeSnackbar, enqueueSnackbar, SnackbarKey } from "notistack";


const IntroMobile = () => {
  const router = useCustomRouter();

  const introImages = [calendar, list, list2, zoom1, zoom2, habit, habitinfo1, habitinfo2, setting, habitorder];
  const viewImages = [calendar, list, list2, zoom1];
  const habitImages = [habitinfo1, habitinfo2];
  const otherInfoImages = [otherinfo1, otherinfo2, otherinfo3];
  const uiImages = [calendar, pc_calendar, ipad_calendar, list, pc_list, ipad_list, list2, pc_list2, ipad_list2, zoom1, pc_zoom1, zoom2, habit, pc_habit, pc_addHabit, habitinfo1, pc_habitinfo1, habitinfo2, pc_habitinfo2, login, pc_login, ipad_login, setting, pc_setting];


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
          router.push('/main')
        }}>
          Yes
        </$Common.YesOrNo>
      </>
    );
    enqueueSnackbar(<StartInWebText />, { key: 'startInWeb', persist: true, action, autoHideDuration: 6000 });
  }

  return (<Wrapper>
    <Mobile_Section className="intro">
      <Logo>
        <span>everstamp</span>
      </Logo>
      <Text>
        <span>내일 더 나은 나로 나아가기 위해</span>
        <span>감정 일기와 습관 만들기를 시작하세요.</span>
      </Text>
      <IntroPageCarousel images={introImages} keyValue="mobileIntro" type="fullWidth" width="100dvw" height="80dvh" borderRadius="28px" />
      <DownLoadButtons>
        {/* <a href="/download/Everstamp.apk" download>
          <Button><AndroidIcon className="icon" fontSize="small" />APK</Button>
        </a> */}
        <Button onClick={goToPlayStore}>
          <AndroidIcon className="icon" fontSize="small" />Android
        </Button>
        <Button onClick={installPwa}><InstallMobileIcon className="icon" fontSize="small" />PWA</Button>
      </DownLoadButtons>

      <StartInWeb
        onClick={startInWeb}
      >
        웹에서 실행하기
      </StartInWeb>

      <ColWrapper>
        <SubText>iOS 사용자의 경우 PWA를 설치하여 이용 가능합니다.</SubText>
        <SubText>*로그인 화면이 나타나지 않는 경우, 앱을 재실행 해주세요.</SubText>
      </ColWrapper>
    </Mobile_Section>

    <Mobile_Section className="emotion">
      <Title>#emotions</Title>
      <Text>
        <span>감정을 정리하고 기록하세요.</span>
        <span>긍정적 변화가 시작됩니다.</span>
      </Text>
      <Img className="emotionImg" src={emotions} alt="emotions" width={700} height={700}></Img>
      <ColWrapper>
        <SubText>'기쁨', '행복', '무난한 감정', '슬픔', '분노'</SubText>
        <SubText>5가지 감정 선택을 지원합니다.</SubText>
      </ColWrapper>
    </Mobile_Section>
    <Mobile_Section className="view">
      <Title>#view feature</Title>
      <Text>
        <span>일기, 감정, 습관 목록을 한눈에!</span>
        <span>달력 뷰와 리스트 뷰를 이용하세요.</span>
      </Text>
      <IntroPageCarousel images={viewImages} keyValue="mobileView" type="fullWidth" width="100%" height="80dvh" borderRadius="28px" />

      <ColWrapper>
        <SubText>리스트 뷰에서 감정별 모아보기와</SubText>
        <SubText>날짜별 오름/내림 차순 정렬을 지원합니다.</SubText>
      </ColWrapper>
    </Mobile_Section>
    <Mobile_Section className="habit">
      <Title>#habit feature</Title>
      <Text>
        <span>완벽하지 않아도 괜찮습니다.</span>
        <span>부담없는 습관부터 시도하세요.</span>
      </Text>
      <RowWrapper>
        <Img className="habitbox" src={habitbox} alt="habitbox" width={300} height={300}></Img>
      </RowWrapper>
      <ColWrapper>
        <SubText>습관 목록은 최대 18개까지 생성 가능하며</SubText>
        <SubText>최근 4일 동안만 완료 여부를 선택할 수 있습니다.</SubText>
      </ColWrapper>
      <span></span>
      <Title>#habit view feature</Title>
      <Text>
        <span>습관이 형성되는 시간 21일!</span>
        <span>실천 결과를 확인하고 점검하세요.</span>
      </Text>
      <IntroPageCarousel images={habitImages} keyValue="mobileHabit" type="fullWidth" width="100%" height="80dvh" borderRadius="28px" />
      <ColWrapper>
        <SubText>월간 습관 실천 여부는 달력 형태로</SubText>
        <SubText>연간 실천 여부는 그래프로 확인 가능합니다.</SubText>
      </ColWrapper>
    </Mobile_Section>

    <Mobile_Section className="ui center">
      <Title>#Responsive UI</Title>
      <Text>
        <span>모바일, 데스크탑 PC, 태블릿 등</span>
        <span>다양한 환경에 최적화된 UI를 제공합니다.</span>
      </Text>
      <Images className="ui">
        {uiImages.map((e, i) => <Image key={'ui image' + i} className="uiImage" src={e} alt='ui images' height={500} width={500} priority />)}
      </Images>
    </Mobile_Section>

    <Mobile_Section className="others">
      <Title>#other feature</Title>

      <Text>
        <span>암호화, 테마, 멀티 플랫폼 최적화 등</span>
        <span>추가적인 사용자 편의 기능을 제공합니다.</span>
      </Text>

      <RowWrapper>
        <ColWrapper className="othersIcons">
          <LockIcon fontSize="large" />
          <span>텍스트 암호화</span>
        </ColWrapper>
        <ColWrapper className="othersIcons">
          <ColorLensIcon fontSize="large" />
          <span>테마 설정</span>
        </ColWrapper>
        <ColWrapper className="othersIcons">
          <PhonelinkIcon fontSize="large" />
          <span>멀티 플랫폼</span>
        </ColWrapper>
      </RowWrapper>
      <IntroPageCarousel className='otherinfo' images={otherInfoImages} keyValue="mobileOtherInfo" type="fullWidth" width="100%" height="50dvh" borderRadius="16px" />
    </Mobile_Section>
    <Mobile_Section className="outro">
      <DownLoadButtons>
        {/* <a href="/download/Everstamp.apk" download>
          <Button className="outro"><AndroidIcon className="icon" fontSize="small" />APK</Button>
        </a> */}
        <Button className="outro" onClick={goToPlayStore}>
          <AndroidIcon className="icon" fontSize="small" />Android
        </Button>
        <Button className="outro" onClick={installPwa}><InstallMobileIcon className="icon" fontSize="small" />PWA</Button>
        {/* <Button onClick={() => (router.push('/main'))}>실행하기</Button> */}
      </DownLoadButtons>
      <StartInWeb
        className="outro"
        onClick={startInWeb}
      >
        웹에서 실행하기
      </StartInWeb>
      <Logo className="outro">
        <span>everstamp</span>
      </Logo>
    </Mobile_Section>
  </Wrapper>);
}

export default IntroMobile;

const StartInWeb = styled.button`
  font-size: 15px;
  border-bottom: solid 2px ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  padding: 0 4px;
  font-weight: 500;
  color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  &.outro{
    color: rgb(var(--greyTitle));
    border-color : rgb(var(--greyTitle));
  }
`

const Images = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;

  width: 100dvw;
  overflow-x: scroll;

  padding: 18px 36px;

  .uiImage{
    flex-shrink: 0;
    height: 300px;
    width: auto;
    max-width: none;
    margin-left: 9px;
    margin-right: 9px;
  }
`

const DownLoadButtons = styled.div`
  display: flex;
`
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid rgba(0,0,0,0.1);

  margin: 0 6px;
  padding: 6px 24px;
  /* width: 110px; */
  border-radius: 32px;

  font-size: 14px;
  font-weight: 600;

  color: rgb(var(--greyTitle));
  background-color: #d7daeb;
  background-color: ${(props) => props.theme.point ? props.theme.point : '#d7daeb'};

  &.outro{
    background-color: rgba(255,255,255,0.8);
    border-color:${(props) => props.theme.point ? props.theme.point : '#d7daeb'};
  }

  .icon{
    margin-right: 8px;
  }
`


//tablet + phone
const Mobile_Section = styled.div`
  width: 100dvw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &.intro, &.emotion, &.view, &.ui, &.habit, &.others, &.outro{
    background-color: #EFF0F6;
    background-color: ${(props) => props.theme.point ? props.theme.point : '#EFF0F6'};
    width: 100%;
    height: auto;
    padding: 56px 0;
    > *{
      margin: 24px 0;
    }
    @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
      padding: 64px 0;
      > *{
        margin: 28px 0;
      }
    }
  }
  &.intro, &.view, &.ui{
    background-color: white;
  }
  &.outro{
    background-color: #979FC7;
    background-color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
  }
`
//common
const Wrapper = styled.div`
  width: 100dvw;
  height: 100dvh;
  overflow-y: scroll;
`
const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  color: rgb(var(--greyTitle));
`
const ColWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: rgb(var(--greyTitle));

  &.left{
    align-items: start;
  }
  &.right{
    align-items: end;
  }

  &.othersIcons{
    margin: 0 12px;
    span{
      font-size: 14px;
      font-weight: 500;
      margin-top: 8px;
      @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
        font-size: 16px;
      }
    }
  }
`
const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  >span{
    display: inline-block;

    line-height: 120%;

    font-size: 32px;
    font-weight: 700;
    text-transform: uppercase;
    margin: 0 4px;
    color: rgb(var(--greyTitle));

    &::first-letter{
      color: #979FC7;
      color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'};
    }
  }

  &.outro{
    >span{
      &::first-letter{
        color: #EFF0F6;
      }
      line-height: 120%;
    }
  }
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    >span{ 
      font-size: 46px;
   }
  }


`
const Title = styled.span`
  color: #989FC4;
  color: ${(props) => props.theme.point ? props.theme.point : '#989FC4'};
  font-size: 20px;
  font-weight: 500;
  text-transform: capitalize;

  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    font-size: 22px;
  }
`
const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &.left{
    align-items: start;
  }
  &.right{
    align-items: end;
  }

  span{
    font-size: 20px;
    font-weight: 600;
    color: rgb(var(--greyTitle));
    line-height: 1.4;

    @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
      font-size: 28px;
    }
  }
`
const SubText = styled.span`
  color: grey;
  font-size: 14px;
  @media (min-width:480px) and (max-width:1023px) { //mobild land + tablet
    font-size: 16px;
  }
`

const Img = styled(Image)`
  width: auto;
  &.emotionImg{
    border: none;
    width: 300px;
  }
  &.habitbox{
    box-shadow: 0px 0px 16px rgba(0,0,0,0.2);

    width: 240px;
    height: 240px;
    border-radius: 16px;
    background-color: white;
    margin: 0 4px;
  }
`





