export const handleApiRequest = async (
  request,
  method,
  endpoint,
  data,
  onSuccess,
  onError,
  setLoading,
  showAlert,
  successAlert = false,
) => {
  try {
    setLoading(true);
    const response = await request(method, endpoint, data);

    const isSuccess =
      response?.StatusCode === 200 &&
      response?.Result !== null &&
      response?.Result !== false;

    if (isSuccess) {
      onSuccess(response?.Message, response?.StatusCode, response?.Result);

      if (successAlert) {
        showAlert({
          code: response?.StatusCode,
          message: response?.Message,
        });
      }
    } else {
      console.log('response', response);
      onError(
        response?.Message || 'An error occurred, please try again.',
        response?.StatusCode,
      );
      showAlert({
        code: response?.StatusCode,
        message: response?.Message || 'An error occurred, please try again.',
      });
    }
  } catch (error) {
    console.log('Error:', error);
    onError(error?.message || 'An error occurred, please try again.', 500);
    showAlert({
      code: 500,
      message: error?.message || 'An error occurred, please try again.',
    });
  } finally {
    setLoading(false);
  }
};
