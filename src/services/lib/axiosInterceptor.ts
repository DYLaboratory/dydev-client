export const apiErrorResponse = async err => {
  const { config, response } = err;

  // 네트워크 에러
  // if (err.message && err.message === 'Network Error') {
  //   alert('서버 통신 중 오류가 발생하였습니다.');
  // }

  // 권한 에러
  if (response.status === 401 || response.status === 403) {
    alert('권한이 없습니다.');
  }

  await Promise.reject(err);
};
