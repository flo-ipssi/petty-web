import { FC, ReactNode } from "react";
import "./Modal.scss";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose(): void;
  children?: ReactNode
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children }) => {

  if (!isOpen) return null;
  return (
    <div
      aria-hidden="true"
      className="Modal overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 
      justify-center items-center w-full md:inset-0 h-[calc(110%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full mx-auto divModal">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
              data-modal-hide="authentication-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
