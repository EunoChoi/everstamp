import { ReactNode } from "react";
import { Suspense } from "react";

type Props = {
  children: ReactNode;
  modal: ReactNode;
}

const Layout = ({ children, modal }: Props) => {
  return (
    <Suspense>
      {modal}
      {children}
    </Suspense>
  );
}

export default Layout;