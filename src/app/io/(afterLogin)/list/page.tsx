'use client';

import styled from "styled-components";
import { useState } from "react";


//styledComponent
import SC_Common from "@/styleComponent/common";

//component
import Header from "@/component/header";
import Diary from "@/component/diary";

//icon
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import { useRef } from "react";


const List = () => {

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchInputOpen, setSearchInputOpen] = useState<Boolean>(false);

  const [sortToggle, setSortToggle] = useState<boolean>(true);

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchInputOpen(c => !c);
  }
  const dummy = [1, 2, 3, 4, 5, 6, 7];

  return (
    <SC_Common.Wrapper>
      <Header />
      <SC_Common.Options>
        <button>
          <SortIcon fontSize="small" />
          <span onClick={() => setSortToggle(c => !c)}>{sortToggle ? 'new' : 'old'}</span>
        </button>
        <Search
          open={searchInputOpen}
          onClick={(e) => {
            setSearchInputOpen(c => !c);
            setTimeout(() => {
              searchInputRef.current?.focus();
            }, 50);
          }}>
          <SearchIcon fontSize="small" />
          <form onSubmit={onSearch}>
            {searchInputOpen && <input
              ref={searchInputRef}
              onClick={e => e.stopPropagation()}></input>}
          </form>
        </Search>
      </SC_Common.Options>

      <SC_Common.Content className="scroll">
        {dummy.map(e => <Diary key={'listNote' + e} dateInfo={new Date().getTime()} />)}
      </SC_Common.Content>
    </SC_Common.Wrapper>
  );
}

export default List;

const Search = styled.button<{ open?: Boolean }>`
  transition: all ease-in-out 0.3s;
  width : ${props => props.open === true ? '200px' : '46px'};
  input{
    width: 100%;
    border-radius: 48px;
    padding : 0 10px;
  }
`