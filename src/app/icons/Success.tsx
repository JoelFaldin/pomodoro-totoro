interface SuccessInterface {
  width?: string,
  height?: string,
  className?: string
}

const Success: React.FC<SuccessInterface> = ({ width = "24", height = "24", className }) => {
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
      className={`${className} icon icon-tabler icons-tabler-outline icon-tabler-circle-check`}
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z"/>
      <path d="M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  )
}

export default Success