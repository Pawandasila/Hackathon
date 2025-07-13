"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X, ShoppingCart } from "lucide-react";

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function Toast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleShowToast = (event: CustomEvent) => {
      const { message, type = 'success' } = event.detail;
      const id = Date.now().toString();
      
      const newToast: ToastMessage = {
        id,
        message,
        type,
      };

      setToasts(prev => [...prev, newToast]);

      // Auto remove after 3 seconds
      setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
      }, 3000);
    };

    window.addEventListener('showToast' as any, handleShowToast);
    
    return () => {
      window.removeEventListener('showToast' as any, handleShowToast);
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <div className="fixed top-20 right-4 z-[9999] space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-lg backdrop-blur-md border max-w-sm ${
              toast.type === 'success'
                ? 'bg-green-50/90 border-green-200 text-green-800'
                : toast.type === 'error'
                ? 'bg-red-50/90 border-red-200 text-red-800'
                : 'bg-blue-50/90 border-blue-200 text-blue-800'
            }`}
          >
            <div className="flex-shrink-0">
              {toast.type === 'success' && (
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              )}
              {toast.type === 'error' && (
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <X className="w-5 h-5 text-white" />
                </div>
              )}
              {toast.type === 'info' && (
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <p className="font-medium text-sm">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className={`flex-shrink-0 p-1 rounded-full transition-colors ${
                toast.type === 'success'
                  ? 'hover:bg-green-200'
                  : toast.type === 'error'
                  ? 'hover:bg-red-200'
                  : 'hover:bg-blue-200'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
