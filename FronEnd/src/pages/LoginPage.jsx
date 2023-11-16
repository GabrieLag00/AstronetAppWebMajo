import '../App.css'
import '../pages/styles/LoginPage.css'
import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import {Link, useNavigate} from 'react-router-dom'
import { useEffect } from 'react';


function LoginPage() {

    const {register, handleSubmit, formState: {errors}}=  useForm();
    const {signin, errors:signinErrors, isAuthenticated} = useAuth();
    const navigate = useNavigate()
    const onSubmit = handleSubmit(data => {
        signin(data);
    })
    useEffect(() => {
      if (isAuthenticated) navigate("/dashboard");
    },[isAuthenticated])

    return (
        <div className="login-container">
          <div className="login-form">
            {signinErrors.map((error, i) => (
              <div key={i}>
                {error}
              </div>
            ))} {/* Cierra el paréntesis de cierre aquí */}
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
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
                Login
              </button>
            </form>
            <p>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </div>
      );
}

export default LoginPage;