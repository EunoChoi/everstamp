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
  padding: 6px 16px;
  margin-left: 8px;
  border-radius: 14px;
  font-weight: 500;
  &.yes{
    background-color: rgba(131, 198, 182, 0.9);
    color: white;
  }
  &.no{
    background-color: rgba(220, 120, 137, 0.9);
    color: white;
  }
`
