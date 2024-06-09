import styled from "styled-components";


//icon
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';


const HabitBox = () => {
  return (<Wrapper>
    <Name>habit name</Name>
    <Box>
      {[1, 2, 3, 4].map(e => {
        return <Check key={e}>
          <span>T</span>
          <span>26</span>
          <RadioButtonCheckedIcon />
        </Check>
      })}
    </Box>
  </Wrapper>);
}

export default HabitBox;
const Box = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  
  height: 100%;
`
const Check = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-weight: 600;
    *:last-child{
      margin-top: 16px;
      color: rgb(var(--point));
    }
`
const Name = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: rgb(var(--grey_Title));

  text-transform: capitalize;
  text-align: center;
  padding: 16px;
  padding-bottom: 4px;
`
const Wrapper = styled.div`  
  width: 100%;
  /* aspect-ratio: 1; */

  border-radius: 16px;
  background-color: rgb(var(--lightGrey_CP));

  display: flex;
  flex-direction: column;
`