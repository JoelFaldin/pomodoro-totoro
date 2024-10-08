interface GoogleInterface {
  width?: string,
  height?: string,
  className?: string
}

const Google: React.FC<GoogleInterface> = ({ width = '24', height = '24', className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="white"
      className={`${className} icon icon-tabler icons-tabler-filled icon-tabler-brand-google`}
      viewBox="0 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0z"/>
      <path d="M12 2a9.96 9.96 0 0 1 6.29 2.226 1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1-1.265.06 6 6 0 1 0 2.103 6.836l.001-.004h-3.66a1 1 0 0 1-.992-.883L13 13v-2a1 1 0 0 1 1-1h6.945a1 1 0 0 1 .994.89c.04.367.061.737.061 1.11 0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"/>
    </svg>
  )
}

export default Google