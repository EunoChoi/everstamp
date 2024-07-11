import styled from "styled-components";
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useRouter } from "next/navigation";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';



interface Props {
  type?: string;
  onSubmit: () => void;
}

const HabitInputButtons = ({ type, onSubmit }: Props) => {

  const router = useRouter();
  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  }
  const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

  return (
    <Buttons className={(isInStandaloneMode() && isIos()) ? 'iosPwa' : ''}>
      <Button onClick={() => router.back()}>
        <CancelOutlinedIcon className="icon"></CancelOutlinedIcon>
      </Button>
      <Button onClick={() => onSubmit()}>
        {type === 'edit' ? <ModeEditOutlineOutlinedIcon className="icon" /> : <AddTaskOutlinedIcon className="icon" />}
      </Button>
    </Buttons>
  );
}

export default HabitInputButtons;


const Buttons = styled.div`
  width: 100%;
  height: var(--mobileNav);
  background-color: #f9f9f9;
  border-top: solid 1px rgba(0,0,0,0.1);

  display: flex;
  justify-content: space-around;
  align-items: center;

  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  &.iosPwa{
    height: calc(var(--mobileNav) + 20px);
    padding-bottom: 20px;
  }
`
const Button = styled.button`
  .icon{
    color: rgba(0,0,0,0.4) !important;
  }
  .icon:hover{
    color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'} !important;
    /* color: grey; */
  }
`