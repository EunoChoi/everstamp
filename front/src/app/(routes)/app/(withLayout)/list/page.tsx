import { getDiariesByPage } from "@/server/actions/diary.actions";
import { DiaryWithRelations } from "@/server/types";
import { getYear } from "date-fns";
import { LIST_QUERY_SORT } from "./_hooks/useListFilter";
import ListView from "./ListView.client";

interface ListFilterQueryState {
  sort?: string;
  year?: string;
  month?: string;
  emotion?: string;
  open?: string;
}
interface ListPageProps {
  searchParams: ListFilterQueryState;
}

const UNSELECTED_QUERY_VALUE = {
  sort: 'desc',
  year: getYear(new Date()),
  month: undefined,
  emotion: undefined,
}
const VALID_SORT: LIST_QUERY_SORT[] = ['asc', 'desc'];
const VALID_MONTH = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const VALID_EMOTION = [0, 1, 2, 3, 4, 5];

export const PAGE_SIZE = 10;
const START_PAGE = 1;

//page for data prefetch
const ListPage = async ({ searchParams }: ListPageProps) => {
  //searchParams query parameter validation 과정
  const querySort = searchParams.sort;
  const queryYear = searchParams.year;
  const queryMonth = searchParams.month;
  const queryEmotion = searchParams.emotion;
  const queryIsFilterOpen = searchParams.open;

  const sort = (querySort !== null && VALID_SORT.includes(querySort as LIST_QUERY_SORT)) ?
    querySort as LIST_QUERY_SORT : UNSELECTED_QUERY_VALUE.sort as LIST_QUERY_SORT;
  const year = (queryYear && !isNaN(Number(queryYear)) && Number(queryYear) > 2000) ?
    Number(queryYear) : UNSELECTED_QUERY_VALUE.year;
  const month = (queryMonth && !isNaN(Number(queryMonth)) && VALID_MONTH.includes(Number(queryMonth))) ?
    Number(queryMonth) : UNSELECTED_QUERY_VALUE.month;
  const emotion = (queryEmotion && !isNaN(Number(queryEmotion)) && VALID_EMOTION.includes(Number(queryEmotion))) ?
    Number(queryEmotion) : UNSELECTED_QUERY_VALUE.emotion;
  const open = queryIsFilterOpen === 'true';

  const yearAndMonth = (month !== undefined) ? `${year}-${month}` : undefined;


  let inititialDiaries: DiaryWithRelations[];
  try {
    const result = await getDiariesByPage({
      page: START_PAGE,
      pageSize: PAGE_SIZE,
      sort,
      emotion,
      yearAndMonth
    });
    if (!result?.success) {
      throw new Error('다이어리 리스트 데이터 로드 중 문제가 발생하였습니다.');
    }
    inititialDiaries = result?.data ?? [];
  } catch (error) {
    throw error;
  }

  return (<ListView
    initialDiaries={inititialDiaries}
    filterState={{
      sort,
      year,
      month,
      yearAndMonth,
      emotion,
      open
    }}
  />);
}

export default ListPage;
