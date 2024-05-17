import { useEffect } from "react";

const isWhitespace = (login: string) => {
  if (!login) {
    return true;
  }

  return !/\s/.test(login);
};
const isEmail = (login: string) => {
  if (!login) {
    return true;
  }

  return /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z-]+\.[\dA-Za-z-]+$/.test(login);
};
const isLongEnough = (password: string) => {
  if (!password) {
    return true;
  }

  const minLength = 8;

  return password.length > minLength;
};
const isContainUppercase = (password: string) => {
  if (!password) {
    return true;
  }

  return /[A-Z]/.test(password);
};
const isContainLowercase = (password: string) => {
  if (!password) {
    return true;
  }

  return /[a-z]/.test(password);
};
const isContainNumber = (password: string) => {
  if (!password) {
    return true;
  }

  return /\d/.test(password);
};
const isSpecial = (password: string) => {
  if (!password) {
    return true;
  }

  return /[!#$%&*@^]/.test(password);
};

interface ErrorTextProperties {
  text: string;
}

export function ErrorText({ text }: ErrorTextProperties) {
  return <p className="error-text">{text}</p>;
}

interface ValidationLoginProperties {
  login: string;
  validLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ValidationLogin({ login, validLogin }: ValidationLoginProperties) {
  const errors = {
    whitespaces: 'Email address must not contain leading or trailing whitespace.',
    email: 'Email address must be properly formatted (e.g., user@example.com).',
  };
  const validation = {
    whitespace: isWhitespace(login),
    email: isEmail(login),
  };

  if (validation.whitespace && validation.email) {
    useEffect(()=>validLogin(true))
    
  } else {
    useEffect(()=>validLogin(false))
  }

  return (
    <>
      {validation.whitespace ? '' : <ErrorText text={errors.whitespaces} />}
      {validation.email ? '' : <ErrorText text={errors.email} />}
    </>
  );
}
interface ValidationPasswordProperties {
  password: string;
  validPassword: React.Dispatch<React.SetStateAction<boolean>>;
}
export function ValidationPassword({
  password,
  validPassword,
}: ValidationPasswordProperties) {
  const errors = {
    minLength: 'Password must be at least 8 characters long.',
    uppercase: 'Password must contain at least one uppercase letter (A-Z).',
    lowercase: 'Password must contain at least one lowercase letter (a-z).',
    digit: 'Password must contain at least one digit (0-9).',
    special: 'Password must contain at least one special character (e.g., !@#$%^&*).',
    whitespaces: 'Password must not contain leading or trailing whitespace.',
  };
  const validation = {
    minLength: isLongEnough(password),
    uppercase: isContainUppercase(password),
    lowercase: isContainLowercase(password),
    digit: isContainNumber(password),
    special: isSpecial(password),
    whitespaces: isWhitespace(password),
  };

  if (
    validation.minLength &&
    validation.uppercase &&
    validation.lowercase &&
    validation.digit &&
    validation.special &&
    validation.whitespaces
  ) {
    useEffect(()=>validPassword(true))
  } else {
    useEffect(()=>validPassword(false))
  }

  return (
    <>
      {validation.minLength ? '' : <ErrorText text={errors.minLength} />}
      {validation.uppercase ? '' : <ErrorText text={errors.uppercase} />}
      {validation.lowercase ? '' : <ErrorText text={errors.lowercase} />}
      {validation.digit ? '' : <ErrorText text={errors.digit} />}
      {validation.special ? '' : <ErrorText text={errors.special} />}
      {validation.whitespaces ? '' : <ErrorText text={errors.whitespaces} />}
    </>
  );
}
