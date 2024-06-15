import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  modal: ReactNode;
}

const Layout = ({ children, modal }: Props) => {
  return (
    <>
      {modal}
      {children}
    </>
  );
}

export default Layout;