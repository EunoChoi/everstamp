'use client';

import styled from "styled-components";
import { useCallback, useState } from "react";


//styledComponent
import SC_Common from "@/style/common";


//_lib
import { getCurrentUserEmail } from "../../../../funcstion/getCurrentUserEmail";
import { getDiaryList } from "../../_lib/getDiaryList";

//component
import DiaryList from "@/component/DiaryList";
import Header from "@/component/Header";

//icon
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";

interface diaryData {

}

const List = () => {

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchInputOpen, setSearchInputOpen] = useState<Boolean>(false);
  const [sortToggle, setSortToggle] = useState<'ASC' | 'DESC'>('DESC');

  const email = getCurrentUserEmail();

  const { data: diaries } = useQuery({
    queryKey: ['diary', 'list', sortToggle],
    queryFn: () => getDiaryList(email, sortToggle),
    enabled: email !== ''
  });


  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchInputOpen(c => !c);
  }
  const sortChage = useCallback(() => {
    if (sortToggle === 'DESC') setSortToggle('ASC');
    else setSortToggle('DESC');
  }, [sortToggle])


  return (
    <SC_Common.Wrapper>
      <Header title='list' />
      <SC_Common.Options>
        <button>
          <SortIcon fontSize="small" />
          <span onClick={sortChage}>{sortToggle === 'DESC' ? 'DESC' : 'ASC'}</span>
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
        {diaries?.map((e: any, i: number) => <DiaryList
          diaryData={e}
          key={'listNote' + i}
        />)}
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