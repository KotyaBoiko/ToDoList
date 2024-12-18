import { FC } from "react";
import { BiChevronsUp } from "react-icons/bi";

type Props = {
  color?:string
}

const PriorityFlag:FC<Props> = ({color = ''}) => {
  return (
    <div className="flex justify-center">
      <BiChevronsUp size={30} color={`${color}`}/>
    </div>
  )
}

export default PriorityFlag