interface ErrorInterface {
  width?: string,
  height?: string,
  className?: string
}

const Error: React.FC<ErrorInterface> = ({ width = "24", height = "24", className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className={`${className} icon icon-tabler icons-tabler-outline icon-tabler-x`}
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z"/>
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  )
}

export default Error