function ErrorResponse(
  message = "Something Went Wrong!",
  status = 500,
  ok,
  next
) {
  let err = new Error(message);
  err.statusCode = status;
  err.ok = ok;
  next(err);
}

export { ErrorResponse };
