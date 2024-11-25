export const validateName = (name) => {
  return name.trim() === '' ? 'Name is required' : '';
};

export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email) ? '' : 'Invalid email address';
};

export const validatePassword = (password) => {
  if (password.trim() === '') {
    return 'Password is required';
  }
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password) ? '' : 'Password is too weak';
};
