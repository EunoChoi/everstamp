import TopButtons, { buttonOption } from "@/common/components/ui/TopButtons";
import { emotions } from "@/common/images/emotions";
import FilterListIcon from '@mui/icons-material/FilterList';
import { useFilter } from "../_hooks/useFilter";
import { useListToggle } from "../_hooks/useListToggle";

const ListTopButtons = () => {
  const { selectedYear, selectedMonth, emotionToggle, setFilterState, isFilterOpen } = useFilter();
  const diplayYearMonth = selectedYear % 100 + '.' + selectedMonth.toString().padStart(2, '0');
  const hasFilter = (selectedMonth !== 0 || (emotionToggle < 5 && emotionToggle >= 0));
  const { toggleValue: sortToggle, sortOrderChange } = useListToggle();

  //selected value data at top button
  const filterButtonContent = hasFilter ? (
    <span>
      {selectedMonth !== 0 && diplayYearMonth}
      {selectedMonth !== 0 && emotionToggle !== 5 && ' , '}
      {emotionToggle !== 5 && emotions[emotionToggle].alt}
    </span>
  ) : (
    <FilterListIcon fontSize="small" />
  )
  const sortButtonContent = <span>{sortToggle === 'DESC' ? 'New' : 'Old'}</span>
  const buttonsValue: buttonOption[] = [
    {
      content: filterButtonContent, onClick: () => {
        setFilterState({ isOpen: !isFilterOpen })
      },
      className: 'auto'
    },
    { content: sortButtonContent, onClick: sortOrderChange, className: 'normal' }
  ];

  return <TopButtons buttons={buttonsValue} />;
}

export default ListTopButtons;

