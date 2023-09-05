import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  return (
    <>
      <h1>Recover your access and don't loose your projects</h1>
      <form>
        <div>
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' placeholder='Enter your email' />
        </div>
        <input type='submit' value='Send instructions' />
      </form>
      <nav>
        <Link to='/'>
          Are you already have an account? <span> Sing in</span>
        </Link>
        <Link to='register'>
          Don't have an account? <span>Register</span>
        </Link>
      </nav>
    </>
  )
}

export default ForgotPassword
