import Axios from "@/Axios/axios";
import $Common from "@/common/styles/common";
import { signOut } from "next-auth/react";
import { SnackbarKey, closeSnackbar, enqueueSnackbar } from "notistack";

export const onLogout = () => {
  const logoutAction = (snackbarId: SnackbarKey) => (
    <>
      <$Common.YesOrNo className="no" onClick={() => { closeSnackbar('logout'); }}>
        No
      </$Common.YesOrNo>
      <$Common.YesOrNo className="yes" onClick={() => {
        Axios.get('user/logout').then(() => { signOut(); });
        closeSnackbar('logout');
      }}>
        Yes
      </$Common.YesOrNo>
    </>
  );
  enqueueSnackbar('로그아웃 하시겠습니까?', { key: 'logout', persist: true, action: logoutAction, autoHideDuration: 6000 });
}