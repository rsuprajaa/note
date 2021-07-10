interface alertProps {
  message: string
  variant: string
  size?: string
}
const Alert = (props: alertProps) => {
  const { variant, message, size } = props
  return (
    <div
      className={`relative ${size === 'sm' ? 'px-4 py-1' : 'px-4 py-3 mb-3'} ${
        variant === 'error' ? 'text-red-700 bg-red-100 border-red-400 ' : 'text-blue-700 bg-blue-100'
      } border rounded text-${size} select-none`}
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
    </div>
  )
}

export default Alert
