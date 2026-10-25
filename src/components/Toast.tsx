import React from 'react';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { useBookstore } from '../context/BookstoreContext';

export const Toast: React.FC = () => {
  const { toast } = useBookstore();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-[#647558]" />,
    info: <Info className="w-4 h-4 text-[#C9785B]" />,
    warning: <AlertTriangle className="w-4 h-4 text-[#B5674B]" />,
  };

  const bgStyles = {
    success: 'bg-[#FFFEFB] border-[#A9B79F]',
    info: 'bg-[#FFFEFB] border-[#EADBCE]',
    warning: 'bg-[#FFF9F1] border-[#C9785B]',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none animate-slideUp">
      <div
        className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl text-xs font-medium text-[#3A2A25] ${
          bgStyles[toast.type]
        }`}
      >
        {icons[toast.type]}
        <span>{toast.text}</span>
      </div>
    </div>
  );
};
