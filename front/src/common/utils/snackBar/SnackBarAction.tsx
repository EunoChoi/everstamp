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
  padding: 5px 14px;
  margin-left: 8px;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  &.yes{
    background-color: #83c6b6;
    color: white;
  }
  &.no{
    background-color: #dc7889;
    color: white;
  }
`
