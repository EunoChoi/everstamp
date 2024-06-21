'use client';

import styled from "styled-components";
import { useCallback, useState } from "react";


//styledComponent
import SC_Common from "@/style/common";


//_lib
import { getCurrentUserEmail } from "@/function/getCurrentUserEmail";
import { getDiaryList } from "@/app/(afterLogin)/_lib/getDiaryList";

//component
import DiaryInList from "@/component/DiaryInList";
import Header from "@/component/Header";

//icon
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";

interface Props {
  email: string;
}

const ListPageClient = ({ email }: Props) => {

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchInputOpen, setSearchInputOpen] = useState<Boolean>(false);
  const [sortToggle, setSortToggle] = useState<'ASC' | 'DESC'>('DESC');

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
            {searchInputOpen &&
              <input
                ref={searchInputRef}
                placeholder="검색어를 입력하세요."
                onClick={e => e.stopPropagation()}>
              </input>}
          </form>
        </Search>
        <button onClick={sortChage}>
          <SortIcon fontSize="small" />
          <span>{sortToggle === 'DESC' ? 'DESC' : 'ASC'}</span>
        </button>
      </SC_Common.Options>

      <SC_Common.Content className="scroll">
        {diaries?.length === 0 && <NoDiaries>You have no diaries :(</NoDiaries>}
        {diaries?.map((e: any, i: number) => <DiaryInList
          diaryData={e}
          key={'listNote' + i}
        />)}
      </SC_Common.Content>
    </SC_Common.Wrapper>
  );
}

export default ListPageClient;

const NoDiaries = styled.div`
  height: 100%;
  display: flex;
  align-items: center;

  font-size: 18px;  
  font-weight: 500;
  color: rgb(var(--greyTitle));

  @media (min-width:480px) and (min-width:1024px) { //desktop
    font-size: 22px;
  }
`
const Search = styled.button<{ open?: Boolean }>`
  transition: all ease-in-out 0.3s;
  width : ${props => props.open === true ? '220px' : '46px'};
  input{
    width: 100%;
    border-radius: 48px;
    padding : 0 10px;
    &::placeholder{
      font-size: 14px;
    }
  }
`