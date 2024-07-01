export const apiErrorResponse = async (err, errNetworkAlert, errAuthAlert) => {
  const { config, response } = err;

  // 네트워크 에러
  errNetworkAlert(err);
  
  // 권한 에러
  errAuthAlert(response?.status);

  await Promise.reject(err);
};
