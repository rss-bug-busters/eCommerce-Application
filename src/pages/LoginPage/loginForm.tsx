import { useState } from 'react';
import './login-page.scss';
import { useForm } from 'react-hook-form';
import { ValidationLogin, ValidationPassword } from './Validation';

interface FormData {
  Login: string;
  Password: string;
}

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [validLogin, setValidLogin] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      Login: '',
      Password: '',
    },
  });
  const login = watch().Login;
  const password = watch().Password;
  const onSubmit = (data: FormData) => {
    if (validLogin && validPassword) {
      console.log(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <input
        {...register('Login', {
          required: 'Login must not be empty',
        })}
        placeholder="Email"
      />
      <ValidationLogin login={login} validLogin={setValidLogin} />
      <p className="error-text">{errors.Login?.message}</p>
      <input
        {...register('Password', { required: 'Password must not be empty' })}
        placeholder="Password"
        type={showPassword ? 'text' : 'password'}
      />
      <ValidationPassword password={password} validPassword={setValidPassword} />
      <p className="error-text">{errors.Password?.message}</p>
      <label htmlFor="showPassword">Show Password</label>
      <input
        id="showPassword"
        type="checkbox"
        checked={showPassword}
        onChange={() => setShowPassword((previous: boolean) => !previous)}
      />
      <input type="submit" className="login-button" />
    </form>
  );
}

export default LoginForm;
