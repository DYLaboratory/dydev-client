import { useSnackbar } from "notistack";

export const useErrAlert = () => {
  const { enqueueSnackbar } = useSnackbar();

  const err400Alert = (err, message: string) => {
    const { response } = err;

    if (response) {
      const status = response.status;

      if (status && status === 400) {
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
    }
  }

  const errNetworkAlert = err => {
    if (err.message && err.message === 'Network Error') {
      enqueueSnackbar(
        '서버 통신 중 에러가 발생하였습니다.',
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
  }

  const errAuthAlert = (status: number) => {
    if (status === 401 || status === 403) {
      enqueueSnackbar(
        '권한이 없습니다.',
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
  }

  return {
    err400Alert,
    errNetworkAlert,
    errAuthAlert
  }
}