interface SettingsInterface {
  width?: string,
  height?: string,
  className?: string
}

const Settings: React.FC<SettingsInterface> = ({ width = "24", height = "24", className }) => {
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
      className={`${className} icon icon-tabler icons-tabler-outline icon-tabler-adjustments-alt`}
      viewBox="0 0 24 24"
    >
        <path stroke="none" d="M0 0h24v24H0z"/>
        <path d="M4 8h4v4H4zM6 4v4M6 12v8M10 14h4v4h-4zM12 4v10M12 18v2M16 5h4v4h-4zM18 4v1M18 9v11"/>
    </svg>
  )
}

export default Settings