'use client'

import styled from "styled-components";
import { useNavItems } from "./useNavItems";

const BottomNav = () => {
  const { items, current } = useNavItems();

  return (
    <Nav>
      {items.map(({ key, icon: Icon, label, onClick }) => (
        <NavMenu key={key} onClick={onClick} className={current === key ? 'current' : ''}>
          <Icon className="icon" />
          <span>{label}</span>
        </NavMenu>
      ))}
    </Nav>
  );
};

export default BottomNav;

const Nav = styled.nav`
  position: fixed;
  bottom: 0;

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  width: 100vw;
  height: var(--mobileNav);

  border-top: 2px solid rgb(var(--lightGrey2));
  background-color: rgba(255,255,255,0.8);
  backdrop-filter: blur(20px);
  color: #c3c3c3;

  > * {
    padding: 0 12px;
    padding-bottom: 2px;
    font-size: 22px;
    text-align: center;
  }

  .current {
    color: ${(props) => props.theme.themeColor || '#979FC7'};
  }
`;

const NavMenu = styled.button`
  padding: 0;
  width: 23%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .icon {
    line-height: 0%;
  }

  span {
    margin-top: 4px;
    line-height: 1;
    font-size: 12px;
    text-transform: capitalize;
  }
`;
