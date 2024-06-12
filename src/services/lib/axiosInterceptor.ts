export const apiErrorResponse = async err => {
  const { config, response } = err;

  if (err.message && err.message === 'Network Error') {
    alert('서버 통신 중 에러가 발생하였습니다.');
    return;
  }

  await Promise.reject(err);
};
