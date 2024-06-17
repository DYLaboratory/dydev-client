export const err400Alert = (err, message: string) => {
  const { response } = err;

  if (response) {
    const status = response.status;

    if (status && status === 400) {
      alert(message);
    }
  }
}