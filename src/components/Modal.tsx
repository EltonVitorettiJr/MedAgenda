import { X } from "lucide-react";
import type { ReactNode } from "react";

import Card from "./Card";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal = ({ children, isOpen, onClose, title }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-150 mx-4 relative">
        <Card className="shadow-2xl animate-fade-in-down">
          {/* Cabeçalho */}
          <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>

            <button
              type="button"
              onClick={onClose}
              className="hover:text-gray-600 transition-all
              hover:bg-gray-400/300 leading-none rounded-full cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Formulário */}
          <div>{children}</div>
        </Card>
      </div>
    </div>
  );
};

export default Modal;
