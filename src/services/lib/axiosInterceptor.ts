export const apiErrorResponse = async err => {
  const { config, response } = err;

  if (err.message && err.message === 'Network Error') {
    alert('서버 통신 중 에러가 발생하였습니다.');
  }

  if (response.status === 401 || response.status === 403) {
    alert('권한이 없습니다.');
  }

  await Promise.reject(err);
};
