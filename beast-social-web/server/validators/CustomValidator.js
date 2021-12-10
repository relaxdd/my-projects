class CustomValidator {
  static contains = (fields, check_list) => {
    let errors = [];

    if (!Object.keys(fields).length) return ["Нет данных"];

    for (const key in fields) {
      if (Object.hasOwnProperty.call(fields, key)) {
        if (fields[key] === "") {
          errors.push(`Отсутствует поле ${fields[key]}`);
        }
      }
    }

    return errors;
  };

  static password = (pass, confirm) => {
    let errors = [];
    const regExpList = {
      beginWithoutDigit: /^\D.*$/,
      containsLetters: /^.*[a-zA-Z]+.*$/,
    };

    const regExpDesc = {
      beginWithoutDigit: "В начале пароля не должно быть чисел!",
      containsLetters: "В пароле должна быть как минимум 1 заглавная буква!",
    };

    errors = Object.keys(regExpList)
      .filter((key) => !regExpList[key].test(pass))
      .map((item) => regExpDesc[item]);

    if (pass !== confirm) {
      errors.push("Пароль не совпадает с его подтверждением!");
    }

    return errors;
  };
}

export default CustomValidator;
