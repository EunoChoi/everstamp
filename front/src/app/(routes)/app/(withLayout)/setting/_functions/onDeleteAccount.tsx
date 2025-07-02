import Axios from "@/Axios/axios";
import { SnackBarAction } from "@/common/components/util/snackBar/SnackBarAction";
import { signOut } from "next-auth/react";
import { SnackbarKey, closeSnackbar, enqueueSnackbar } from "notistack";

export const onDeleteAccount = () => {
  const userDeleteAction = (snackbarId: SnackbarKey) => (
    <>
      <SnackBarAction
        yesAction={() => {
          Axios.delete('user').then(() => { signOut(); });
          closeSnackbar('userDelete');
        }}
        noAction={() => {
          closeSnackbar('userDelete');
        }} />
    </>
  );
  enqueueSnackbar('회원탈퇴 하시겠습니까?', { key: 'userDelete', persist: true, action: userDeleteAction, autoHideDuration: 6000 });
}