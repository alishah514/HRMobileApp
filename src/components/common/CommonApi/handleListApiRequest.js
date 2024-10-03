export const handleListApiRequest = async (
  request,
  method,
  endpoint,
  data,
  onSuccess,
  onError,
  setLoading,
  showAlert,
) => {
  try {
    setLoading(true);

    const response = await request(method, endpoint, data);

    if (response.StatusCode === 200) {
      if (
        response.Result !== null &&
        response.Result.TotalRecords > 0 &&
        response.Result.Data !== null
      ) {
        onSuccess(response);
      } else {
        const message = response.Message || 'No record found';
        onError(message);
      }
    } else {
      const message = response.Message || 'An error occurred';
      onError(message);
      showAlert({code: response.StatusCode, message});
    }
  } catch (error) {
    console.log('error: ' + error);
    const message = error?.message || 'An error occurred, please try again.';
    onError(message);
    showAlert({code: 500, message});
  } finally {
    setLoading(false);
  }
};
