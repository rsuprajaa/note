import Spinner from 'react-loader-spinner'

interface LoaderProps {
  center?: boolean
  message?: string
}
const defaultProps: LoaderProps = {
  center: false,
}

const Loader = (props: LoaderProps) => {
  return (
    <div
      className={`${
        props.center
          ? 'absolute -translate-x-1/2 top-2/4 left-2/4 -translate-y-3/4'
          : 'flex justify-around w-full content-center'
      }`}
    >
      <Spinner type="Oval" color="rgba(55, 53, 47, 0.5)" height={20} width={20} />
      <div>{props.message}</div>
    </div>
  )
}

Loader.defaultProps = defaultProps

export default Loader
