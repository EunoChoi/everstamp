'use client';

import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";


//styledComponent
import SC_Common from "@/style/common";

import { getDiaries } from "@/app/(afterLogin)/_lib/diary";

//component
import Diary from "@/component/diary/Diary";
import Header from "@/component/Header";

//icon
import SearchIcon from '@mui/icons-material/Search';
import { useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import { useInView } from "react-intersection-observer";

interface Props {
  email: string;
}

interface ImageProps {
  id: string;
  src: string;
}

interface Habit {
  UserId: number;
  id: number;
  email: string;
  name: string;
  themeColor: string;
  priority: number;
}


interface diaryData {
  email: string;
  id: number;
  date: Date;
  text: string;
  Images: Array<ImageProps>;
  Habits: Array<Habit>;
  visible: boolean;
};


const ListPageClient = () => {

  const contentRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [searchInputOpen, setSearchInputOpen] = useState<Boolean>(false);
  const [sortToggle, setSortToggle] = useState<'ASC' | 'DESC'>('DESC');


  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0
  });

  const { data: diaries, fetchNextPage, isFetching, hasNextPage } = useInfiniteQuery({
    queryKey: ['diary', 'list', 'search', search, sortToggle],
    queryFn: ({ pageParam }) => getDiaries({ sort: sortToggle, search, pageParam, limit: 5 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.length === 0 ? undefined : allPages.length),
  });

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(searchText);
  }
  const sortChage = useCallback(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    if (sortToggle === 'DESC') setSortToggle('ASC');
    else setSortToggle('DESC');
  }, [sortToggle])


  useEffect(() => {
    if (!isFetching && hasNextPage && inView) fetchNextPage();
  }, [inView, hasNextPage, isFetching])

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

          {searchInputOpen &&
            <form onSubmit={onSearch}>
              <input
                ref={searchInputRef}
                placeholder="검색어를 입력하세요."
                value={searchText}
                onChange={e => setSearchText(e.currentTarget.value)}
                onClick={e => e.stopPropagation()}>
              </input>
            </form>}

        </Search>
        <button onClick={sortChage}>
          <span>{sortToggle === 'DESC' ? <ArrowDownwardOutlinedIcon fontSize="small" /> : <ArrowUpwardOutlinedIcon fontSize="small" />}</span>
          <span>Time</span>
        </button>
      </SC_Common.Options>

      <SC_Common.Content className="scroll" ref={contentRef}>
        {diaries?.pages[0].length === 0 && <NoDiaries>Shall we write in our diaries? 😆</NoDiaries>}

        {diaries?.pages?.map((page: Array<diaryData>, i: number) => (page.map((data, i) => (<Diary
          position="list"
          diaryData={data}
          key={'listNote' + i}
        />))))

        }
        <Observer ref={ref} />
      </SC_Common.Content>
    </SC_Common.Wrapper>
  );
}

export default ListPageClient;

const Observer = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 50px;
`

const Search = styled.button<{ open?: Boolean }>`
  transition: all ease-in-out 0.3s;
  width : ${props => props.open === true ? '200px' : '46px'};
  input{
    width: 100%;
    border-radius: 48px;
    padding : 0 14px;
    &::placeholder{
      font-size: 14px;
    }
  }
`
const NoDiaries = styled.div`
  display: flex;
  align-items: center;

  padding-top: 30dvh;
  font-size: 18px;  
  font-weight: 500;
  color: rgb(var(--greyTitle));

  @media (min-height:480px) and (min-width:1024px) { //desktop
    font-size: 22px;
  }
`