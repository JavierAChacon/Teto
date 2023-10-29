const Alert = ({ alert }) => {
  const { error, msg } = alert
  return (
    <div
      className={`${
        error ? 'from-red-400 to-red-600' : 'from-green-400 to-green-600'
      } mx-auto my-5 w-max max-w-fit rounded-xl bg-gradient-to-br p-3 text-center text-sm font-bold uppercase text-white`}
    >
      {msg}
    </div>
  )
}

export default Alert
