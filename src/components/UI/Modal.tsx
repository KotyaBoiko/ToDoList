import React, { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const modalElement = document.getElementById("modal-root");

const Modal: FC<Props> = ({ visible, setVisible, children }) => {
  return createPortal((
    <div
      className={`${
        visible
          ? "z-10 fixed top-0 left-0 w-full h-screen bg-gray-900/70"
          : "hidden"
      } flex justify-center items-center`}
      onClick={() => setVisible(false)}
    >
      <div
        className="bg-slate-50 max-w-5xl z-20 relative p-10 rounded-md w-auto flex-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>),
  modalElement as HTMLElement
  )
};

export default Modal;
