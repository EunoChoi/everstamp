'use client'

import styled from "styled-components";
import { useNavItems } from "./useNavItems";

const BottomNav = () => {
  const { items, current } = useNavItems();

  // setting을 제외한 메인 메뉴
  const mainItems = items.filter(item => item.key !== 'setting');
  const settingItem = items.find(item => item.key === 'setting');

  return (
    <NavWrapper>
      <NavGroup>
        {mainItems.map(({ key, icon: Icon, onClick }) => (
          <NavMenu key={key} onClick={onClick} $active={current === key}>
            <Icon />
          </NavMenu>
        ))}
      </NavGroup>

      {settingItem && (
        <SettingButton onClick={settingItem.onClick} $active={current === 'setting'}>
          <settingItem.icon />
        </SettingButton>
      )}
    </NavWrapper>
  );
};

export default BottomNav;

const NavWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 48px;
  width: 100%;
  height: var(--mobileNav);

  
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120px;
    
    background: linear-gradient(
      to bottom,
      transparent 0%,
      color-mix(in srgb, var(--theme-bg, #f5f5fa) 30%, transparent) 30%,
      color-mix(in srgb, var(--theme-bg, #f5f5fa) 70%, transparent) 60%,
      var(--theme-bg, #f5f5fa) 100%
    );
    
    mask-image: linear-gradient(to bottom, transparent 0%, black 100%);
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 100%);
    
    pointer-events: none;
    z-index: -1;
  }
`;

const NavGroup = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;
  
  padding: 6px 8px;
  border-radius: 28px;
  
  background-color: rgba(255,255,255,0.8);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  
  pointer-events: auto;
`;

const NavMenu = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  
  width: 44px;
  height: 44px;
  border-radius: 22px;
  
  font-size: 22px;
  color: ${({ $active, theme }) => $active ? '#fff' : '#999'};
  background-color: ${({ $active, theme }) => $active ? (theme.themeColor || '#979FC7') : 'transparent'};
  
  transition: all 0.2s ease;
`;

const SettingButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  
  width: 52px;
  height: 52px;
  border-radius: 26px;
  
  font-size: 24px;
  color: ${({ $active, theme }) => $active ? '#fff' : '#999'};
  background-color: ${({ $active, theme }) => $active ? (theme.themeColor || '#979FC7') : 'rgba(255,255,255,0.8)'};
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  
  pointer-events: auto;
  transition: all 0.2s ease;
`;
