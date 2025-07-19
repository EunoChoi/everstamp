import { SnackBarAction } from "@/common/utils/snackBar/SnackBarAction";
import { deleteUser } from "@/server/actions/user.actions";
import { signOut } from "next-auth/react";
import { SnackbarKey, closeSnackbar, enqueueSnackbar } from "notistack";
import { startTransition } from "react";

export const onDeleteAccount = () => {
  const userDeleteAction = (snackbarId: SnackbarKey) => (
    <>
      <SnackBarAction
        yesAction={() => {
          startTransition(async () => {
            const result = await deleteUser();
            if (result.success) {
              enqueueSnackbar(result.message, { variant: 'success' });
              signOut({ callbackUrl: '/' });
            } else {
              enqueueSnackbar(result.message, { variant: 'error' });
            }
          });
        }}
        noAction={() => {
          closeSnackbar('userDelete');
        }} />
    </>
  );
  enqueueSnackbar('회원탈퇴 하시겠습니까?', { key: 'userDelete', persist: true, action: userDeleteAction, autoHideDuration: 6000 });
}