import { FC } from "react";
import { FaTrashAlt } from "react-icons/fa";

const RemoveButton:FC = () => {
  return (
    <div className="flex justify-center">
        <FaTrashAlt />
      </div>
  );
};

export default RemoveButton;
