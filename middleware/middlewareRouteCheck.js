const checkRoute = (req, res, next) => {
  const error = new Error("Rotta non trovata");
  error.status = 404;
  next(error);
};
