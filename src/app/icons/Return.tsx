interface ReturnInterface {
  width?: string,
  height?: string,
  className?: string,
  color?: string
}

const Return: React.FC<ReturnInterface> = ({ width = '24', height = '24', className, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className={`${className} icon icon-tabler icons-tabler-outline icon-tabler-arrow-left`}
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z"/>
      <path d="M5 12h14M5 12l6 6M5 12l6-6"/>
    </svg>
  )
}

export default Return