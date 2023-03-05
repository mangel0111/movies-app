export function handleServiceResponse(serviceResponse, res) {
  if (serviceResponse.success) {
    res.status(serviceResponse.status).json(serviceResponse.value || "Ok");
  } else {
    res
      .status(serviceResponse.status || 500)
      .json({ error: serviceResponse.message });
  }
}
