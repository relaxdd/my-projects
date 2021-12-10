import ApiError from "../exceptions/ApiError.js";

const errorMiddleware = (err, req, res, next) => {
  console.log(err);

  if (err instanceof ApiError) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.errors,
    });
  }

  return res
    .status(err.statusCode ?? 500)
    .json({ message: "Произошла какая-то непредвиденная ошибка", error: err });
};

export default errorMiddleware;
