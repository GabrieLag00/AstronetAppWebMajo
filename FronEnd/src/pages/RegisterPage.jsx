import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../pages/styles/LoginPage.css'; // Importa los estilos del Login

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="login-container">
      <div className="login-form">
        {registerErrors.map((error, i) => (
          <div key={i}>
            {error}
          </div>
        ))} {/* Cierra el paréntesis de cierre aquí */}
        <h1>Register</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register('username', { required: true })}
            placeholder='Username'
          />
          {errors.username && (
            <p>
              Username is required
            </p>
          )}
          <input
            type="email"
            {...register('email', { required: true })}
            placeholder='Email'
          />
          {errors.email && (
            <p>
              Email is required
            </p>
          )}
          <input
            type="password"
            {...register('password', { required: true })}
            placeholder='Password'
          />
          {errors.password && (
            <p>
              Password is required
            </p>
          )}
          <button type="submit">
            Register
          </button>
        </form>
        <p>
          Already have an account? {""}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
