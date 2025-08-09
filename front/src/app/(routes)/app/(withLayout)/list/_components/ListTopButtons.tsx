import TopButtons, { buttonOption } from "@/common/components/ui/TopButtons";
import { emotions } from "@/common/images/emotions";
import FilterListIcon from '@mui/icons-material/FilterList';
import { ListFilterState } from "../ListView.client";
import { useListFilter } from "../_hooks/useListFilter";

interface ListTopButtonsProps {
  filterState: ListFilterState;
}

const ListTopButtons = ({ filterState }: ListTopButtonsProps) => {

  const { setListFilter } = useListFilter();
  const { sort, year, month, yearAndMonth, emotion, open } = filterState;
  const hasFilter = month !== undefined || emotion !== undefined;

  const filterOpenToggle = () => {
    setListFilter({ open: !open });
  };
  const listSortToggle = () => {
    setListFilter({ sort: sort === 'desc' ? 'asc' : 'desc' });
  };

  //selected value data at top button
  const filterButtonContent = hasFilter ? (
    <span>
      {emotion !== undefined && emotions[emotion].alt}
      {(emotion !== undefined && month !== undefined) && ' + '}
      {month !== undefined && yearAndMonth}
    </span>
  ) : (
    <FilterListIcon fontSize="small" />
  )
  const sortButtonContent = <span>{sort === 'desc' ? 'New' : 'Old'}</span>
  const buttonsValue: buttonOption[] = [
    {
      content: filterButtonContent, onClick: filterOpenToggle,
      className: 'auto'
    },
    { content: sortButtonContent, onClick: listSortToggle, className: 'normal' }
  ];

  return <TopButtons buttons={buttonsValue} />;
}

export default ListTopButtons;

