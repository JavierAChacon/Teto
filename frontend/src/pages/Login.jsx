import { Link } from 'react-router-dom'
const Login = () => {
  return (
    <>
      <form>
        <div>
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' placeholder='Enter your email' />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            placeholder='Enter your password'
          />
        </div>
        <input type='submit' value='Sign' />
      </form>
      <nav>
        <Link to='register'>
          Don't have an account? <span>Register</span>
        </Link>
        <Link to='forgot-password'>
          <span>Forgot password?</span>
        </Link>
      </nav>
    </>
  )
}

export default Login
