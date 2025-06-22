import Axios from "@/Axios/axios";
import $Common from "@/common/styles/common";
import { signOut } from "next-auth/react";
import { SnackbarKey, closeSnackbar, enqueueSnackbar } from "notistack";

export const onDeleteAccount = () => {
  const userDeleteAction = (snackbarId: SnackbarKey) => (
    <>
      <$Common.YesOrNo className="no" onClick={() => { closeSnackbar('userDelete'); }}>
        No
      </$Common.YesOrNo>
      < $Common.YesOrNo className="yes" onClick={() => {
        Axios.delete('user').then(() => { signOut(); });
        closeSnackbar('userDelete');
      }}>
        Yes
      </ $Common.YesOrNo>
    </>
  );
  enqueueSnackbar('회원탈퇴 하시겠습니까?', { key: 'userDelete', persist: true, action: userDeleteAction, autoHideDuration: 6000 });
}