import Api from "@/common/api/Api";
import { SnackBarAction } from "@/common/utils/snackBar/SnackBarAction";
import { signOut } from "next-auth/react";
import { SnackbarKey, closeSnackbar, enqueueSnackbar } from "notistack";

export const onLogout = () => {
  const logoutAction = (snackbarId: SnackbarKey) => (
    <>
      <SnackBarAction
        yesAction={() => {
          Api.get('user/logout').then(() => { signOut(); });
          closeSnackbar('logout');
        }}
        noAction={() => {
          closeSnackbar('logout');
        }} />
    </>
  );
  enqueueSnackbar('로그아웃 하시겠습니까?', { key: 'logout', persist: true, action: logoutAction, autoHideDuration: 6000 });
}