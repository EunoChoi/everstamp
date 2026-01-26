import Image from "next/image";
import { EMOTIONS } from "@/common/constants/emotions";

// 404 페이지 (inline style 사용 - 새로고침 시 스타일 깨짐 방지)
export default function NotFound() {
  return (
    <div
      style={{
        color: 'rgb(88, 88, 88)',
        width: '100%',
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--theme-bg, #f5f5fa)',
      }}
    >
      <Image priority src={EMOTIONS[1].src} alt={EMOTIONS[1].nameKr} width={128} height={128} />
      <span
        style={{
          fontSize: '36px',
          margin: '32px 0 16px',
        }}
      >
        404 Error
      </span>
      <p
        style={{
          width: '80%',
          fontSize: '18px',
          color: '#525252',
          textAlign: 'center',
          margin: 0,
        }}
      >
        요청하신 페이지를 찾을 수 없습니다.
      </p>
      <a
        href="/"
        style={{
          marginTop: '24px',
          padding: '10px 24px',
          fontSize: '16px',
          borderRadius: '24px',
          backgroundColor: 'rgb(88, 88, 88)',
          color: 'white',
          textDecoration: 'none',
        }}
      >
        홈으로
      </a>
    </div>
  );
}
