import Focus from "../icons/Focus"
import Rest from "../icons/Rest"

interface StatusInterface {
  isWork: boolean
}

const Status: React.FC<StatusInterface> = ({ isWork }) => {
  return (
    <div className="flex flex-row justify-center items-center opacity-50 gap-x-2">
      {
        isWork ? (
          <>
            <Focus width="18" height="18" />
            Focus time
          </>
        ) : (
          <>
            <Rest width="18" height="18" />
            Rest time
          </>
        )
      }
    </div>
  )
}

export default Status