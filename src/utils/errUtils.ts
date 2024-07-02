import { useSnackbar } from "notistack";

export const useSnackbarAlert = () => {
  const { enqueueSnackbar } = useSnackbar();

  const infoAlert = (message: string) => {
    enqueueSnackbar(
      message,
      {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
        autoHideDuration: 2000
      }
    );
  }

  const successAlert = (message: string) => {
    enqueueSnackbar(
      message,
      {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
        autoHideDuration: 2000
      }
    );
  }

  const errAlert = (message: string) => {
    enqueueSnackbar(
      message,
      {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
        autoHideDuration: 2000
      }
    );
  }

  const err400Alert = (err, message: string) => {
    const { response } = err;

    if (response) {
      const status = response.status;

      if (status && status === 400) {
        errAlert(message);
      }
    }
  }

  const errNetworkAlert = err => {
    if (err.message && err.message === 'Network Error') {
      errAlert('서버 통신 중 에러가 발생하였습니다.');
    }
  }

  const errAuthAlert = (status: number) => {
    if (status === 401 || status === 403) {
      errAlert('권한이 없습니다.');
    }
  }

  return {
    infoAlert,
    successAlert,
    errAlert,
    err400Alert,
    errNetworkAlert,
    errAuthAlert
  }
}