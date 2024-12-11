import { FC } from "react";
import { FaCheck } from "react-icons/fa";

type Props = {
  active: boolean,
}

const Checkbox:FC<Props> = ({active}) => {
  return (
    <button 
    className={`
    flex items-center justify-center 
    size-6 rounded-lg border-2 border-gray-400
    ${active ? 'bg-green-500 border-none' : "hover:border-green-500 hover:border-2"}
    `}
    >
      <FaCheck color="white"/>
    </button>
  )
}

export default Checkbox