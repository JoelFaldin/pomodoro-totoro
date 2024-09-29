interface FocusInterface {
  width?: string,
  height?: string,
  className?: string
}

const Focus: React.FC<FocusInterface> = ({ width = '24', height = '24', className }) => {
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
      className={`${className} icon icon-tabler icons-tabler-outline icon-tabler-target`}
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z"/>
      <path d="M11 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0"/>
      <path d="M7 12a5 5 0 1 0 10 0 5 5 0 1 0-10 0"/>
      <path d="M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0"/>
    </svg>
  )
}

export default Focus