import { useEffect, useRef } from "react";

export interface IModal {
  isOpen: boolean;
  onClose: () => void;
  children?: JSX.Element | JSX.Element[];
  extraData?: any;
  callback?: (data?: any) => void;
}
export const Modal = ({ isOpen, onClose, children }: IModal) => {
  const modalRef = useRef<any>(null);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-20">
      <div
        ref={modalRef}
        className="bg-white p-8 rounded-lg shadow-lg relative flex flex-col"
        style={{
          width: "auto",
          maxHeight: "90vh",
          overflowY: "auto",
          maxWidth: "90vw",
        }}
      >
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
};
