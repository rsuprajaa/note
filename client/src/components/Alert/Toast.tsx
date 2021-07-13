interface ToastProps {
  message: string
  variant: string
}

const Toast = (props: ToastProps) => {
  const { message, variant } = props
  return (
    <div
      className={`absolute px-4 py-3 transition-all border-t-4 rounded-b shadow-md top-12 right-2  ${
        variant === 'error' && 'text-red-700 border-red-500 bg-red-50'
      }`}
      role="alert"
    >
      <div className="flex">
        <p className="text-sm font-bold">{message}</p>
      </div>
    </div>
  )
}

export default Toast
