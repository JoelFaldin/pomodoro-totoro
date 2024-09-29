interface RestInterface {
  width?: string,
  height?: string,
  className?: string
}

const Rest: React.FC<RestInterface> = ({ width = '24', height = '24', className }) => {
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
      className={`${className} icon icon-tabler icons-tabler-outline icon-tabler-zzz`}
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z"/>
      <path d="M4 12h6l-6 8h6M14 4h6l-6 8h6"/>
    </svg>
  )
}

export default Rest