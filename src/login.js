const checkUsername = (usernameInput) => {
  const customerFormat = /^customer([1-9]|[1-4]\d|50)$/;
  let status;
  if (customerFormat.test(usernameInput)) {
    status = true;
  } else {
    status = false;
  }
  return status;
};

const checkPassword = (passwordInput) => {
  let pass = "overlook2021";
  if (passwordInput === pass || passwordInput === "overlook2023") {
    return true;
  } else {
    return false;
  }
};

export { checkUsername, checkPassword };
