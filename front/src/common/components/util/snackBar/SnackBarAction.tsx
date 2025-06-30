import styled from "styled-components";


interface SnackBarActionProps {
  yesAction: () => void;
  noAction: () => void;
}

export const SnackBarAction = ({ yesAction, noAction }: SnackBarActionProps) => {
  return (<>
    <Button className="yes" onClick={yesAction}>yes</Button>
    <Button className="no" onClick={noAction}>no</Button>
  </>);
}
const Button = styled.button`
  padding: 4px 12px;
  margin-left: 8px;
  border-radius: 8px;
  border : 2px solid rgba(0,0,0,0.1);
  &.yes{
    background-color: #83c6b6;
    color: white;
  }
  &.no{
    background-color: #dc7889;
    color: white;
  }
`
