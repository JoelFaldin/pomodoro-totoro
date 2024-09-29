interface AboutProps {
  width?: string,
  height?: string,
  className?: string
}

const About: React.FC<AboutProps> = ({ width = '24', height = '24', className }) => {
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
      className={`${className} icon icon-tabler icons-tabler-outline icon-tabler-info-square-rounded`}
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z"/>
      <path d="M12 9h.01M11 12h1v4h1"/>
      <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9z"/>
    </svg>
  )
}

export default About