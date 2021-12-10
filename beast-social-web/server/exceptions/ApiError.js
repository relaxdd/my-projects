class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static UnauthorizedError() {
    return new ApiError(401, "Пользователь не авторизован!");
  }

  static Forbidden() {
    return new ApiError(403, "Доступ запрещен!");
  }

  static NotFound() {
    return new ApiError(404, "Запрошенный ресурс не найден!");
  }

  static MethodNotAllowed() {
    return new ApiError(405, "Данный метод не поддерживается!");
  }

  static Internal(message, errors = []) {
    return new ApiError(500, message, errors);
  }
}

export default ApiError;
