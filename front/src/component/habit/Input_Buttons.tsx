import styled from "styled-components";
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useRouter } from "next/navigation";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import BottomButtonArea from "../common/BottomButtonArea";
import { useCustomRouter } from "@/function/customRouter";



interface Props {
  type?: string;
  onSubmit: () => void;
  isLoading: boolean;
}

const HabitInputButtons = ({ type, onSubmit, isLoading }: Props) => {
  const router = useCustomRouter();

  return (
    <BottomButtonArea>
      <Button onClick={() => router.back()}>
        <CloseRoundedIcon className="icon"></CloseRoundedIcon>
      </Button>
      <Button onClick={() => onSubmit()} disabled={isLoading}>
        {type === 'edit' ? <ModeEditOutlineOutlinedIcon className="icon" /> : <AddTaskOutlinedIcon className="icon" />}
      </Button>
    </BottomButtonArea>
  );
}

export default HabitInputButtons;


const Button = styled.button`
  &:disabled{
    opacity: 0.4;
  }
  .icon{
    color: rgba(0,0,0,0.4) !important;
  }
  .icon:hover{
    color: ${(props) => props.theme.point ? props.theme.point : '#979FC7'} !important;
    /* color: grey; */
  }
`