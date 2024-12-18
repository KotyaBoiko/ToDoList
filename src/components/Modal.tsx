import React, { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal: FC<Props> = ({ visible, setVisible, children }) => {
  return (
    <div
      className={`${
        visible
          ? "z-10 absolute top-0 left-0 min-w-full min-h-screen bg-gray-900/70"
          : "hidden"
      }`}
      onClick={() => setVisible(false)}
    >
      <div
        className="bg-slate-50 max-w-5xl z-20 relative m-auto mt-20 p-10 rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
