export const err400Alert = (err, message: string) => {
  const status = err.response.status;

  if (status === 400) {
    alert(message);
  }
}