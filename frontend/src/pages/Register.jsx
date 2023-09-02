import { Link } from 'react-router-dom'
const Register = () => {
  return (
    <>
      <form>
        <div>
          <label htmlFor='name'>Name</label>
          <input id='name' type='text' placeholder='Enter your name' />
        </div>
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
        <div>
          <label htmlFor='repeatPassword'>Repeat Password</label>
          <input id='repeatPassword' type='password' />
        </div>
        <input type='submit' value='Create account' />
      </form>
      <nav>
        <Link to='/'>
          Are you already have an account? <span> Sing in</span>
        </Link>
        <Link to='forgot-password'>
          <span>Forgot password?</span>
        </Link>
      </nav>
    </>
  )
}

export default Register
