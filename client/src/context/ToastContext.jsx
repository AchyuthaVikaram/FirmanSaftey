import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert, Box } from '@mui/material';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, severity = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, severity, duration };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove toast after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const success = (message, duration) => showToast(message, 'success', duration);
  const error = (message, duration) => showToast(message, 'error', duration);
  const warning = (message, duration) => showToast(message, 'warning', duration);
  const info = (message, duration) => showToast(message, 'info', duration);

  return (
    <ToastContext.Provider value={{ showToast, success, error, warning, info, removeToast }}>
      {children}
      
      {/* Toast Container - Top Right Corner */}
      <Box
        sx={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          maxWidth: 400,
          pointerEvents: 'none'
        }}
      >
        {toasts.map((toast) => (
          <Box
            key={toast.id}
            sx={{
              pointerEvents: 'auto',
              animation: 'slideInRight 0.3s ease-out'
            }}
          >
            <Alert
              severity={toast.severity}
              onClose={() => removeToast(toast.id)}
              sx={{
                minWidth: 300,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                borderRadius: '8px',
                '& .MuiAlert-icon': {
                  fontSize: '1.2rem'
                },
                '& .MuiAlert-message': {
                  fontSize: '0.9rem',
                  fontWeight: 500
                }
              }}
            >
              {toast.message}
            </Alert>
          </Box>
        ))}
      </Box>

      {/* CSS Animation */}
      <style>
        {`
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </ToastContext.Provider>
  );
};
