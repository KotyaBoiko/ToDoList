import { FC } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

type Props = {
  direction: string;
};

const Arrow: FC<Props> = ({ direction }) => {

  const renderContent = () => {
    switch (direction) {
      case "left":
        return <FaChevronLeft size={25} color="rgb(139 92 246" className="arrow"/>;
      case "right":
        return <FaChevronRight size={25} color="rgb(139 92 246" className="arrow"/>;
    }
  };
  
  return <div>{renderContent()}</div>;
};

export default Arrow;
